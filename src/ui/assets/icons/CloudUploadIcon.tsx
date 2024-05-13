import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const CloudUploadIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <Path
        d="M6.66667 14.6667C4.36548 14.6667 2.5 12.8012 2.5 10.5C2.5 8.45961 3.9666 6.76177 5.90313 6.40314C6.26177 4.4666 7.95961 3 10 3C12.0404 3 13.7382 4.4666 14.0969 6.40314C16.0334 6.76177 17.5 8.45961 17.5 10.5C17.5 12.8012 15.6345 14.6667 13.3333 14.6667M7.5 10.5L10 8M10 8L12.5 10.5M10 8V18"
        stroke={props.color || '#708ED7'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  20,
  21,
)
