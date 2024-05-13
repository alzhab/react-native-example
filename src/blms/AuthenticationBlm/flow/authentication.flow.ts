import { inject, injectable } from 'inversify'
import { EAuthenticationFlowEvents, IAuthenticationFlow, IAuthenticationFlowData } from './types'
import {
  AuthenticationStoreId,
  IAuthenticationStore,
  IRegistrationStore,
  RegistrationStoreId,
} from '../store'
import {
  ChangeTempPasswordActionsId,
  IChangeTempPasswordActions,
  ILogoutActions,
  IPlugActions,
  IRegistrationActions,
  LogoutActionsId,
  PlugActionsId,
  RegistrationActionsId,
} from '../actions'
import { INavigationService, NavigationServiceId } from '@corrbo/module-navigation/services'
import {
  ApartmentsCreateActionsId,
  ApartmentsListActionsId,
  IApartmentsCreateActions,
  IApartmentsListActions,
} from 'blms/ApartmentsBlm/actions'
import { IProfileStore, ProfileStoreId } from 'blms/ProfileBlm/store'
import { IFlowReactions } from 'blms/types'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'
import { ApplicationConfigActionsId, IApplicationConfigActions } from 'blms/ApplicationsBlm/actions'
import CookieManager from '@react-native-cookies/cookies'
import {
  INotificationsSettingsActions,
  NotificationsSettingsActionsId,
} from 'blms/NotificationsBlm/actions'

export const AuthenticationFlowId = Symbol.for('AuthenticationFlow')
EVENT_EMITTER.addFlowId(AuthenticationFlowId)

@injectable()
export class AuthenticationFlow implements IAuthenticationFlow {
  constructor(
    @inject(ApplicationConfigActionsId) private applicationConfigActions: IApplicationConfigActions,
    @inject(PlugActionsId) private plugAction: IPlugActions,
    @inject(RegistrationActionsId) private registrationActions: IRegistrationActions,
    @inject(NavigationServiceId)
    private navigationService: INavigationService,
    @inject(AuthenticationStoreId)
    private authenticationStore: IAuthenticationStore,
    @inject(LogoutActionsId)
    private logoutActions: ILogoutActions,
    @inject(ApartmentsCreateActionsId)
    private apartmentsCreateAction: IApartmentsCreateActions,
    @inject(RegistrationStoreId)
    private registrationStore: IRegistrationStore,
    @inject(ChangeTempPasswordActionsId)
    private changeTempPasswordActions: IChangeTempPasswordActions,
    @inject(ApartmentsListActionsId)
    private apartmentsListActions: IApartmentsListActions,
    @inject(ProfileStoreId)
    private profileStore: IProfileStore,
    @inject(NotificationsSettingsActionsId)
    private notificationsSettingsActions: INotificationsSettingsActions,
  ) {}

  get reactions(): IFlowReactions {
    return {
      [EAuthenticationFlowEvents.ON_AUTH_GUARD_ACTION]: this.onAuthGuardAction.bind(this),
      [EAuthenticationFlowEvents.ON_LOGOUT]: this.onLogout.bind(this),
      [EAuthenticationFlowEvents.START_REGISTRATION]: this.onStartRegistration.bind(this),
      [EAuthenticationFlowEvents.START_CHANGE_TEMP_PASSWORD]:
        this.onStartChangeTempPassword.bind(this),
      [EAuthenticationFlowEvents.ON_AUTHORIZE_SUCCESS]: this.onAuthorizeSuccess.bind(this),
      [EAuthenticationFlowEvents.ON_REGISTER_SUCCESS]: this.onRegisterSuccess.bind(this),
      [EAuthenticationFlowEvents.ON_CHANGE_TEMP_PASSWORD_SUCCESS]:
        this.onChangeTempPasswordSuccess.bind(this),
      [EAuthenticationFlowEvents.ON_PREPARE_DATA]: this.onPrepareData.bind(this),
      [EAuthenticationFlowEvents.ON_OPEN_AUTHORIZED_APP]: this.onOpenAuthorizedApp.bind(this),
      [EAuthenticationFlowEvents.AFTER_DELETE]: this.afterDelete.bind(this),
    }
  }

  onAuthGuardAction(data: IAuthenticationFlowData[EAuthenticationFlowEvents.ON_AUTH_GUARD_ACTION]) {
    // Временно что бы выйти
    this.plugAction.checkAuthAction(data.action)
  }

