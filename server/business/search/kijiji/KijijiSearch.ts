import {ISearchKeyword, SearchKeyword} from "@business/search/SearchKeyword"
import {IProvider} from "@business/search/provider/IProvider"
import {getProvider, ProviderType} from "@business/search/provider/ProviderTypes"

export class KijijiSearch extends SearchKeyword {


  get provider(): IProvider<ISearchKeyword> {
    return getProvider(ProviderType.KIJIJI);
  }
}