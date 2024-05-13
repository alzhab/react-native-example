import { useInjection } from 'inversify-react'
import { useCallback, useMemo } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { InteractionManager, Linking } from 'react-native'
import { ApplicationsStoreId, IApplicationsStore } from 'blms/ApplicationsBlm/store'
import { ApplicationDetailActionsId, IApplicationDetailActions } from 'blms/ApplicationsBlm/actions'
import { IApplicationsStatusEnum } from 'repositories/Api'
import { useApartmentTitle } from 'hooks/useApartmentTitle'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { EApplicationDetailFlowEvents } from 'blms/ApplicationsBlm/flow'

export function useApplicationDetailAdapter() {
  const store = useInjection<IApplicationsStore>(ApplicationsStoreId)
  const actions = useInjection<IApplicationDetailActions>(ApplicationDetailActionsId)
  const navigation = useNavigation()
  const data = useMemo(() => store.detailData, [store.detailData])
  const isLoading = useMemo(() => store.detailDataLoading, [store.detailDataLoading])

  const accept = useCallback(() => actions.accept(), [])
  const reject = useCallback(() => actions.reject(), [])
  const cancel = useCallback(() => actions.cancel(), [])

  const statusActiveNumber = useMemo(
    () =>
      [
        IApplicationsStatusEnum.Open,
        data?.status === IApplicationsStatusEnum.Cancelled
          ? IApplicationsStatusEnum.Cancelled
          : IApplicationsStatusEnum.EmployeeAssigned,
        IApplicationsStatusEnum.Enabled,
        IApplicationsStatusEnum.Entered,
        IApplicationsStatusEnum.AcceptedByCustomer,
      ].findIndex(item => item === data?.status) + 1,
    [data?.status],
  )
  const apartmentTitle = useApartmentTitle(data?.apartment)

  const managementCompanyPhone = useMemo(
    () =>
      data?.apartment?.house.management_company?.user?.phone
        ? data?.apartment?.house.management_company?.user?.phone
            .replace('+7', '')
            .replace(/[^\d.-]+/g, '')
        : '',
    [data],
  )

  const executorPhone = useMemo(
    () =>
      data?.executor_phone ? data?.executor_phone.replace('+7', '').replace(/[^\d.-]+/g, '') : '',
    [data],
  )

  const managemenetCompanyPhoneCallback = useCallback(() => {
    if (managementCompanyPhone) {
      Linking.openURL(`tel:+7${managementCompanyPhone}`)
    }
  }, [managementCompanyPhone])

  const executorPhoneCallback = useCallback(() => {
    if (executorPhone) {
      Linking.openURL(`tel:+7${executorPhone}`)
    }
  }, [executorPhone])

  const editCallback = useCallback(() => {
    if (data) {
      EVENT_EMITTER.emitEvent({
        name: EApplicationDetailFlowEvents.OPEN_APPLICATION_EDIT,
        data: { id: data?.id },
      })
    }
  }, [data])

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

  return {
    data,
    isLoading,
    accept,
    reject,
    cancel,
    statusActiveNumber,
    apartmentTitle,
    managementCompanyPhone,
    executorPhone,
    managemenetCompanyPhoneCallback,
    executorPhoneCallback,
    editCallback,
  }
}
