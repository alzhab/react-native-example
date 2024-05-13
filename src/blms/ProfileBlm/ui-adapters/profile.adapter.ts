import { useInjection } from 'inversify-react'
import { useMemo } from 'react'
import { IProfileStore, ProfileStoreId } from 'blms/ProfileBlm/store'

export function useProfileAdapter() {
  const store = useInjection<IProfileStore>(ProfileStoreId)
  const profile = useMemo(() => store.profile, [store.profile])

  return {
    profile,
  }
}