  onPrepareData(data: IAuthenticationFlowData[EAuthenticationFlowEvents.ON_PREPARE_DATA]) {
    Promise.all([this.notificationsSettingsActions.getFcmToken()])
      .then(() => {
        if (this.authenticationStore.isAuthorized) {
          return Promise.all([
            this.applicationConfigActions.getConfigData(),
            this.apartmentsListActions.getListStart(),
            this.notificationsSettingsActions.checkPermissions(),
          ])
        } else {
          Promise.resolve(true)
        }
      })
      .then(() => data.after())
      .catch(() => data.after())
  }

  onAuthorizeSuccess(
    data: IAuthenticationFlowData[EAuthenticationFlowEvents.ON_AUTHORIZE_SUCCESS],
  ) {
    this.authenticationStore.setIsAuthorized(true)
    this.authenticationStore.setToken(data.token)
    this.profileStore.setProfile(data.user)
    EVENT_EMITTER.emitEvent({
      name: EAuthenticationFlowEvents.ON_PREPARE_DATA,
      data: {
        after: () => {
          if (data.user.is_trial) {
            EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
            EVENT_EMITTER.emitEvent({
              name: EAuthenticationFlowEvents.START_CHANGE_TEMP_PASSWORD,
              data: { temp_password: data.user.password_trial || '' },
            })
          } else {
            if (this.authenticationStore.action) {
              EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
              this.notificationsSettingsActions.checkNotificationsOnLogin()
              this.navigationService.pop()
              this.authenticationStore.action()
              this.authenticationStore.setAction(null)
              setTimeout(() => {}, 600)
            } else {
              EVENT_EMITTER.emitEvent({ name: EAuthenticationFlowEvents.ON_OPEN_AUTHORIZED_APP })
            }
          }
        },
      },
    })
  }

  onRegisterSuccess(data: IAuthenticationFlowData[EAuthenticationFlowEvents.ON_AUTHORIZE_SUCCESS]) {
    this.authenticationStore.setToken(data.token)
    this.authenticationStore.setIsAuthorized(true)
    this.profileStore.setProfile(data.user)
    this.apartmentsCreateAction
      .createApartment(this.registrationStore.data.apartmentData)
      .finally(() =>
        EVENT_EMITTER.emitEvent({
          name: EAuthenticationFlowEvents.ON_PREPARE_DATA,
          data: {
            after: () => {
              this.registrationActions.afterRegistration()
              EVENT_EMITTER.emitEvent({ name: EAuthenticationFlowEvents.ON_OPEN_AUTHORIZED_APP })
            },
          },
        }),
      )
  }

  onChangeTempPasswordSuccess() {
    this.changeTempPasswordActions.afterChangeTempPassword()
    EVENT_EMITTER.emitEvent({ name: EAuthenticationFlowEvents.ON_OPEN_AUTHORIZED_APP })
  }

  onOpenAuthorizedApp() {
    this.navigationService.reset('BottomBarNavigation')
    this.notificationsSettingsActions.checkNotificationsOnLogin()
    setTimeout(() => {
      EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
    }, 600)
  }

  onLogout() {
    if (this.authenticationStore.isAuthorized) {
      EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.SHOW_GLB_LOADING })
      // other actions here, like stores clear
      this.notificationsSettingsActions
        .clear()
        .then(() => this.logoutActions.logout())
        .then(() => CookieManager.clearAll())
        .then(() => {
          this.apartmentsListActions.clearChoosedApartment()
          this.navigationService.reset('BottomBarNavigation')
          setTimeout(() => {
            EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
          }, 600)
        })
        .finally(() => {
          EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
        })
    }
  }

  afterDelete() {
    this.logoutActions
      .clear()
      .then(() => CookieManager.clearAll())
      .then(() => {
        this.apartmentsListActions.clearChoosedApartment()
        this.navigationService.reset('BottomBarNavigation')
        setTimeout(() => {
          EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
        }, 600)
      })
      .finally(() => {
        EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING })
      })
  }

  onStartRegistration(data: IAuthenticationFlowData[EAuthenticationFlowEvents.START_REGISTRATION]) {
    this.registrationActions.onStart(data)
  }

  onStartChangeTempPassword(
    data: IAuthenticationFlowData[EAuthenticationFlowEvents.START_CHANGE_TEMP_PASSWORD],
  ) {
    this.changeTempPasswordActions.onStart(data)
  }
}
