import React from 'react'
import { CompProps } from 'types/component.types'
import { IConfirmModalProps } from './types'
import { ModalBottom } from 'atoms/ModalBottom'
import { HEIGHT } from 'configs/Theme/constants'
import { observer } from 'mobx-react'
import { useConfirmModalAdapter } from 'blms/ConfirmModalBlm/ui-adapters'
import { Text } from 'atoms/Text'
import { Block } from 'molecules/Block'

export const ConfirmModal: CompProps<IConfirmModalProps> = observer(() => {
  const { isConfirmModalOpen, closeConfirmModal, data, acceptConfirmModal } =
    useConfirmModalAdapter()

  return (
    <ModalBottom
      contentContainer={'container_20'}
      minHeight={HEIGHT / 3}
      visible={isConfirmModalOpen}
      close={closeConfirmModal}>
      <Text ta={'center'} marginB={15} type={'headlineSmall'}>
        {data.confirmTitle || 'Вы уверены ?'}
      </Text>
      {!!data.desc && <Text ta={'center'}>{data.desc}</Text>}

      <Block
        marginT={50}
        marginB={12}
        text={data.confirmTitle || 'Подтвердить'}
        width={'100%'}
        height={41}
        radius={100}
        onPress={acceptConfirmModal}
      />

      <Block
        text={data.cancelTitle || 'Отмена'}
        bg={'transparent'}
        textColor={'variant2'}
        borderColor={'variant7'}
        width={'100%'}
        border={1}
        height={41}
        radius={100}
        onPress={closeConfirmModal}
      />
    </ModalBottom>
  )
})
