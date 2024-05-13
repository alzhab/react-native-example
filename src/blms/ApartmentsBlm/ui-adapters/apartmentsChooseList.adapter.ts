import { useInjection } from 'inversify-react'
import { useMemo } from 'react'
import { ApartmentsStoreId, IApartmentsStore } from '../store'
import { getApartmentTitle, useApartmentTitle } from 'hooks/useApartmentTitle'
import { IApartmentAdapter, IOwnerStatus, IUserTypeEnum } from 'repositories/Api'

export function useApartmentsChooseListAdapter(
  permission: keyof Pick<IApartmentAdapter, 'can_work_votes' | 'can_work_applications'>,
) {
  const store = useInjection<IApartmentsStore>(ApartmentsStoreId)
  const apartmentTitle = useApartmentTitle(store.choosedApartment)

  const apartments = useMemo(
    () =>
      store.list
        .filter(item => {
          if (item.type_user === IUserTypeEnum.Owner) {
            return item.owner_status === IOwnerStatus.Approved
          } else {
            return item[permission]
          }
        })
        .map(item => ({
          title: getApartmentTitle(item),
          val: item.id,
        })),
    [permission, store.list],
  )

  const defaultApartmentVal = useMemo(
    () => ({
      title: apartmentTitle,
      val: store.choosedApartment[permission]
        ? store.choosedApartment.id
        : apartments[0] && apartments[0].val,
    }),
    [apartmentTitle, apartments, permission, store.choosedApartment],
  )

  return {
    apartments,
    defaultApartmentVal,
  }
}
