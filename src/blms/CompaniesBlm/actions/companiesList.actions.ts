import { inject, injectable } from 'inversify'
import { ICompaniesListActions } from './types'
import { CompaniesStoreId, ICompaniesStore } from '../store'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import { IServicesMinInfo } from 'repositories/Api/models'

export const CompaniesListActionsId = Symbol.for('CompaniesListActions')

@injectable()
export class CompaniesListActions implements ICompaniesListActions {
  constructor(
    @inject(CompaniesStoreId) private companiesStore: ICompaniesStore,
    @inject(ApiRepoId) private apiRepi: IApiRepo,
  ) {}

  getCompaniesList(): void {
    this.companiesStore.setCompaniesLoading(true)
    this.apiRepi
      .mainServicesList()
      .then(res => {
        this.companiesStore.setCompanies(res.data.results)
      })
      .finally(() => this.companiesStore.setCompaniesLoading(false))
  }

  openCompanyInfo(id: IServicesMinInfo['id']): void {
    this.companiesStore.setCompanyDetailId(id)
  }
}
