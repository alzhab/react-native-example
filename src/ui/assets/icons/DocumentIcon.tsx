import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const DocumentIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 9C12.3431 9 11 10.3431 11 12V30C11 31.6569 12.3431 33 14 33H26C27.6569 33 29 31.6569 29 30V17.1213C29 16.3257 28.6839 15.5626 28.1213 15L23 9.87868C22.4374 9.31607 21.6743 9 20.8787 9H14ZM17 24C17 23.1716 16.3284 22.5 15.5 22.5C14.6716 22.5 14 23.1716 14 24V28.5C14 29.3284 14.6716 30 15.5 30C16.3284 30 17 29.3284 17 28.5V24ZM20 19.5C20.8284 19.5 21.5 20.1716 21.5 21V28.5C21.5 29.3284 20.8284 30 20 30C19.1716 30 18.5 29.3284 18.5 28.5V21C18.5 20.1716 19.1716 19.5 20 19.5ZM26 18C26 17.1716 25.3284 16.5 24.5 16.5C23.6716 16.5 23 17.1716 23 18V28.5C23 29.3284 23.6716 30 24.5 30C25.3284 30 26 29.3284 26 28.5V18Z"
        fill="black"
      />
    </>
  ),
  40,
  40,
)
