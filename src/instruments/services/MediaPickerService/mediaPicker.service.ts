import { injectable } from 'inversify'
import { IMediaPickerService } from './types'
import DocumentPicker, {
  DocumentPickerResponse,
  isCancel,
  isInProgress,
} from 'react-native-document-picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { ImagePickerResponse } from 'react-native-image-picker/src/types'
import { Alert, Platform } from 'react-native'
import {
  PERMISSIONS,
  Permission,
  RESULTS,
  check,
  request,
  openSettings,
} from 'react-native-permissions'
import { IS_IOS } from 'configs/Theme/constants'
import Toast from 'react-native-toast-message'

export const MediaPickerServiceId = Symbol.for('MediaPickerService')

@injectable()
export class MediaPickerService implements IMediaPickerService {
  async pickDocuments(multi: boolean): Promise<DocumentPickerResponse[] | void> {
    try {
      return DocumentPicker.pick({
        presentationStyle: 'pageSheet',
        copyTo: 'cachesDirectory',
        allowMultiSelection: multi,
        mode: 'open',
      })
    } catch (e) {
      this.handleError(e)
    }
  }

  async pickImageOrVideoFromCamera(): Promise<ImagePickerResponse | void> {
    try {
      return this.checkPermission(
        Platform.select({
          ios: PERMISSIONS.IOS.CAMERA,
          android: PERMISSIONS.ANDROID.CAMERA,
          default: PERMISSIONS.IOS.CAMERA,
        }),
      )
        .catch(() => {
          Toast.show({ type: 'error', text1: 'Нет доступа' })
          return Promise.reject(true)
        })
        .then(
          () =>
            new Promise(res => {
              return launchCamera(
                {
                  mediaType: 'mixed',
                  durationLimit: 60,
                  cameraType: 'front',
                },
                data => res(data),
              )
            }),
        )
    } catch (e) {
      this.handleError(e)
    }
  }

  async pickImageOrVideoFromLibrary(count?: number): Promise<ImagePickerResponse | void> {
    try {
      return this.checkPermission(
        Platform.select({
          ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
          android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
          default: PERMISSIONS.IOS.PHOTO_LIBRARY,
        }),
      )
        .catch(() => {
          Toast.show({ type: 'error', text1: 'Нет доступа' })
          return Promise.reject(true)
        })
        .then(
          () =>
            new Promise(res => {
              return launchImageLibrary(
                {
                  mediaType: 'mixed',
                  selectionLimit: count || 0,
                },
                data => {
                  return res(data)
                },
              )
            }),
        )
    } catch (e) {
      this.handleError(e)
    }
  }

  async pickImageFromCamera(): Promise<ImagePickerResponse | void> {
    try {
      return this.checkPermission(
        Platform.select({
          ios: PERMISSIONS.IOS.CAMERA,
          android: PERMISSIONS.ANDROID.CAMERA,
          default: PERMISSIONS.IOS.CAMERA,
        }),
      )
        .catch(() => {
          Toast.show({ type: 'error', text1: 'Нет доступа' })
          return Promise.reject(true)
        })
        .then(
          () =>
            new Promise(res => {
              return launchCamera(
                {
                  mediaType: 'photo',
                  cameraType: 'front',
                },
                data => res(data),
              )
            }),
        )
    } catch (e) {
      this.handleError(e)
    }
  }

  async pickImageFromLibrary(count?: number): Promise<ImagePickerResponse | void> {
    try {
      return this.checkPermission(
        Platform.select({
          ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
          android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
          default: PERMISSIONS.IOS.PHOTO_LIBRARY,
        }),
      )
        .catch(() => {
          Toast.show({ type: 'error', text1: 'Нет доступа' })
          return Promise.reject(true)
        })
        .then(
          () =>
            new Promise(res => {
              return launchImageLibrary(
                {
                  mediaType: 'photo',
                  selectionLimit: count || 0,
                },
                data => {
                  return res(data)
                },
              )
            }),
        )
    } catch (e) {
      this.handleError(e)
    }
  }

  handleError = (err: unknown) => {
    if (isCancel(err)) {
      console.warn('cancelled')
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn('multiple pickers were opened, only the last will be considered')
    } else {
      throw err
    }
  }

  checkPermission(permission: Permission) {
    if (IS_IOS) {
      return check(permission).then(res => {
        if (res === RESULTS.DENIED) {
          return request(permission).then(res2 => {
            if (res2 === RESULTS.GRANTED) {
              return Promise.resolve(true)
            } else {
              return Promise.reject(true)
            }
          })
          // @ts-ignore
        } else if ([RESULTS.GRANTED, RESULTS.LIMITED].includes(res)) {
          return Promise.resolve(true)
        } else {
          this.openSettings()
          return Promise.reject(true)
        }
      })
    } else {
      return check(permission).then(res => {
        // @ts-ignore
        if ([RESULTS.GRANTED, RESULTS.LIMITED].includes(res)) {
          return Promise.resolve(true)
        } else {
          return request(permission).then(res2 => {
            if (res2 === RESULTS.GRANTED) {
              return Promise.resolve(true)
            } else {
              this.openSettings()
            }
          })
        }
      })
    }
  }

  openSettings() {
    Alert.alert(
      'Отсутствует разрешение',
      'Пожалуйста, предоставьте приложению необходимые разрешения в настройках устройства',
      [{ text: 'Отмена', onPress: () => {}, style: 'cancel' }],
      { cancelable: true },
    )
  }
}
