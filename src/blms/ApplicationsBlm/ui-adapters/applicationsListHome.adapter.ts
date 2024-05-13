import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { InteractionManager } from 'react-native'
import {
  ApplicationStatusShortNames,
  IApplications,
  IApplicationsStatusEnum,
} from 'repositories/Api'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import {
  ApplicationsStoreId,
  IApplicationsStore,
} from 'blms/ApplicationsBlm/store'
import {
  ApplicationListActionsId,
  IApplicationListActions,
} from 'blms/ApplicationsBlm/actions'
import {
  AuthenticationStoreId,
  IAuthenticationStore,
} from 'blms/AuthenticationBlm/store'
import { EApplicationDetailFlowEvents } from 'blms/ApplicationsBlm/flow'
import { EAuthenticationFlowEvents } from 'blms/AuthenticationBlm/flow'
import { EApartmentsFlowEvents } from 'blms/ApartmentsBlm/flow'
import { useApartmentChoosedAdapter } from 'blms/ApartmentsBlm/ui-adapters'

const DUMB_LIST: Omit<IApplications, 'apartment'>[] = [
  {
    id: 1,
    date: '',
    type: { id: 0, name: '', category: [] },
    category: { id: 0, name: '' },
    place: '',
    phone: '',
    description: 'string',
    application_file: [],
    status: IApplicationsStatusEnum.Open,
    application_status_history: [],
    can_edit: false,
    executor: 0,
    executor_phone: '',
  },
  {
    id: 2,
    date: '',
    type: { id: 0, name: '', category: [] },
    category: { id: 0, name: '' },
    place: '',
    phone: '',
    description: 'string',
    application_file: [],
    status: IApplicationsStatusEnum.EmployeeAssigned,
    application_status_history: [],
    can_edit: false,
    executor: 0,
    executor_phone: '',
  },
  {
    id: 2,
    date: '',
    type: { id: 0, name: '', category: [] },
    category: { id: 0, name: '' },
    place: '',
    phone: '',
    description: 'string',
    application_file: [],
    status: IApplicationsStatusEnum.AcceptedByCustomer,
    application_status_history: [],
    can_edit: false,
    executor: 0,
    executor_phone: '',
  },
]

export function useApplicationsListHomeAdapter() {
  const store = useInjection<IApplicationsStore>(ApplicationsStoreId)
  const actions = useInjection<IApplicationListActions>(
    ApplicationListActionsId,
  )
  const authenticationStore = useInjection<IAuthenticationStore>(
    AuthenticationStoreId,
  )
  const navigation = useNavigation<any>()
  const { choosedApartment } = useApartmentChoosedAdapter()

  const canShow = useMemo(
    () => authenticationStore.isAuthorized && !!choosedApartment.id,
    [authenticationStore.isAuthorized, choosedApartment],
  )

  const data = useMemo(
    () =>
      (canShow ? store.homeList : DUMB_LIST).map(item => ({
        id: item.id,
        title: 'Заявка № ' + item.id,
        value:
          ApplicationStatusShortNames[
            item.status || IApplicationsStatusEnum.Open
          ],
        status: item.status,
      })),
    [canShow, store.homeList],
  )
  const count = useMemo(
    () => (authenticationStore.isAuthorized ? store.listMaxCount : 22),
    [authenticationStore.isAuthorized, store.listMaxCount],
  )
  const listLoading = useMemo(
    () => store.listHomeLoading && authenticationStore.isAuthorized,
    [store.listHomeLoading, authenticationStore.isAuthorized],
  )

  const onPress = useCallback(
    (id: number) => {
      if (canShow) {
        EVENT_EMITTER.emitEvent({
          name: EApplicationDetailFlowEvents.OPEN_APPLICATION_DETAIl,
          data: { id },
        })
      } else {
        EVENT_EMITTER.emitEvent({
          name: EAuthenticationFlowEvents.ON_AUTH_GUARD_ACTION,
          data: {
            action: () => {},
          },
        })
      }
    },
    [canShow],
  )

  const onPressAll = useCallback(() => {
    EVENT_EMITTER.emitEvent({
      name: EAuthenticationFlowEvents.ON_AUTH_GUARD_ACTION,
      data: {
        action: () =>
          EVENT_EMITTER.emitEvent({
            name: EApartmentsFlowEvents.ON_APARTMENT_GUARD_ACTION,
            data: {
              call: () =>
                navigation.navigate('BottomBarNavigation', {
                  screen: 'ApplicationsScreen',
                }),
              type: 'can_work_applications',
            },
          }),
      },
    })
  }, [navigation])

  const onPressNew = useCallback(() => {
    EVENT_EMITTER.emitEvent({
      name: EAuthenticationFlowEvents.ON_AUTH_GUARD_ACTION,
      data: {
        action: () =>
          EVENT_EMITTER.emitEvent({
            name: EApartmentsFlowEvents.ON_APARTMENT_GUARD_ACTION,
            data: {
              call: () => navigation.navigate('ApplicationCreateScreen'),
              type: 'can_work_applications',
            },
          }),
      },
    })
  }, [navigation])

  useFocusEffect(
    useCallback(() => {
      InteractionManager.runAfterInteractions(() => {
        if (authenticationStore.isAuthorized) {
          actions.getListHome()
        }
      })
    }, []),
  )

  return { data, listLoading, count, onPress, onPressAll, onPressNew }
}
