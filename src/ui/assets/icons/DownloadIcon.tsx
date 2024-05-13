import React, { FC } from 'react'
import { G, Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const DownloadIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <G id="Download">
        <Path
          id="Icon"
          d="M3 12L3 12.75C3 13.9926 4.00736 15 5.25 15L12.75 15C13.9926 15 15 13.9926 15 12.75L15 12M12 9L9 12M9 12L6 9M9 12L9 3"
          stroke={props.color || 'white'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </>
  ),
  18,
  18,
)
