import { useInjection } from 'inversify-react'
import { useCallback } from 'react'
import { INewsCreateActions, INewsSubmitData, NewsCreateActionsId } from 'blms/NewsBlm/actions'

export function useNewsCreateAdapter() {
  const actions = useInjection<INewsCreateActions>(NewsCreateActionsId)

  const submit = useCallback((data: INewsSubmitData) => actions.submit(data), [])

  return { submit }
}
