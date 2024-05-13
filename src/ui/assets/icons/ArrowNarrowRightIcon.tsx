import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const ArrowNarrowRightIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.0644 4.7636C11.4159 4.41213 11.9857 4.41213 12.3372 4.7636L15.9372 8.3636C16.2886 8.71508 16.2886 9.28492 15.9372 9.6364L12.3372 13.2364C11.9857 13.5879 11.4159 13.5879 11.0644 13.2364C10.7129 12.8849 10.7129 12.3151 11.0644 11.9636L13.128 9.9H2.70078C2.20373 9.9 1.80078 9.49706 1.80078 9C1.80078 8.50294 2.20373 8.1 2.70078 8.1H13.128L11.0644 6.0364C10.7129 5.68492 10.7129 5.11508 11.0644 4.7636Z"
        fill="white"
      />
    </>
  ),
  18,
  18,
)
