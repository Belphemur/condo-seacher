import { ProviderType } from '@business/injection/Injector'
import { IAd, IProvider } from '@business/search/provider/IProvider'
import { ExtraKijijiSearchAttribute, IKijijiSearch } from '@business/search/kijiji/KijijiSearch'
import { search as kSearch } from 'kijiji-scraper'
import { L } from '@/common/logger'
import { Str } from '@/utils/Str'
import lodash from 'lodash'

export class KijijiProvider implements IProvider<IKijijiSearch> {

  public readonly type: ProviderType = ProviderType.KIJIJI

  async processSearch(search: IKijijiSearch): Promise<IAd[]> {
    let searchParams = {
      locationId: search.locationId,
      categoryId: search.categoryId,
      keywords: search.key.split(' ').join('+'),
      sortByName: 'dateDesc',
    }

    if (search.maxPrice) {
      searchParams['maxPrice'] = search.maxPrice
    }
    if (search.minPrice) {
      searchParams['minPrice'] = search.minPrice
    }
    if (search.key) {
      searchParams['q'] = search.key
    }
    if (search.extraAttributes.length > 0) {
      search.extraAttributes.forEach((extraArg: ExtraKijijiSearchAttribute) => {
        const stringified = lodash.mapValues(extraArg, (value: any) => JSON.stringify(value))
        searchParams = lodash.merge(searchParams, stringified)
        L.info(stringified)
      })
    }
    L.info(searchParams)
    let ads: IAd[] = []
    try {
      ads = await kSearch(searchParams)
      if (search.bodyMatch.length > 0) {
        ads = ads.filter((ad: IAd) => {
          return Str.contains(ad.description, search.bodyMatch)
        })
      }
    } catch (error) {
      L.error(error, 'Problem with Kijiji')
    }
    L.info(ads)
    return Promise.resolve(ads)
  }

}
