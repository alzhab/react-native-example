import { Control } from 'react-hook-form/dist/types/form'
import { ISendSmsCodeParams } from 'repositories/Api'

export interface IPhoneApproveInputProps {
  phoneControl?: Control<any, any>
  onApprove(val: { phone: string; code: string }): void
  type: ISendSmsCodeParams['type']
  defaultPhone?: string
  sendSmsOnStartPhone?: string
  withTitle?: boolean
}
