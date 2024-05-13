import { bindAppStateBlm } from './AppStateBlm/binder'
import { bindApartmentsBlm } from './ApartmentsBlm/binder'
import { bindTenantsBlm } from 'blms/TenantsBlm/binder'
import { bindProfileBlm } from './ProfileBlm/binder'
import { bindApplicationsBlm } from 'blms/ApplicationsBlm/binder'
import { bindFloatInfoBlm } from 'blms/FloatInfoBlm/binder'
import { bindCompaniesBlm } from 'blms/CompaniesBlm/binder'
import { bindVotesBlm } from 'blms/VotesBlm/binder'
import { bindNewsBlm } from 'blms/NewsBlm/binder'
import { bindNotificationsBlm } from 'blms/NotificationsBlm/binder'
import { bindGuideBlm } from 'blms/GuideBlm/binder'
import { bindGlobalLoadingBlm } from 'blms/GlobalLoadingBlm/binder'
import { bindAuthenticationBlm } from 'blms/AuthenticationBlm/binder'
import { bindConfirmModalBlm } from './ConfirmModalBlm/binder'
import { bindInProgressBlm } from './InProgressBlm/binder'
import { bindSmsCodeApproveBlm } from './SmsCodeApproveBlm/binder'
import { bindRecoverPasswordBlm } from './RecoverPasswordBlm/binder'
import { bindMediaViewBlm } from './MediaViewBlm/binder'
export const BLMS_BINDERS = [
  bindMediaViewBlm,
  bindRecoverPasswordBlm,
  bindSmsCodeApproveBlm,
  bindInProgressBlm,
  bindConfirmModalBlm,
  bindProfileBlm,
  bindApartmentsBlm,
  bindApplicationsBlm,
  bindFloatInfoBlm,
  bindCompaniesBlm,
  bindVotesBlm,
  bindNewsBlm,
  bindNotificationsBlm,
  bindGuideBlm,
  bindGlobalLoadingBlm,
  bindAuthenticationBlm,
  bindTenantsBlm,
  bindAppStateBlm,
]
