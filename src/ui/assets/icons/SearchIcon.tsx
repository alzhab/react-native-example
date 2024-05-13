import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const SearchIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <Path
        d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z"
        stroke={props.color || '#708ED7'}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  16,
  16,
)
