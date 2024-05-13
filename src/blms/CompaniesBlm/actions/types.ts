import { IServicesMinInfo } from 'repositories/Api/models'

export interface ICompaniesListActions {
  getCompaniesList(): void
  openCompanyInfo(id: IServicesMinInfo['id']): void
}

export interface ICompanyDetailActions {
  getCompanyDetailInfo(): void
  closeCompanyDetailInfo(): void
  detailAction(): void
}
