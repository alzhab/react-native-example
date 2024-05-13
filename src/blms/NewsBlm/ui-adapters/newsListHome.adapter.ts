import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { InteractionManager } from 'react-native'
import { INews } from 'repositories/Api'
import { useFocusEffect } from '@react-navigation/native'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { INewsStore, NewsStoreId } from 'blms/NewsBlm/store'
import { INewsListActions, NewsListActionsId } from 'blms/NewsBlm/actions'
import { AuthenticationStoreId, IAuthenticationStore } from 'blms/AuthenticationBlm/store'
import { ENewsFlowEvents } from 'blms/NewsBlm/flow'
import { EAuthenticationFlowEvents } from 'blms/AuthenticationBlm/flow'
import { useApartmentChoosedAdapter } from 'blms/ApartmentsBlm/ui-adapters'

const DUMB_LIST: any[] = [
  {
    id: 0,
    name: 'Внимание жильцам!',
    description:
      'С 10.01.2023 по 31.12.2023 будет отключение горячей воды в домеС 10.01.2023 по 31.12.2023 будет отключение горячей воды в доме',
    image: '/media/media/news/Rectangle_8.png',
    date: '',
    house_id: 0,
    can_edit: false,
  },
  {
    id: 0,
    name: 'Внимание жильцам!',
    description:
      'С 10.01.2023 по 31.12.2023 будет отключение горячей воды в домеС 10.01.2023 по 31.12.2023 будет отключение горячей воды в доме',
    image: '/media/media/news/Rectangle_8.png',
    date: '',
    house_id: 0,
    can_edit: false,
  },
  {
    id: 0,
    name: 'Внимание жильцам!',
    description:
      'С 10.01.2023 по 31.12.2023 будет отключение горячей воды в домеС 10.01.2023 по 31.12.2023 будет отключение горячей воды в доме',
    image: '/media/media/news/Rectangle_8.png',
    date: '',
    house_id: 0,
    can_edit: false,
  },
]

export function useNewsListHomeAdapter() {
  const store = useInjection<INewsStore>(NewsStoreId)
  const actions = useInjection<INewsListActions>(NewsListActionsId)
  const authenticationStore = useInjection<IAuthenticationStore>(AuthenticationStoreId)
  const { choosedApartment } = useApartmentChoosedAdapter()

  const canShow = useMemo(
    () => authenticationStore.isAuthorized && !!choosedApartment.id,
    [authenticationStore.isAuthorized, choosedApartment],
  )

  const data = useMemo(() => (canShow ? store.homeList : DUMB_LIST), [canShow, store.homeList])
  const listLoading = useMemo(
    () => store.listHomeLoading && authenticationStore.isAuthorized,
    [authenticationStore.isAuthorized, store.listHomeLoading],
  )

  const onPress = useCallback(
    (val: INews) => {
      if (canShow) {
        EVENT_EMITTER.emitEvent({
          name: ENewsFlowEvents.OPEN_NEWS_DETAIl,
          data: { id: val.id },
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

  useFocusEffect(
    useCallback(() => {
      InteractionManager.runAfterInteractions(() => {
        if (authenticationStore.isAuthorized) {
          actions.getListHome()
        }
      })
    }, [authenticationStore.isAuthorized]),
  )

  return { data, listLoading, onPress }
}
