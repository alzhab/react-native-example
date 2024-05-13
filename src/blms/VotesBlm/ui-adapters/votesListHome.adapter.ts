import { useInjection } from 'inversify-react'
import { useCallback, useEffect, useMemo } from 'react'
import { InteractionManager } from 'react-native'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { IVoting, IVotingStatusEnum, IVotingTypeEnum } from 'repositories/Api'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { IVotesStore, VotesStoreId } from 'blms/VotesBlm/store'
import { IVotesListActions, VotesListActionsId } from 'blms/VotesBlm/actions'
import {
  AuthenticationStoreId,
  IAuthenticationStore,
} from 'blms/AuthenticationBlm/store'
import { EVotesDetailFlowEvents } from 'blms/VotesBlm/flow'
import { EAuthenticationFlowEvents } from 'blms/AuthenticationBlm/flow'
import { EApartmentsFlowEvents } from 'blms/ApartmentsBlm/flow'
import { useApartmentChoosedAdapter } from 'blms/ApartmentsBlm/ui-adapters'

const DUMB_LIST: IVoting[] = [
  {
    id: 1,
    name: 'Создание спортивной зоны',
    description: '',
    status: IVotingStatusEnum.Archive,
    type: IVotingTypeEnum.Entrance,
    voting_file_report: [{ file_pdf: '', file_xlsx: '', id: 0, voting: 0 }],
    voting_file_request: [],
    data_vote: {} as any,
    your_vote: {} as any,
    user: true as any,
    apartment: true as any,
    can_edit: false,
    option: '',
  },
  {
    id: 2,
    name: 'Установить беседку',
    description: '',
    status: IVotingStatusEnum.Archive,
    type: IVotingTypeEnum.Entrance,
    voting_file_report: [{ file_pdf: '', file_xlsx: '', id: 0, voting: 0 }],
    voting_file_request: [],
    data_vote: {} as any,
    your_vote: {} as any,
    user: true as any,
    apartment: true as any,
    can_edit: false,
    option: '',
  },
  {
    id: 2,
    name: 'Поставить шлагбаум на въезде',
    description: '',
    status: IVotingStatusEnum.Archive,
    type: IVotingTypeEnum.Entrance,
    voting_file_report: [{ file_pdf: '', file_xlsx: '', id: 0, voting: 0 }],
    voting_file_request: [],
    data_vote: {} as any,
    your_vote: {} as any,
    user: true as any,
    apartment: true as any,
    can_edit: false,
    option: '',
  },
]

export function useVotesListHomeAdapter() {
  const store = useInjection<IVotesStore>(VotesStoreId)
  const actions = useInjection<IVotesListActions>(VotesListActionsId)
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
        title: item.name,
        value: (item.status || '').toString(),
      })),
    [canShow, store.homeList],
  )
  const count = useMemo(
    () => (canShow ? store.listMaxCount : 8),
    [canShow, store.listMaxCount],
  )
  const listLoading = useMemo(
    () => store.listHomeLoading && authenticationStore.isAuthorized,
    [authenticationStore.isAuthorized, store.listHomeLoading],
  )

  const onPress = useCallback(
    (id: number) => {
      if (canShow) {
        EVENT_EMITTER.emitEvent({
          name: EVotesDetailFlowEvents.OPEN_VOTE_DETAIl,
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
                  screen: 'VotesScreen',
                }),
              type: 'can_work_votes',
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
              call: () => navigation.navigate('VoteCreateScreen'),
              type: 'can_work_votes',
            },
          }),
      },
    })
  }, [])

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
