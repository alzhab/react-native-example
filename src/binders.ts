import { bindServices } from 'services/index'
import { bindRepositories } from 'repositories/index'
import { BLMS_BINDERS } from 'blms/binders'
import { Container } from 'inversify'
import { bindThemeModule } from '@corrbo/module-theme'
import { NAVIGATION_MODULE_BINDERS } from '@corrbo/module-navigation/binders'
import { LOCAL_STORAGE_SERVICE_BINDERS } from '@corrbo/module-localstorage/binders'

export const BINDERS: ((container: Container) => void)[] = [
  // modules-base
  ...NAVIGATION_MODULE_BINDERS,
  ...LOCAL_STORAGE_SERVICE_BINDERS,
  // theme
  bindThemeModule,
  // app
  bindServices,
  bindRepositories,
  ...BLMS_BINDERS,
]
