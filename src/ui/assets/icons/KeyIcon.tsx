import React, { FC } from 'react'
import { G, Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const KeyIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <G id="Key">
        <Path
          id="Icon"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M32.3996 14.4C32.3996 20.3647 27.5643 25.2 21.5996 25.2C20.5085 25.2 19.4552 25.0382 18.4623 24.7373L14.3996 28.8H10.7996V32.4H3.59961V25.2L11.2623 17.5373C10.9614 16.5444 10.7996 15.4911 10.7996 14.4C10.7996 8.43532 15.6349 3.6 21.5996 3.6C27.5643 3.6 32.3996 8.43532 32.3996 14.4ZM21.5996 7.2C20.6055 7.2 19.7996 8.00588 19.7996 9C19.7996 9.99411 20.6055 10.8 21.5996 10.8C23.5878 10.8 25.1996 12.4118 25.1996 14.4C25.1996 15.3941 26.0055 16.2 26.9996 16.2C27.9937 16.2 28.7996 15.3941 28.7996 14.4C28.7996 10.4235 25.5761 7.2 21.5996 7.2Z"
          fill={props.color || 'black'}
        />
      </G>
    </>
  ),
  36,
  36,
)
