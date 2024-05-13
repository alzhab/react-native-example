import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const InfoIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20C30 25.5228 25.5228 30 20 30C14.4772 30 10 25.5228 10 20ZM18.75 15C18.75 14.3096 19.3096 13.75 20 13.75C20.6904 13.75 21.25 14.3096 21.25 15C21.25 15.6904 20.6904 16.25 20 16.25C19.3096 16.25 18.75 15.6904 18.75 15ZM20 26.25C20.6904 26.25 21.25 25.6904 21.25 25L21.25 20C21.25 19.3096 20.6904 18.75 20 18.75C19.3096 18.75 18.75 19.3096 18.75 20L18.75 25C18.75 25.6904 19.3096 26.25 20 26.25Z"
        fill={props.color || '#708ED7'}
      />
    </>
  ),
  40,
  40,
)
