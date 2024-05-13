import { IServices, IServicesCategory, IServicesMinInfo } from 'repositories/Api/models'

export interface ICompaniesStore {
  homeServicesLoading: boolean
  setHomeServicesLoading(val: boolean): void

  homeServices: IServicesMinInfo[]
  setHomeServices(val: IServicesMinInfo[]): void

  companiesLoading: boolean
  setCompaniesLoading(val: boolean): void

  companyDetailLoading: boolean
  setCompanyDetailLoading(val: boolean): void

  companies: IServicesCategory[]
  setCompanies(val: IServicesCategory[]): void

  companyDetailId: IServicesMinInfo['id']
  setCompanyDetailId(val: IServicesMinInfo['id']): void

  companyDetail: IServices | null
  setCompanyDetail(val: IServices | null): void
}
