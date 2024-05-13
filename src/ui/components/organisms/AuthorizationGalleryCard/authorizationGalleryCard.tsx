import React from 'react'
import { CompProps } from 'types/component.types'
import { IAuthorizationGalleryCardProps } from './types'
import { ICreateStyles, useStyles } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { Image } from 'atoms/Image'

export const AuthorizationGalleryCard: CompProps<IAuthorizationGalleryCardProps> = props => {
  const styles = useStyles(SS, props)

  return <Image source={props.img} style={styles.container} resizeMode={'contain'} />
}

const SS: ICreateStyles<IAuthorizationGalleryCardProps> = ({ colors, props }) =>
  ScaledSheet.create({
    container: {
      borderRadius: 16,
      backgroundColor: colors.authorization_gallery_card_bg,
      height: '100%',
    },
  })
