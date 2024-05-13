import { AppRegistry, LogBox } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { configure } from 'mobx'
import 'reflect-metadata'
import { startNetworkLogging } from 'react-native-network-logger'

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  '"Could not find Fiber with id "27"',
  'Require cycle:',
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
])

startNetworkLogging()

configure({ enforceActions: 'never' })
AppRegistry.registerComponent(appName, () => App)
