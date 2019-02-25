import { ISearchKeyword } from "@business/search/SearchKeyword"

export interface IAd {
  title: string
  description: string
  date: Date
  image: string
  images: string[]
  attributes: object
  url: string
}

export interface IProvider<T extends ISearchKeyword> {

  processSearch(search: T): Promise<IAd[]>
}