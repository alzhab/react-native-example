import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const CameraIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <Path
        d="M2.5 7.99992C2.5 7.07944 3.24619 6.33325 4.16667 6.33325H4.94136C5.49862 6.33325 6.019 6.05475 6.32811 5.59109L7.00522 4.57542C7.31433 4.11175 7.83472 3.83325 8.39197 3.83325H11.608C12.1653 3.83325 12.6857 4.11175 12.9948 4.57542L13.6719 5.59109C13.981 6.05475 14.5014 6.33325 15.0586 6.33325H15.8333C16.7538 6.33325 17.5 7.07944 17.5 7.99992V15.4999C17.5 16.4204 16.7538 17.1666 15.8333 17.1666H4.16667C3.24619 17.1666 2.5 16.4204 2.5 15.4999V7.99992Z"
        stroke={props.color || '#708ED7'}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.5 11.3333C12.5 12.714 11.3807 13.8333 10 13.8333C8.61929 13.8333 7.5 12.714 7.5 11.3333C7.5 9.95254 8.61929 8.83325 10 8.83325C11.3807 8.83325 12.5 9.95254 12.5 11.3333Z"
        stroke={props.color || '#708ED7'}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  20,
  21,
)
