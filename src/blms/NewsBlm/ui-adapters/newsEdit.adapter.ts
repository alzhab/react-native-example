import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { INewsEditActions, INewsSubmitData, NewsEditActionsId } from 'blms/NewsBlm/actions'
import { INewsStore, NewsStoreId } from 'blms/NewsBlm/store'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useApartmentTitle } from 'hooks/useApartmentTitle'
import { InteractionManager } from 'react-native'
import { IMediaFile } from 'services/MediaPickerService'

export function useNewsEditAdapter() {
  const actions = useInjection<INewsEditActions>(NewsEditActionsId)
  const store = useInjection<INewsStore>(NewsStoreId)
  const navigation = useNavigation()

  const data = useMemo(() => store.editData, [store.editData])
  const isLoading = useMemo(() => store.editDataLoading, [store.editDataLoading])
  const apartmentTitle = useApartmentTitle(data?.apartment)

  const defaultParams: INewsSubmitData = useMemo(() => {
    return {
      name: data?.name || '',
      description: data?.description || '',
      house: { title: apartmentTitle, val: data?.apartment.id || 0 },
    }
  }, [apartmentTitle, data])

  const defaultFile: IMediaFile = useMemo(() => {
    return {
      uri: data?.image || '',
      name: 'Фото',
      type: '',
    }
  }, [data])

  const submit = useCallback((val: INewsSubmitData) => actions.submit(val), [])

  useFocusEffect(
    useCallback(() => {
      if (store.editDataId) {
        actions.getDetail()
      } else {
        navigation.goBack()
      }

      return () => {
        InteractionManager.runAfterInteractions(() => {
          actions.clear()
        })
      }
    }, [actions, navigation, store.editDataId]),
  )

  return { submit, isLoading, defaultParams, defaultFile }
}
