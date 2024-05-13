import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const DocumentDuplicateIcon: FC<IIconProps & Spacings> = baseIcon(
  props => (
    <>
      {props.active ? (
        <>
          <Path
            d="M14.5858 3H10C8.89543 3 8 3.89543 8 5V7V15C8 16.1046 8.89543 17 10 17H16H18C19.1046 17 20 16.1046 20 15V8.41421C20 8.149 19.8946 7.89464 19.7071 7.70711L15.2929 3.29289C15.1054 3.10536 14.851 3 14.5858 3Z"
            fill={props.color || 'black'}
          />
          <Path
            d="M8 7V15C8 16.1046 8.89543 17 10 17H16M8 7V5C8 3.89543 8.89543 3 10 3H14.5858C14.851 3 15.1054 3.10536 15.2929 3.29289L19.7071 7.70711C19.8946 7.89464 20 8.149 20 8.41421V15C20 16.1046 19.1046 17 18 17H16M8 7H6C4.89543 7 4 7.89543 4 9V19C4 20.1046 4.89543 21 6 21H14C15.1046 21 16 20.1046 16 19V17"
            stroke={props.color || 'black'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <Path
          d="M8 7V15C8 16.1046 8.89543 17 10 17H16M8 7V5C8 3.89543 8.89543 3 10 3H14.5858C14.851 3 15.1054 3.10536 15.2929 3.29289L19.7071 7.70711C19.8946 7.89464 20 8.149 20 8.41421V15C20 16.1046 19.1046 17 18 17H16M8 7H6C4.89543 7 4 7.89543 4 9V19C4 20.1046 4.89543 21 6 21H14C15.1046 21 16 20.1046 16 19V17"
          stroke={props.color || '#595959'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </>
  ),
  24,
  24,
)
