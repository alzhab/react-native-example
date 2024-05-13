import React, { FC } from 'react'
import { G, Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const ArrowLeftIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <G id="Arrow left">
        <Path
          id="Icon"
          d="M10 19L3 12M3 12L10 5M3 12L21 12"
          stroke={props.color || 'black'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </>
  ),
  24,
  24,
)
