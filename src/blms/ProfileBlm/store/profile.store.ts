import { injectable } from 'inversify'
import { IProfileStore } from './types'
import { makeAutoObservable } from 'mobx'
import { isHydrated, makePersistable } from 'mobx-persist-store'
import { IUser } from 'repositories/Api'

export const ProfileStoreId = Symbol.for('ProfileStore')

@injectable()
export class ProfileStore implements IProfileStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, { name: 'ProfileStore', properties: ['profile'] })
  }

  profile: IUser | null = null
  setProfile(val: IProfileStore['profile']): void {
    this.profile = val
  }

  get isHydrated() {
    return isHydrated(this)
  }
}
