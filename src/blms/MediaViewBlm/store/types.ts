export interface IMediaViewStore {
  isOpen: boolean
  setIsOpen(val: boolean): void

  data: { uri: string } | null
  setData(val: IMediaViewStore['data']): void
}
