import { IProfileEditPasswordParams, IUser } from 'repositories/Api'

export interface IProfileDeleteActions {
  deleteProfile(): void
}

export interface IProfileEditActions {
  submit(data: IUser): void
}

export interface IProfilePasswordEditActions {
  submit(data: IProfileEditPasswordParams): void
}
