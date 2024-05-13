import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const ErroralertIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 1.75C4.05 1.75 1.25 4.55 1.25 8C1.25 11.45 4.05 14.25 7.5 14.25C10.95 14.25 13.75 11.45 13.75 8C13.75 4.55 10.95 1.75 7.5 1.75ZM8.125 11.125H6.875V9.875H8.125V11.125ZM8.125 8.625H6.875V4.875H8.125V8.625Z"
        fill={props.color || 'white'}
      />
    </>
  ),
  15,
  16,
)
