import { inject, injectable } from 'inversify'
import { IApplicationDetailFlow } from './types'
import { ApplicationsStoreId, IApplicationsStore } from 'blms/ApplicationsBlm/store'
import { EApplicationDetailFlowEvents, IApplicationDetailFlowData } from 'blms/ApplicationsBlm/flow'

import { INavigationService, NavigationServiceId } from '@corrbo/module-navigation/services'
import { EVENT_EMITTER } from '@corrbo/base/IOC/IOCProvider'
import { IFlowReactions } from 'blms/types'
import {
  ApplicationDeleteActionsId,
  ApplicationDetailActionsId,
  ApplicationEditActionsId,
  ApplicationListActionsId,
  IApplicationDeleteActions,
  IApplicationDetailActions,
  IApplicationEditActions,
  IApplicationListActions,
} from 'blms/ApplicationsBlm/actions'
import { EGlobalLoadingFlowEvents } from 'blms/GlobalLoadingBlm/flow'

export const ApplicationDetailFlowId = Symbol.for('ApplicationDetailFlow')
EVENT_EMITTER.addFlowId(ApplicationDetailFlowId)

@injectable()
export class ApplicationDetailFlow implements IApplicationDetailFlow {
  constructor(
    @inject(ApplicationsStoreId) private applicationStore: IApplicationsStore,
    @inject(ApplicationListActionsId) private applicationListActions: IApplicationListActions,
    @inject(ApplicationDetailActionsId) private applicationDetailActions: IApplicationDetailActions,
    @inject(ApplicationEditActionsId) private applicationEditActions: IApplicationEditActions,
    @inject(ApplicationDeleteActionsId) private applicatioDeleteActions: IApplicationDeleteActions,
    @inject(NavigationServiceId) private navigation: INavigationService,
  ) {}

  get reactions(): IFlowReactions {
    return {
      [EApplicationDetailFlowEvents.OPEN_APPLICATION_DETAIl]: this.openApplicationDetail.bind(this),
      [EApplicationDetailFlowEvents.OPEN_APPLICATION_EDIT]: this.openApplicationEdit.bind(this),
      [EApplicationDetailFlowEvents.DELETE_APPLICATION]: this.deleteApplication.bind(this),
      [EApplicationDetailFlowEvents.REFRESH_APPLICATION_BY_ID_OR_LIST]:
        this.refreshApplicationByIdOrList.bind(this),
    }
  }

  openApplicationDetail(
    data: IApplicationDetailFlowData[EApplicationDetailFlowEvents.OPEN_APPLICATION_DETAIl],
  ) {
    this.applicationStore.setDetailDataId(data.id)
    this.navigation.navigate('ApplicationsDetailScreen')
  }

  deleteApplication(
    data: IApplicationDetailFlowData[EApplicationDetailFlowEvents.DELETE_APPLICATION],
  ) {
    this.applicatioDeleteActions
      .deleteItem(data)
      .then(() => this.applicationListActions.reloadList())
      .finally(() => EVENT_EMITTER.emitEvent({ name: EGlobalLoadingFlowEvents.HIDE_GLB_LOADING }))
  }

  openApplicationEdit(
    data: IApplicationDetailFlowData[EApplicationDetailFlowEvents.OPEN_APPLICATION_EDIT],
  ) {
    this.applicationStore.setEditDataId(data.id)
    this.navigation.navigate('ApplicationEditScreen')
  }

  refreshApplicationByIdOrList(
    data: IApplicationDetailFlowData[EApplicationDetailFlowEvents.REFRESH_APPLICATION_BY_ID_OR_LIST],
  ) {
    if (this.applicationStore.detailDataId === data.id) {
      this.applicationDetailActions.getDetail()
    } else if (this.applicationStore.editDataId === data.id) {
      this.applicationEditActions.getDetail()
    } else {
      this.applicationListActions.reloadList()
    }
  }
}
