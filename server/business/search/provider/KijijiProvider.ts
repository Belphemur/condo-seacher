import { ProviderType } from '@business/injection/Injector'
import { IAd, IProvider } from '@business/search/provider/IProvider'
import { IKijijiSearch } from '@business/search/kijiji/KijijiSearch'
import { search as kSearch } from 'kijiji-scraper'

export class KijijiProvider implements IProvider<IKijijiSearch> {

  public readonly type: ProviderType = ProviderType.KIJIJI

  async processSearch(search: IKijijiSearch): Promise<IAd[]> {
    const searchParams = {
      locationId: search.locationId,
      categoryId: search.categoryId,
      keywords: search.key.split(' ').join('+'),
    }

    if (search.maxPrice) {
      searchParams['maxPrice'] = search.maxPrice
    }
    if (search.minPrice) {
      searchParams['minPrice'] = search.maxPrice
    }

    let ads: IAd[] = await kSearch(searchParams)
    if (search.bodyRegex) {
      const bodyRegex = new RegExp(search.bodyRegex).compile()
      ads = ads.filter((ad: IAd) => {
        return bodyRegex.test(ad.description)
      })
    }
    return Promise.resolve(ads)
  }

}
