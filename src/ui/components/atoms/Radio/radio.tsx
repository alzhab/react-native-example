import React from 'react'
import { CompProps } from 'types/component.types'
import { IRadioProps } from './types'
import { ICreateStyles, useStyles } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { View } from 'react-native'
import { Spacings, useSpacings } from '@corrbo/module-spacing-props'

export const Radio: CompProps<IRadioProps & Spacings> = props => {
  const styles = useStyles(SS)
  const { margin } = useSpacings(props)

  return <View style={[styles.box, margin]}>{props.active && <View style={styles.circle} />}</View>
}

const SS: ICreateStyles = ({ colors }) =>
  ScaledSheet.create({
    box: {
      width: 18,
      height: 18,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.radio_border,
    },
    circle: {
      width: 10,
      height: 10,
      borderRadius: 10,
      backgroundColor: colors.radio_circle,
    },
  })
