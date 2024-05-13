import React, { FC } from 'react'
import { Circle, Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const ClosecircleIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <Circle cx="8" cy="8" r="8" fill="#EFF9FF" />
      <Path d="M4.5 4.5L11.5 11.5M4.5 11.5L11.5 4.5" stroke={'#708ED7'} strokeWidth="1.5" />
    </>
  ),
  16,
  16,
)
