import React, { useEffect, useRef, useState } from 'react'
import { CompProps } from 'types/component.types'
import { IGuideStepProps } from './types'
import ViewShot, { captureRef } from 'react-native-view-shot'
import { IViewProps } from 'atoms/View'
import { observer } from 'mobx-react'
import { InteractionManager } from 'react-native'
import { HEIGHT, WIDTH } from 'configs/Theme/constants'
import { useGuideStepAdapter } from 'blms/GuideBlm/ui-adapters'

export const GuideStep: CompProps<IGuideStepProps & IViewProps> = observer(
  ({ children, stepNumbers, ...props }) => {
    const [layout, setLayout] = useState<{
      x: number
      y: number
      width: number
      height: number
    } | null>(null)
    const ref = useRef<any>()
    const { addActiveSteps } = useGuideStepAdapter()

    useEffect(() => {
      if (props.isReadyToCapture && ref && ref.current && layout) {
        InteractionManager.runAfterInteractions(() => {
          captureRef(ref.current, {
            fileName: 'guider-step',
            format: 'jpg',
            quality: 0.9,
            result: 'data-uri',
          })
            .then((uri: string) => {
              addActiveSteps(
                stepNumbers.map(step => ({
                  key: step.toString(),
                  val: {
                    componentImage: uri,
                    layout: {
                      top: layout.y,
                      left: layout.x,
                      right: WIDTH - layout.x,
                      bottom: HEIGHT - layout.y,
                      width: layout.width,
                      height: layout.height,
                    },
                  },
                })),
              )
            })
            .catch(err => {
              return err
            })
        })
      }
    }, [ref, layout, props.isReadyToCapture])

    return (
      <ViewShot onLayout={e => setLayout(e.nativeEvent.layout)} ref={ref} {...props}>
        {children}
      </ViewShot>
    )
  },
)
