import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const UserIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      {props.active ? (
        <>
          <Path
            d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
            fill={props.color || 'black'}
          />
          <Path
            d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
            fill={props.color || 'black'}
          />
        </>
      ) : (
        <>
          <Path
            d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
            fill={props.color || '#708ED7'}
          />
          <Path
            d="M12 14C9.17219 14 6.73601 15.6768 5.63151 18.0903C4.94205 19.5969 6.34315 21 8 21H16C17.6569 21 19.058 19.5969 18.3685 18.0903C17.264 15.6768 14.8278 14 12 14Z"
            fill={props.color || '#708ED7'}
          />
        </>
      )}
    </>
  ),
  24,
  24,
)
