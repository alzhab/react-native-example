import React from 'react'
import { CompProps } from 'types/component.types'
import { IGuideBackdropProps } from './types'
import { View } from 'atoms/View'
import { observer } from 'mobx-react'
import { ICreateStyles, useStyles } from '@corrbo/module-theme'
import { ScaledSheet } from 'react-native-size-matters/extend'
import { Image } from 'atoms/Image'
import { GuideCard } from 'organisms/GuideCard'
import { GUIDE_STEPS } from 'configs/Guide'
import { useGuideBackdropAdapter } from 'blms/GuideBlm/ui-adapters'

export const GuideBackdrop: CompProps<IGuideBackdropProps> = observer(() => {
  const { isVisible, stopGuide, activeStepConfig, activeStepInfo, nextStep, activeStep } =
    useGuideBackdropAdapter()
  const styles = useStyles(SS)

  return isVisible && activeStepConfig ? (
    <View style={styles.container}>
      {!!activeStepConfig && !!activeStepInfo && (
        <GuideCard
          activeStep={activeStep}
          config={activeStepConfig}
          info={activeStepInfo}
          stepsCount={Object.keys(GUIDE_STEPS).length}
          onNext={nextStep}
          onClose={stopGuide}
        />
      )}

      <Image
        source={{ uri: activeStepConfig?.componentImage }}
        style={{
          position: 'absolute',
          zIndex: 2,
          ...activeStepConfig.layout,
        }}
      />
    </View>
  ) : null
})

const SS: ICreateStyles = ({ colors }) =>
  ScaledSheet.create({
    container: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
      backgroundColor: colors.guide_backdrop_bg,
    },
  })
