import { LinkingOptions } from '@react-navigation/native'
import { DEEPLINK_URL } from '@env'
import { Linking } from 'react-native'
import { NavigationContainerProps } from '@react-navigation/core'

export const GET_LINKING = (
  onReceiveURL: (url: string) => void,
): LinkingOptions<NavigationContainerProps> | undefined => ({
  prefixes: ['smarthome://', DEEPLINK_URL],
  subscribe() {
    // Listen to incoming links from deep linking
    const subscription = Linking.addEventListener('url', data => onReceiveURL(data.url))

    return () => {
      // Clean up the event listeners
      subscription.remove()
    }
  },
  // Custom function to get the URL which was used to open the app
  async getInitialURL() {
    // As a fallback, you may want to do the default deep link handling
    const url = await Linking.getInitialURL()

    if (url) {
      onReceiveURL(url)
    }

    return url
  },
})
