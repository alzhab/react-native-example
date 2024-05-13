import { IColors, TYPOGRAPHY } from '@corrbo/module-theme'

export interface ITextProps {
  color?: keyof IColors
  wrap?: boolean
  ta?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined
  type?: keyof typeof TYPOGRAPHY
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
}
