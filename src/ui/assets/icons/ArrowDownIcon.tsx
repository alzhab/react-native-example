import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const ArrowDownIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <Path
        id="arrow"
        d="M14.6109 15.1513C13.0099 17.132 9.99013 17.132 8.38915 15.1513L1.61014 6.76447C0.504153 4.14871 1.3576 0.249998 4.721 0.249998L18.279 0.249999C21.6424 0.249999 23.5042 4.14871 21.3899 6.76447L14.6109 15.1513Z"
        fill="white"
      />
    </>
  ),
  23,
  17,
)
