import { ProviderType } from '@business/injection/Injector'
import { IAd, IProvider } from '@business/search/provider/IProvider'
import { IKijijiSearch } from '@business/search/kijiji/KijijiSearch'
import { search as kSearch } from 'kijiji-scraper'
import { L } from '@/common/logger'
import { Str } from '@/utils/Str'

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
    let ads: IAd[] = []
    try {
      ads = await kSearch(searchParams)
      if (search.bodyMatch.length > 0) {
        ads = ads.filter((ad: IAd) => {
          return Str.contains(ad.description, search.bodyMatch)
        })
      }
    } catch (error) {
      L.error('Problem with Kijiji', error)
    }
    return Promise.resolve(ads)
  }

}
