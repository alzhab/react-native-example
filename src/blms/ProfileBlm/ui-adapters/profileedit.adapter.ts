import { useInjection } from 'inversify-react'
import { useCallback } from 'react'
import { IProfileEditActions, ProfileEditActionsId } from 'blms/ProfileBlm/actions'
import { IUser } from 'repositories/Api'

export function useProfileEditAdapter() {
  const actions = useInjection<IProfileEditActions>(ProfileEditActionsId)

  const submit = useCallback((data: IUser) => actions.submit(data), [])

  return { submit }
}
