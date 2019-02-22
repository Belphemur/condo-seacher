import {ProviderType} from "@business/injection/Injector"
import {IProvider} from "@business/search/provider/IProvider"
import {IKijijiSearch} from "@business/search/kijiji/KijijiSearch"

export class KijijiProvider implements IProvider<IKijijiSearch> {

  public readonly type: ProviderType = ProviderType.KIJIJI

  async processSearch(search: IKijijiSearch): Promise<any> {
    console.log(search)
    console.log('OK')
    return Promise.resolve()
  }


}