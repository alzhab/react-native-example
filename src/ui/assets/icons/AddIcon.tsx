import React, { FC } from 'react'
import { G, Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const AddIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <G id="Icons/add">
      <Path
        id="icon"
        d="M15 10.25H9.75V15.5H8.25V10.25H3V8.75H8.25V3.5H9.75V8.75H15V10.25Z"
        fill={props.color || 'white'}
      />
    </G>
  ),
  18,
  19,
)
