import { useInjection } from 'inversify-react'
import { useCallback } from 'react'
import { ApartmentsListActionsId, IApartmentsListActions } from 'blms/ApartmentsBlm/actions'
import { IMediaFile } from 'services/MediaPickerService'

export function useApartmentApproveAdapter() {
  const actions = useInjection<IApartmentsListActions>(ApartmentsListActionsId)

  const approveCallback = useCallback(
    (data: { file: IMediaFile }) => actions.sendDocumentToModeration(data.file),
    [],
  )

  return {
    approveCallback,
  }
}
