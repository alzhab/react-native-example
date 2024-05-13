import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'

export const Payment-cardIcon: FC<IIconProps> = baseIcon(
  props => (
    <>
     
<Path d="M44.3333 14H11.6667C9.08934 14 7 16.0893 7 18.6667V39.6667C7 42.244 9.08934 44.3333 11.6667 44.3333H44.3333C46.9107 44.3333 49 42.244 49 39.6667V18.6667C49 16.0893 46.9107 14 44.3333 14Z" stroke={ props.color || '#708ED7' } strokeWidth="4.66667" strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M7 23.3334H47.8333" stroke={ props.color || '#708ED7' } strokeWidth="4.66667" strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M16.3333 35H21" stroke={ props.color || '#708ED7' } strokeWidth="4.66667" strokeLinecap="round" strokeLinejoin="round"/>


    </>
  ),
  56,
  56,
)
