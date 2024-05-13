import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { INewsStore, NewsStoreId } from 'blms/NewsBlm/store'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { InteractionManager } from 'react-native'
import { INewsDetailActions, NewsDetailActionsId } from 'blms/NewsBlm/actions'

export function useNewsDetailAdapter() {
  const store = useInjection<INewsStore>(NewsStoreId)
  const actions = useInjection<INewsDetailActions>(NewsDetailActionsId)
  const navigation = useNavigation()

  const data = useMemo(() => store.detailData, [store.detailData])
  const isLoading = useMemo(() => store.detailDataLoading, [store.detailDataLoading])

  useFocusEffect(
    useCallback(() => {
      if (store.detailDataId) {
        actions.getDetail()
      } else {
        navigation.goBack()
      }

      return () => {
        InteractionManager.runAfterInteractions(() => {
          actions.clearData()
        })
      }
    }, [actions, navigation, store.detailDataId]),
  )

  return { data, isLoading }
}
