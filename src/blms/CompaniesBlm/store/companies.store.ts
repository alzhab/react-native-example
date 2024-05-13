import { injectable } from 'inversify'
import { ICompaniesStore } from './types'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import { IServices, IServicesCategory, IServicesMinInfo } from 'repositories/Api/models'

export const CompaniesStoreId = Symbol.for('CompaniesStore')

@injectable()
export class CompaniesStore implements ICompaniesStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, { name: 'CompaniesStore', properties: [] })
  }

  homeServicesLoading: boolean = true
  setHomeServicesLoading(val: boolean): void {
    this.homeServicesLoading = val
  }

  companyDetailId: IServicesMinInfo['id'] = undefined
  setCompanyDetailId(val: IServicesMinInfo['id']): void {
    this.companyDetailId = val
  }

  companyDetail: IServices | null = null
  setCompanyDetail(val: IServices | null) {
    this.companyDetail = val
  }

  companies: IServicesCategory[] = []
  setCompanies(val: IServicesCategory[]): void {
    this.companies = val
  }

  companiesLoading: boolean = false

  setCompaniesLoading(val: boolean): void {
    this.companiesLoading = val
  }

  companyDetailLoading: boolean = false
  setCompanyDetailLoading(val: boolean): void {
    this.companyDetailLoading = val
  }

  homeServices: IServicesMinInfo[] = []
  setHomeServices(val: IServicesMinInfo[]): void {
    this.homeServices = val
  }
}
