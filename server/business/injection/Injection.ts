import {IDBService} from "@services/common/JsonDBService"
import {IModel} from "../model/IModel"
import {SearchService} from "@services/searches/SearchService"
import {KijijiSearch} from "../search/kijiji/KijijiSearch"

export enum Services {
  SearchKijiji = 'kijiji'
}

export class Injection {
  private static readonly serviceMap: Map<Services, IDBService<IModel>> = new Map([
    [Services.SearchKijiji, new SearchService(Services.SearchKijiji, KijijiSearch)]
  ])

  static service<T extends IDBService<IModel>>(service: Services): T {
    const result = this.serviceMap.get(service)
    if (!result) {
      throw new Error('Service Not bound')
    }
    return result as T
  }
}
