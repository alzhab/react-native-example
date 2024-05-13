import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const PhotographIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 6C5.79086 6 4 7.79086 4 10V30C4 32.2091 5.79086 34 8 34H32C34.2091 34 36 32.2091 36 30V10C36 7.79086 34.2091 6 32 6H8ZM32 30H8L16 14L22 26L26 18L32 30Z"
        fill={props.color || 'black'}
      />
    </>
  ),
  40,
  40,
)
