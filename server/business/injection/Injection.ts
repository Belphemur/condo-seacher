import {IDBService} from "@services/common/JsonDBService"
import {IModel} from "../model/IModel"
import {SearchService} from "@services/searches/SearchService"
import {KijijiSearch} from "../search/kijiji/KijijiSearch"
import {IProvider} from "@business/search/provider/IProvider"
import {ISearchKeyword} from "@business/search/SearchKeyword"
import {KijijiProvider} from "@business/search/provider/KijijiProvider"

export enum Services {
  SearchKijiji = 'kijiji'
}

export enum ProviderType {
  KIJIJI = 'kijiji'
}

export class Injection {
  private static readonly serviceMap: Map<Services, IDBService<IModel>> = new Map([
    [Services.SearchKijiji, new SearchService(Services.SearchKijiji, KijijiSearch)]
  ])

  private static readonly providerMap: Map<ProviderType, IProvider<ISearchKeyword>> = new Map([
    [ProviderType.KIJIJI, new KijijiProvider()]
  ])

  static service<T extends IDBService<IModel>>(service: Services): T {
    const result = this.serviceMap.get(service)
    if (!result) {
      throw new Error('Service not bound')
    }
    return result as T
  }

  static searchProvider<T extends IProvider<ISearchKeyword>>(provider: ProviderType): T {
    const result = this.providerMap.get(provider)
    if (!result) {
      throw new Error('searchProvider not bound')
    }
    return result as T
  }
}
