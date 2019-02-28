import { ISearchKeyword, SearchKeyword } from '@business/search/SearchKeyword'
import { IProvider } from '@business/search/provider/IProvider'
import { Editable } from '@business/model/decorator/Editable'
import { ISearchService } from '@services/searches/SearchService'
import { ActionType, Injector, ProviderType, Services } from '@inject'
import { IActionExecutor } from '@business/action/IActionExecutor'

export interface IKijijiSearch extends ISearchKeyword {
  locationId: number
  categoryId: number
}

export class KijijiSearch extends SearchKeyword implements IKijijiSearch {
  @Editable()
  locationId: number
  @Editable()
  categoryId: number

  get provider(): IProvider<ISearchKeyword> {
    return Injector.searchProvider(ProviderType.KIJIJI)
  }

  get service(): ISearchService {
    return Injector.service(Services.SearchKijiji)
  }

  get action(): IActionExecutor<ISearchKeyword> {
    return Injector.action(ActionType.PUSHBULLET)
  }
}
