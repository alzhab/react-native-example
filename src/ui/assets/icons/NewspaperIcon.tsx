import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'

export const NewspaperIcon: FC<IIconProps> = baseIcon(
  props =>
    props.active ? (
      <>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.00018 14.8751C7.00018 11.9756 9.35068 9.62512 12.2502 9.62512H33.2501C36.1495 9.62512 38.5 11.9756 38.5 14.8751V41.125C38.5 44.0245 40.8505 46.375 43.75 46.375H12.2502C9.35068 46.375 7.00018 44.0245 7.00018 41.125V14.8751ZM14.8751 17.5001H30.6251V28H14.8751V17.5001ZM30.6251 33.25H14.8751V38.5H30.6251V33.25Z"
          stroke="#708ED7"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M41.125 20.1251H43.75C46.6495 20.1251 49 22.4756 49 25.3751V39.8125C49 41.9871 47.2371 43.75 45.0625 43.75C42.8879 43.75 41.125 41.9871 41.125 39.8125V20.1251Z"
          stroke="#708ED7"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ) : (
      <>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.00018 14.8751C7.00018 11.9756 9.35068 9.62512 12.2502 9.62512H33.2501C36.1495 9.62512 38.5 11.9756 38.5 14.8751V41.125C38.5 44.0245 40.8505 46.375 43.75 46.375H12.2502C9.35068 46.375 7.00018 44.0245 7.00018 41.125V14.8751ZM14.8751 17.5001H30.6251V28H14.8751V17.5001ZM30.6251 33.25H14.8751V38.5H30.6251V33.25Z"
          fill="#708ED7"
        />
        <Path
          d="M41.125 20.1251H43.75C46.6495 20.1251 49 22.4756 49 25.3751V39.8125C49 41.9871 47.2371 43.75 45.0625 43.75C42.8879 43.75 41.125 41.9871 41.125 39.8125V20.1251Z"
          fill="#708ED7"
        />
      </>
    ),
  56,
  56,
)
