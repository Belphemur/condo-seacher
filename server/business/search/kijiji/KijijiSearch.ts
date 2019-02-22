import {ISearchKeyword, SearchKeyword} from "@business/search/SearchKeyword"
import {IProvider} from "@business/search/provider/IProvider"
import {getProvider, ProviderType} from "@business/search/provider/ProviderTypes"
import {Editable} from "@business/model/decorator/Editable"

export class KijijiSearch extends SearchKeyword {
  @Editable()
  public locationId: number
  @Editable()
  public categoryId : number


  get provider(): IProvider<ISearchKeyword> {
    return getProvider(ProviderType.KIJIJI)
  }
}