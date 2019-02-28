import { IDBService } from '@services/common/JsonDBService'
import { IModel } from '../model/IModel'
import { SearchService } from '@services/searches/SearchService'
import { KijijiSearch } from '../search/kijiji/KijijiSearch'
import { IProvider } from '@business/search/provider/IProvider'
import { ISearchKeyword } from '@business/search/SearchKeyword'
import { KijijiProvider } from '@business/search/provider/KijijiProvider'
import { CacheProvider } from '@business/search/provider/CacheProvider'
import { JsonDatabase } from '@business/database/JsonDatabase'
import { IActionExecutor } from '@business/action/IActionExecutor'
import { PushbulletAction } from '@business/action/pushbullet/PushbulletAction'

import pushbullet from 'pushbullet'

export enum Services {
  SearchKijiji = 'kijiji',
}

export enum ProviderType {
  KIJIJI = 'kijiji',
}

export enum ActionType {
  PUSHBULLET = 'pushbullet',
}

export class Injector {
  private static readonly serviceMap: Map<Services, IDBService<IModel>> = new Map([
    [Services.SearchKijiji, new SearchService(Services.SearchKijiji, KijijiSearch)],
  ])

  private static readonly providerMap: Map<ProviderType, IProvider<ISearchKeyword>> = new Map([
    [ProviderType.KIJIJI, new CacheProvider(JsonDatabase.db, new KijijiProvider())],
  ])

  /* tslint:disable */
  private static readonly actionMap: Map<ActionType, IActionExecutor<ISearchKeyword>> = new Map([
    [ActionType.PUSHBULLET, new PushbulletAction(new pushbullet(process.env.PUSHBULLET_KEY), Injector.service(Services.SearchKijiji))],
  ])

  /* tslint:enable */

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
      throw new Error('SearchProvider not bound')
    }
    return result as T
  }

  static action<T extends IActionExecutor<ISearchKeyword>>(action: ActionType): T {
    const result = this.actionMap.get(action)
    if (!result) {
      throw new Error('Action not bound')
    }
    return result as T
  }
}
