import React, { FC } from 'react'
import { baseIcon, IIconProps } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'
import { Path } from 'react-native-svg'

export const TrashIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.75 0C7.27654 0 6.84371 0.267503 6.63197 0.690983L5.72746 2.5H1.5C0.809644 2.5 0.25 3.05964 0.25 3.75C0.25 4.44036 0.809645 5 1.5 5L1.5 17.5C1.5 18.8807 2.61929 20 4 20H14C15.3807 20 16.5 18.8807 16.5 17.5V5C17.1904 5 17.75 4.44036 17.75 3.75C17.75 3.05964 17.1904 2.5 16.5 2.5H12.2725L11.368 0.690983C11.1563 0.267503 10.7235 0 10.25 0H7.75ZM5.25 7.5C5.25 6.80964 5.80964 6.25 6.5 6.25C7.19036 6.25 7.75 6.80964 7.75 7.5V15C7.75 15.6904 7.19036 16.25 6.5 16.25C5.80964 16.25 5.25 15.6904 5.25 15V7.5ZM11.5 6.25C10.8096 6.25 10.25 6.80964 10.25 7.5V15C10.25 15.6904 10.8096 16.25 11.5 16.25C12.1904 16.25 12.75 15.6904 12.75 15V7.5C12.75 6.80964 12.1904 6.25 11.5 6.25Z"
        fill={props.color || '#708ED7'}
      />
    </>
  ),
  18,
  20,
)
