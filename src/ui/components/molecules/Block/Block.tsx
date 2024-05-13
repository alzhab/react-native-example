import React from 'react'
import { CompProps } from 'types/component.types'
import { IBlockProps } from './types'
import { Pressable } from 'atoms/Pressable'
import { ICreateStyles, useStyles, useTheme } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { Spacings, useSpacings } from '@corrbo/module-spacing-props'
import { Text } from 'atoms/Text'
import { FONTS_TYPES } from 'configs/Theme/fonts/types'

export const Block: CompProps<IBlockProps & Spacings> = props => {
  const styles = useStyles(SS, props)
  const { margin, padding } = useSpacings(props)
  const { colors } = useTheme()

  return (
    <Pressable
      style={[styles.container, padding, margin, props.style]}
      disabled={props.bg === 'disabled' || !props.onPress}
      onPress={props.bg === 'disabled' ? undefined : props.onPress}
      jc={props.jc}>
      {!!props.icon && (
        <props.icon
          active={props.iconActive}
          onPress={props.bg === 'disabled' ? undefined : props.onPress}
          size={props.iconSize || 24}
          color={
            props.iconColor
              ? colors[`block_border_${props?.iconColor || 'variant1'}`]
              : colors[`block_color_${props?.bg || 'variant1'}`]
          }
        />
      )}
      {!!props.text && (
        <Text
          numberOfLines={props.textNumbersOfLine}
          type={props.textType}
          style={[props.textType ? {} : styles.text, props.textStyle]}
          // @ts-ignore
          color={`block_color_${
            props?.textColor || props?.borderColor || props?.bg || 'variant1'
          }`}>
          {props.text}
        </Text>
      )}

      {props.children}
    </Pressable>
  )
}

Block.defaultProps = {
  bg: 'variant1',
  jc: 'center',
}
const SS: ICreateStyles<IBlockProps> = ({ colors, props }) =>
  ScaledSheet.create({
    container: {
      width: props?.width || undefined,
      height: props?.height || undefined,
      borderRadius: props?.radius
        ? props?.radius
        : typeof props?.height === 'number'
        ? props?.height
        : 0,
      backgroundColor: colors[`block_bg_${props?.bg || 'variant1'}`],
      borderColor: colors[`block_border_${props?.borderColor || props?.bg || 'variant1'}`],
      alignItems: 'center',
      borderWidth: props?.border ? (typeof props?.border === 'number' ? props.border : 1) : 0,
      flexDirection: props?.rl ? 'row-reverse' : 'row',
      columnGap: props?.gap || 4,
    },
    text: {
      fontSize: props?.textSize || 14,
      fontFamily: props?.textFamily || FONTS_TYPES.regular,
      lineHeight: props?.textLineHeight ? props?.textLineHeight : (props?.textSize || 14) + 2,
    },
  })
