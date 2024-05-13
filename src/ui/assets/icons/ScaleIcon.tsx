import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'

export const ScaleIcon: FC<IIconProps> = baseIcon(
  props => (
    <>
     
<Path d="M2 4.5L4 5.16667M4 5.16667L2 11.1667C3.18168 12.0556 4.81911 12.0556 6.00079 11.1667M4 5.16667L6.00004 11.1667M4 5.16667L8 3.83333M12 5.16667L14 4.5M12 5.16667L10 11.1667C11.1817 12.0556 12.8191 12.0556 14.0008 11.1667M12 5.16667L14 11.1667M12 5.16667L8 3.83333M8 2.5V3.83333M8 14.5V3.83333M8 14.5H6M8 14.5H10" stroke={ props.color || '#708ED7' } strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>


    </>
  ),
  16,
  17,
)
