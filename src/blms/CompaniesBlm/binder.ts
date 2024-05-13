import { Container } from 'inversify'
import { CompaniesStore, CompaniesStoreId, ICompaniesStore } from './store'

import { CompanyDetailActions, CompanyDetailActionsId, ICompanyDetailActions } from './actions'

import { CompaniesListActions, CompaniesListActionsId, ICompaniesListActions } from './actions'

export const bindCompaniesBlm = (container: Container) => {
  container.bind<ICompaniesStore>(CompaniesStoreId).to(CompaniesStore)
  container.bind<ICompanyDetailActions>(CompanyDetailActionsId).to(CompanyDetailActions)
  container.bind<ICompaniesListActions>(CompaniesListActionsId).to(CompaniesListActions)
}
