export interface IFloatInfoStore {
  layout: { x: number; y: number; width?: number }
  setLayout(val: IFloatInfoStore['layout']): void

  desc: string
  setDesc(val: IFloatInfoStore['desc']): void

  isVisible: boolean
  setIsVisible(val: IFloatInfoStore['isVisible']): void

  buttons: { title: string; onPress: () => void }[]
  setButtons(val: IFloatInfoStore['buttons']): void
}
