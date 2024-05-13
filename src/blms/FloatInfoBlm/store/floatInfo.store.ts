import { injectable } from 'inversify'
import { IFloatInfoStore } from './types'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

export const FloatInfoStoreId = Symbol.for('FloatInfoStore')

@injectable()
export class FloatInfoStore implements IFloatInfoStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, { name: 'FloatInfoStore', properties: [] })
  }

  desc: string = ''

  setDesc(val: string): void {
    this.desc = val
  }

  layout: { x: number; y: number } = { x: 0, y: 0 }
  setLayout(val: IFloatInfoStore['layout']): void {
    this.layout = val
  }

  isVisible: boolean = false
  setIsVisible(val: IFloatInfoStore['isVisible']): void {
    this.isVisible = val
  }

  buttons: { title: string; onPress: () => void }[] = []
  setButtons(val: IFloatInfoStore['buttons']): void {
    this.buttons = val
  }
}
