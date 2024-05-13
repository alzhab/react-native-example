import React, { FC } from 'react'
import { G, Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const DocumenttextIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <G id="Document text">
        <Path
          id="Icon"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 8C8 5.79086 9.79086 4 12 4H21.1716C22.2324 4 23.2499 4.42143 24 5.17157L30.8284 12C31.5786 12.7501 32 13.7676 32 14.8284V32C32 34.2091 30.2091 36 28 36H12C9.79086 36 8 34.2091 8 32V8ZM12 20C12 18.8954 12.8954 18 14 18H26C27.1046 18 28 18.8954 28 20C28 21.1046 27.1046 22 26 22H14C12.8954 22 12 21.1046 12 20ZM14 26C12.8954 26 12 26.8954 12 28C12 29.1046 12.8954 30 14 30H26C27.1046 30 28 29.1046 28 28C28 26.8954 27.1046 26 26 26H14Z"
          fill={props.color || '#708ED7'}
        />
      </G>
    </>
  ),
  40,
  40,
)
