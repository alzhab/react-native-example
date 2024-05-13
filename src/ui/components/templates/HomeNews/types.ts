import { INews } from 'repositories/Api'

export interface IHomeNewsProps {
  data: INews[]
  onPress: (item: INews) => void
}
