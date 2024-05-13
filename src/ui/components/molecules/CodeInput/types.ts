import { Control } from 'react-hook-form/dist/types/form'

export interface ICodeInputProps {
  size?: number
  control: Control<any, any>
  name: string
  onFinish(val: string): void
}
