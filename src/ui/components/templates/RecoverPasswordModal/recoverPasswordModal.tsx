import React from 'react'
import { CompProps } from 'types/component.types'
import { IRecoverPasswordModalProps } from './types'
import { observer } from 'mobx-react'
import { useRecoverPasswordModalAdapter } from 'blms/RecoverPasswordBlm/ui-adapters'
import { ModalBottom } from 'atoms/ModalBottom'
import { PhoneApproveInput } from 'templates/PhoneApproveInput'

export const RecoverPasswordModal: CompProps<IRecoverPasswordModalProps> = observer(() => {
  const { isModalOpen, closeModal, onCodeSubmit } = useRecoverPasswordModalAdapter()

  return (
    <ModalBottom visible={isModalOpen} isForm close={closeModal} contentContainer={'container_20'}>
      <PhoneApproveInput onApprove={onCodeSubmit} type={'recovery_'} withTitle />
    </ModalBottom>
  )
})
