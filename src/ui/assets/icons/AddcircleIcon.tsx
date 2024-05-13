import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const AddcircleIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.9998 16.7C12.9762 16.7 16.1998 13.4765 16.1998 9.50005C16.1998 5.5236 12.9762 2.30005 8.9998 2.30005C5.02335 2.30005 1.7998 5.5236 1.7998 9.50005C1.7998 13.4765 5.02335 16.7 8.9998 16.7ZM9.8998 6.80005C9.8998 6.30299 9.49685 5.90005 8.9998 5.90005C8.50274 5.90005 8.0998 6.30299 8.0998 6.80005V8.60005H6.2998C5.80275 8.60005 5.3998 9.00299 5.3998 9.50005C5.3998 9.99711 5.80275 10.4 6.2998 10.4H8.0998V12.2C8.0998 12.6971 8.50274 13.1 8.9998 13.1C9.49685 13.1 9.8998 12.6971 9.8998 12.2V10.4H11.6998C12.1969 10.4 12.5998 9.99711 12.5998 9.50005C12.5998 9.00299 12.1969 8.60005 11.6998 8.60005H9.8998V6.80005Z"
        fill="#708ED7"
      />
    </>
  ),
  18,
  18,
)
