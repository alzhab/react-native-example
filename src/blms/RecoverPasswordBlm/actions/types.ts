export interface IRecoverPasswordActions {
  openModal(): void
  closeModal(): void
  onCodeSubmit(val: { code: string; phone: string }): void
  onPasswordSubmit(password: string): void
  clear(): void
}
