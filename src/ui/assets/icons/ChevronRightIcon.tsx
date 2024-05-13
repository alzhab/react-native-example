import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const ChevronRightIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <Path
        d="M9 5L16 12L9 19"
        stroke={props.color || '#708ED7'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  24,
  24,
)
