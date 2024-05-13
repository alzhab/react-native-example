import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'

import { useApartmentTitle } from 'hooks/useApartmentTitle'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { InteractionManager } from 'react-native'
import {
  ApplicationEditActionsId,
  IApplicationEditActions,
  IApplicationSubmitData,
} from 'blms/ApplicationsBlm/actions'
import { ApplicationsStoreId, IApplicationsStore } from 'blms/ApplicationsBlm/store'

export function useApplicationEditAdapter() {
  const actions = useInjection<IApplicationEditActions>(ApplicationEditActionsId)
  const store = useInjection<IApplicationsStore>(ApplicationsStoreId)
  const navigation = useNavigation()

  const data = useMemo(() => store.editData, [store.editData])
  const isLoading = useMemo(() => store.editDataLoading, [store.editDataLoading])
  const apartmentTitle = useApartmentTitle(data?.apartment)
  const defaultParams: IApplicationSubmitData = useMemo(() => {
    return {
      house: { title: apartmentTitle, val: data?.apartment.id || 0 },
      type: { title: data?.type.name || '', val: data?.type.id || 0 },
      category: { title: data?.category.name || '', val: data?.category.id || 0 },
      place: data?.place || '',
      phone: data?.phone || '',
      description: data?.description || '',
      files: [],
      deleted_files_ids: [],
    }
  }, [apartmentTitle, data])
  const defaultFiles = useMemo(() => data?.application_file, [data])

  const submit = useCallback((val: IApplicationSubmitData) => actions.submit(val), [])

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

  return { submit, isLoading, defaultParams, defaultFiles }
}
