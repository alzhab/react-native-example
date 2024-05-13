import React, { FC } from 'react'
import { CompProps } from 'types/component.types'
import { IStepsIndicatorProps } from './types'
import { IViewProps, View } from 'atoms/View'
import { ICreateStyles, useStyles, useTheme } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated'

const Item: FC<any> = ({
  style,
  animValue,
  size,
  bgActive,
  bgInactive,
  borderActive,
  borderInactive,
  index,
  length,
}) => {
  const rStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1]
    let outputRange = [size, size * 3, size]

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1]
    }

    return {
      width: interpolate(animValue.value, inputRange, outputRange),
      backgroundColor: interpolateColor(animValue.value, inputRange, [
        bgInactive,
        bgActive,
        bgInactive,
      ]),
      borderColor: interpolateColor(animValue.value, inputRange, [
        borderInactive,
        borderActive,
        borderInactive,
      ]),
      borderWidth: 0.5,
    }
  }, [])

  return <Animated.View style={[rStyle, style.inactive]} />
}

export const StepsIndicator: CompProps<IStepsIndicatorProps & IViewProps> = props => {
  const style = useStyles(SS, props)
  const { colors } = useTheme()

  return props.steps > 1 ? (
    <View {...props} dir={'row'} ai={'center'} gap={8}>
      {Array(props.steps)
        .fill('')
        .map((_, index) => {
          return (
            <Item
              size={props.size || 8}
              bgActive={colors.steps_indicator_bg_active}
              bgInactive={colors[`steps_indicator_${props.type || 'default'}_bg`]}
              borderActive={colors.steps_indicator_bg_active}
              borderInactive={colors[`steps_indicator_${props.type || 'default'}_border`]}
              animValue={props.progressValue}
              key={index.toString()}
              style={style}
              index={index}
              length={props.steps}
            />
          )
        })}
    </View>
  ) : null
}

StepsIndicator.defaultProps = {
  type: 'default',
}

const SS: ICreateStyles<Pick<IStepsIndicatorProps, 'size' | 'type'>> = ({ colors, props }) =>
  ScaledSheet.create({
    active: {
      borderRadius: 20,
      height: props?.size || 8,
      width: (props?.size || 8) * 3,
      backgroundColor: colors.steps_indicator_bg_active,
    },
    inactive: {
      borderRadius: 15,
      height: props?.size || 8,
      minWidth: props?.size || 8,
      maxWidth: (props?.size || 8) * 3,
    },
  })
