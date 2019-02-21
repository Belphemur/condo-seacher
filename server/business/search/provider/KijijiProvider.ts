import {ProviderType} from "@business/search/provider/ProviderTypes"
import {IProvider} from "@business/search/provider/IProvider"
import {ISearchKeyword} from "@business/search/SearchKeyword"

export class KijijiProvider implements IProvider<ISearchKeyword>{

  public readonly type: ProviderType = ProviderType.KIJIJI

  async processSearch(search: ISearchKeyword): Promise<any> {
    console.log('OK')
    return Promise.resolve()
  }


}