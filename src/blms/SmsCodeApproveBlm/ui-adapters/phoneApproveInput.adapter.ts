import { useInjection } from 'inversify-react'
import { useCallback, useEffect, useMemo } from 'react'
import {
  ESmsCodeApproveState,
  ISmsCodeApproveStore,
  SmsCodeApproveStoreId,
} from 'blms/SmsCodeApproveBlm/store'
import { ISmsCodeApproveActions, SmsCodeApproveActionsId } from 'blms/SmsCodeApproveBlm/actions'
// @ts-ignore
import timer from 'react-native-timer'
import { IApproveSmsCodeParams, ISendSmsCodeParams } from 'repositories/Api'
import { SMS_RESEND_TIME_SECONDS } from 'configs/Theme/constants'

export function usePhoneApproveInputAdapter(data: {
  onApprove: (val: { phone: string; code: string }) => void
  type: ISendSmsCodeParams['type']
  state?: ESmsCodeApproveState
  sendSmsOnStartPhone?: string
  defaultPhone?: string
}) {
  const store = useInjection<ISmsCodeApproveStore>(SmsCodeApproveStoreId)
  const actions = useInjection<ISmsCodeApproveActions>(SmsCodeApproveActionsId)

  const state = useMemo(() => store.state, [store.state])
  const loading = useMemo(() => store.loading, [store.loading])
  const phone = useMemo(() => store.phone, [store.phone])
  const isCodeInvalid = useMemo(() => store.isCodeInvalid, [store.isCodeInvalid])
  const phoneError = useMemo(() => store.phoneError, [store.phoneError])
  const time = useMemo(() => store.time, [store.time])

  const sendSmsCode = useCallback(
    (val: { phone: string }) => {
      actions.sendSmsCode({ phone: val.phone, type: data.type })
    },
    [actions, data.type],
  )

  const checkSmsCode = useCallback(
    (val: Omit<IApproveSmsCodeParams, 'phone'>) => actions.checkSmsCode(val),
    [],
  )

  const changePhone = useCallback(() => {
    timer.clearInterval('sms_send_timer')
    actions.changePhone()
  }, [])

  const resendCode = useCallback(() => actions.resendCode(data.type), [actions, data.type])

  useEffect(() => {
    if (state === ESmsCodeApproveState.approved) {
      data.onApprove({ phone: store.phone, code: store.code })
    }
  }, [state])

  useEffect(() => {
    if (data.sendSmsOnStartPhone) {
      sendSmsCode({ phone: data.sendSmsOnStartPhone })
    }
  }, [])

  useEffect(() => {
    if (time === SMS_RESEND_TIME_SECONDS) {
      timer.setInterval(
        'sms_send_timer',
        () => {
          store.setTime(store.time - 1)
          if (store.time === 0) {
            timer.clearInterval('sms_send_timer')
          }
        },
        1000,
      )
    }
  }, [time])

  useEffect(() => {
    if (data.state) {
      store.setState(data.state)
    }
  }, [data.state])

  useEffect(() => {
    return () => {
      timer.clearInterval('sms_send_timer')
      actions.clear()
    }
  }, [])

  return {
    state,
    loading,
    phone,
    isCodeInvalid,
    phoneError,
    time,

    sendSmsCode,
    checkSmsCode,
    changePhone,
    resendCode,
  }
}
