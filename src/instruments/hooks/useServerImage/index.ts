import { FTP_SERVER_URL, SERVER_URL } from '@env'

export function useServerImage(image: string) {
  return [FTP_SERVER_URL, SERVER_URL].some(item => image.includes(item))
    ? image
    : SERVER_URL + image
}

export function getServerImage(image: string) {
  return [FTP_SERVER_URL, SERVER_URL].some(item => image.includes(item))
    ? image
    : SERVER_URL + image
}
