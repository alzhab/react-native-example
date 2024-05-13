import { inject, injectable } from 'inversify'
import { ICompanyDetailActions } from './types'
import { CompaniesStoreId, ICompaniesStore } from '../store'
import { ApiRepoId, IApiRepo } from 'repositories/Api'
import { InteractionManager, Linking } from 'react-native'

export const CompanyDetailActionsId = Symbol.for('CompanyDetailActions')

@injectable()
export class CompanyDetailActions implements ICompanyDetailActions {
  constructor(
    @inject(CompaniesStoreId) private companiesStore: ICompaniesStore,
    @inject(ApiRepoId) private apiRepo: IApiRepo,
  ) {}

  getCompanyDetailInfo(): void {
    if (this.companiesStore.companyDetailId) {
      this.companiesStore.setCompanyDetailLoading(true)
      this.apiRepo
        .mainServiceDetail({ query: { id: this.companiesStore.companyDetailId } })
        .then(res => {
          this.companiesStore.setCompanyDetail(res.data)
        })
        .finally(() => {
          this.companiesStore.setCompanyDetailLoading(false)
        })
    }
  }

  closeCompanyDetailInfo(): void {
    this.companiesStore.setCompanyDetailId(undefined)
    InteractionManager.runAfterInteractions(() => {
      this.companiesStore.setCompanyDetail(null)
      this.companiesStore.setCompanyDetailLoading(true)
    })
  }

  detailAction() {
    if (this.companiesStore.companyDetail) {
      Linking.canOpenURL(this.companiesStore.companyDetail?.link)
        .then(() => {
          Linking.openURL(this.companiesStore.companyDetail?.link || '')
        })
        .catch(e => console.log(e))
    }
  }
}
