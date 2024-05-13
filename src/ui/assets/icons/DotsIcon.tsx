import React, { FC } from 'react'
import { Circle } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const DotsIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <Circle cx="12.5" cy="4.5" r="2.5" fill="black" />
      <Circle cx="12.5" cy="12" r="2.5" fill="black" />
      <Circle cx="12.5" cy="19.5" r="2.5" fill="black" />
    </>
  ),
  24,
  24,
)
