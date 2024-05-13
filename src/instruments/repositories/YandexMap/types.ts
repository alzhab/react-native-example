export interface IYandexMapRepo {
  getAddress(search: string): Promise<IYandexMapAddress[]>
  getCities(search: string): Promise<IYandexMapCity[]>
  getStreet(city: IYandexMapCity, search: string): Promise<IYandexMapStreet[]>
  getHouse(city: IYandexMapCity, street: string, search: string): Promise<IYandexMapAddress[]>
}

export interface IYandexMapAddress {
  val: string
  title: string
}

export interface IYandexMapCity {
  val: string
  title: string
}

export interface IYandexMapStreet {
  val: string
  title: string
  house_id?: string
}
