import { TYPOGRAPHY } from '@corrbo/module-theme'
import { ErroralertIcon } from 'assets/icons/ErroralertIcon'
import { CheckCircleIcon } from 'icons/CheckCircleIcon'
import React from 'react'
import { BaseToast } from 'react-native-toast-message'

export const TOAST_CONFIG = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftWidth: 0,
        height: undefined,
        backgroundColor: '#68AC32',
        borderRadius: 15,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        gap: 6.5,
        width: undefined,
        maxWidth: '90%',
      }}
      contentContainerStyle={{ paddingHorizontal: 0, flex: undefined }}
      text1Style={[
        TYPOGRAPHY.labelLarge,
        {
          color: '#fff',
          maxWidth: '100%',
        },
      ]}
      text1NumberOfLines={2}
      renderLeadingIcon={() => <CheckCircleIcon color={'#fff'} />}
    />
  ),
  error: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftWidth: 0,
        height: undefined,
        backgroundColor: '#EF3E3E',
        borderRadius: 15,
        alignItems: 'center',
        paddingHorizontal: 10,
        gap: 6.5,
        width: undefined,
        zIndex: 1000,
      }}
      contentContainerStyle={{
        paddingHorizontal: 0,
        flex: undefined,
      }}
      text1Style={[
        TYPOGRAPHY.labelLarge,
        {
          color: '#fff',
        },
      ]}
      renderLeadingIcon={() => <ErroralertIcon />}
    />
  ),
}
