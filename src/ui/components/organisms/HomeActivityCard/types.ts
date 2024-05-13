import { IApplicationsStatusEnum } from 'repositories/Api'

export interface IHomeActivityCardProps {
  onPressAll(): void
  count: number
  title: string
  data: { id: number; title: string; value: string; status?: IApplicationsStatusEnum }[]
  onPress(id: number): void
  onPressNew(): void
  newText: string
}
