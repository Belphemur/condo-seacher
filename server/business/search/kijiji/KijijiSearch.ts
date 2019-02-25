import { ISearchKeyword, SearchKeyword } from '@business/search/SearchKeyword'
import { IProvider } from '@business/search/provider/IProvider'
import { Editable } from '@business/model/decorator/Editable'
import { ISearchService } from '@services/searches/SearchService'
import { Injector, ProviderType, Services } from '@inject'

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
}
