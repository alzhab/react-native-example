import { inject, injectable } from 'inversify'
import { EAppStateFlowEvents, IAppState, IAppStateFlowData } from '../flow'
import {
  IMockRequestStatusesActions,
  IServerApiStopActions,
  MockRequestStatusesActionsId,
  ServerApiStopActionsId,
} from '../actions'
import { RootNavigationParamsMap } from 'navigations/RootNavigation'
import {
  IInitialRouteActions,
  InitialRouteActionsId,
} from '@corrbo/module-navigation/blm/actions'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { IFlowReactions } from 'blms/types'
import {
  AuthenticationStoreId,
  ChangeTempPasswordStoreId,
  IAuthenticationStore,
  IChangeTempPasswordStore,
  IRegistrationStore,
  RegistrationStoreId,
} from 'blms/AuthenticationBlm/store'
import { EAuthenticationFlowEvents } from 'blms/AuthenticationBlm/flow'
import { EGuideFlowEvents } from 'blms/GuideBlm/flow'
import { IProfileStore, ProfileStoreId } from 'blms/ProfileBlm/store'

export const AppStateFlowId = Symbol.for('AppStateFlow')
EVENT_EMITTER.addFlowId(AppStateFlowId)

@injectable()
export class AppStateFlow implements IAppState {
  constructor(
    @inject(RegistrationStoreId)
    private registrationStore: IRegistrationStore,
    @inject(ChangeTempPasswordStoreId)
    private changeTempPasswordStore: IChangeTempPasswordStore,
    @inject(InitialRouteActionsId)
    private initialRouteActions: IInitialRouteActions,
    @inject(AuthenticationStoreId)
    private authenticationStore: IAuthenticationStore,
    @inject(MockRequestStatusesActionsId)
    private mockRequestStatusesActions: IMockRequestStatusesActions,
    @inject(ServerApiStopActionsId)
    private serverApiStopActions: IServerApiStopActions,
    @inject(ProfileStoreId)
    private profileStore: IProfileStore,
  ) {}

  get reactions(): IFlowReactions {
    return {
      [EAppStateFlowEvents.ON_APP_OPEN]: this.onAppOpen.bind(this),
      [EAppStateFlowEvents.ON_CHOOSE_MOCK_REQUEST_STATUS]:
        this.onChooseRequestStatus.bind(this),
      [EAppStateFlowEvents.ON_SERVER_API_STOP]: this.serverApiStop.bind(this),
      [EAppStateFlowEvents.ON_SERVER_API_START]: this.serverApiStart.bind(this),
    }
  }

  onAppOpen(): void {
    EVENT_EMITTER.emitEvent({
      name: EAuthenticationFlowEvents.ON_PREPARE_DATA,
      data: {
        after: () => this.initialRouteActions.setInitialRouteName(this.screen),
      },
    })
  }

  get screen(): keyof RootNavigationParamsMap {
    EVENT_EMITTER.emitEvent({ name: EGuideFlowEvents.CHECK_GUIDE_SHOW })
    if (!this.authenticationStore.isAuthorized) {
      return 'BottomBarNavigation'
    } else {
      if (this.profileStore.profile && this.profileStore.profile.is_trial) {
        return 'ChangeTempPasswordScreen'
      } else {
        EVENT_EMITTER.emitEvent({ name: EGuideFlowEvents.CHECK_GUIDE_SHOW })
        return 'BottomBarNavigation'
      }
    }
  }

  onChooseRequestStatus(
    data: IAppStateFlowData[EAppStateFlowEvents.ON_CHOOSE_MOCK_REQUEST_STATUS],
  ) {
    this.mockRequestStatusesActions.openStatusesDialog(data)
  }

  serverApiStop() {
    this.serverApiStopActions.openServerStopPlug()
  }

  serverApiStart() {
    this.serverApiStopActions.closeServerStopPlug()
  }
}
