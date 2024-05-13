export interface ITabsProps {
  tabs: ITab[]
  activeTab: any
  setTab(tab: ITab): void
}

export type ITab = { title: string; val: any; count?: number }
