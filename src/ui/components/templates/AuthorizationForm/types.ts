import { IAuthorizationData } from 'blms/AuthenticationBlm/actions'

export interface IAuthorizationFormProps {
  submit: (data: IAuthorizationData) => void
  showPasswordConfirm: boolean
}
