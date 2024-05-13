import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const CloseIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <Path
        id="Vector 3"
        d="M1 1L15 15M1 15L15 1"
        stroke={props.color || '#708ED7'}
        strokeWidth="2"
      />
    </>
  ),
  16,
  16,
)
