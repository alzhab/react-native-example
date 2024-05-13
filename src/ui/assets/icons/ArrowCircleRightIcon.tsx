import React, { FC } from 'react'
import { G, Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const ArrowCircleRightIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <G id="Arrow circle right">
        <Path
          id="Icon"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.00078 16.7C12.9772 16.7 16.2008 13.4765 16.2008 9.5C16.2008 5.52355 12.9772 2.3 9.00078 2.3C5.02433 2.3 1.80078 5.52355 1.80078 9.5C1.80078 13.4765 5.02433 16.7 9.00078 16.7ZM12.3372 8.8636L9.63718 6.1636C9.28571 5.81213 8.71586 5.81213 8.36439 6.1636C8.01291 6.51508 8.01291 7.08492 8.36439 7.4364L9.52799 8.6L6.30078 8.6C5.80373 8.6 5.40078 9.00294 5.40078 9.5C5.40078 9.99706 5.80373 10.4 6.30078 10.4H9.52799L8.36439 11.5636C8.01291 11.9151 8.01291 12.4849 8.36439 12.8364C8.71586 13.1879 9.28571 13.1879 9.63718 12.8364L12.3372 10.1364C12.6887 9.78492 12.6887 9.21508 12.3372 8.8636Z"
          fill={props.color || '#708ED7'}
        />
      </G>
    </>
  ),
  18,
  19,
)
