import { useInjection } from 'inversify-react'
import { useCallback } from 'react'
import { IProfilePasswordEditActions, ProfilePasswordEditActionsId } from 'blms/ProfileBlm/actions'
import { IProfileEditPasswordParams } from 'repositories/Api'

export function useProfilePasswordEditAdapter() {
  const actions = useInjection<IProfilePasswordEditActions>(ProfilePasswordEditActionsId)

  const submit = useCallback((data: IProfileEditPasswordParams) => actions.submit(data), [])

  return { submit }
}
