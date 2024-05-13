import { IUser } from 'repositories/Api'

export interface IProfileStore {
  profile: IUser | null
  setProfile(val: IProfileStore['profile']): void

  isHydrated: boolean
}
