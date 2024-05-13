import React, { FC } from 'react'
import { Path } from 'react-native-svg'
import { IIconProps, baseIcon } from '@corrbo/module-icon'
import { Spacings } from '@corrbo/module-spacing-props'

export const EyeOpenIcon: FC<IIconProps & Spacings> = baseIcon(
  props =>
    props.active ? (
      <>
        <Path
          d="M9.99928 12.5C11.1038 12.5 11.9993 11.6046 11.9993 10.5C11.9993 9.39543 11.1038 8.5 9.99928 8.5C8.89471 8.5 7.99928 9.39543 7.99928 10.5C7.99928 11.6046 8.89471 12.5 9.99928 12.5Z"
          fill="#708ED7"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.457031 10.5C1.73128 6.44291 5.52158 3.5 9.99924 3.5C14.4769 3.5 18.2671 6.44288 19.5414 10.5C18.2672 14.5571 14.4769 17.5 9.99922 17.5C5.52159 17.5 1.73131 14.5571 0.457031 10.5ZM13.9993 10.5C13.9993 12.7091 12.2084 14.5 9.99928 14.5C7.79014 14.5 5.99928 12.7091 5.99928 10.5C5.99928 8.29086 7.79014 6.5 9.99928 6.5C12.2084 6.5 13.9993 8.29086 13.9993 10.5Z"
          fill="#708ED7"
        />
      </>
    ) : (
      <>
        <Path
          d="M11.4993 10.5C11.4993 11.3284 10.8277 12 9.99928 12C9.17085 12 8.49928 11.3284 8.49928 10.5C8.49928 9.67157 9.17085 9 9.99928 9C10.8277 9 11.4993 9.67157 11.4993 10.5ZM0.982492 10.5C2.23851 6.72292 5.80152 4 9.99924 4C14.1969 4 17.7599 6.72289 19.016 10.5C17.76 14.2771 14.1969 17 9.99922 17C5.80153 17 2.23853 14.2771 0.982492 10.5ZM9.99928 15C12.4846 15 14.4993 12.9853 14.4993 10.5C14.4993 8.01472 12.4846 6 9.99928 6C7.514 6 5.49928 8.01472 5.49928 10.5C5.49928 12.9853 7.514 15 9.99928 15Z"
          stroke="#708ED7"
        />
      </>
    ),
  20,
  21,
)