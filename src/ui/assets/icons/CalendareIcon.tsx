import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { baseIcon, IIconProps } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const CalendareIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 10C14.3096 10 13.75 10.5596 13.75 11.25V12.5H12.5C11.1193 12.5 10 13.6193 10 15V27.5C10 28.8807 11.1193 30 12.5 30H27.5C28.8807 30 30 28.8807 30 27.5V15C30 13.6193 28.8807 12.5 27.5 12.5H26.25V11.25C26.25 10.5596 25.6904 10 25 10C24.3096 10 23.75 10.5596 23.75 11.25V12.5H16.25V11.25C16.25 10.5596 15.6904 10 15 10ZM15 16.25C14.3096 16.25 13.75 16.8096 13.75 17.5C13.75 18.1904 14.3096 18.75 15 18.75H25C25.6904 18.75 26.25 18.1904 26.25 17.5C26.25 16.8096 25.6904 16.25 25 16.25H15Z"
        fill={props.color || 'black'}
      />
    </>
  ),
  40,
  40,
)
