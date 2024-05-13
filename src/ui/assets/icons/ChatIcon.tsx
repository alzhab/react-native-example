import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const ChatIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <Path
        d="M8 12.25C8 10.5931 9.34315 9.25 11 9.25H21.5C23.1569 9.25 24.5 10.5931 24.5 12.25V18.25C24.5 19.9069 23.1569 21.25 21.5 21.25H18.5L14 25.75V21.25H11C9.34315 21.25 8 19.9069 8 18.25V12.25Z"
        fill={props.color || 'black'}
      />
      <Path
        d="M27.5 15.25V18.25C27.5 21.5637 24.8137 24.25 21.5 24.25H19.7426L17.0926 26.9001C17.5123 27.1234 17.9914 27.25 18.5 27.25H21.5L26 31.75V27.25H29C30.6569 27.25 32 25.9069 32 24.25V18.25C32 16.5931 30.6569 15.25 29 15.25H27.5Z"
        fill={props.color || 'black'}
      />
    </>
  ),
  40,
  40,
)
