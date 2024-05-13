import { DocumentPickerResponse } from 'react-native-document-picker'
import { ImagePickerResponse } from 'react-native-image-picker/src/types'

export interface IMediaPickerService {
  pickDocuments(mullti: boolean): Promise<DocumentPickerResponse[] | void>
  pickImageOrVideoFromCamera(): Promise<ImagePickerResponse | void>
  pickImageOrVideoFromLibrary(count?: number): Promise<ImagePickerResponse | void>
  pickImageFromCamera(): Promise<ImagePickerResponse | void>
  pickImageFromLibrary(count?: number): Promise<ImagePickerResponse | void>
}

export interface IMediaFile {
  uri: string
  name: string
  type: string
}
