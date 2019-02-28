import { ISearchKeyword } from '@business/search/SearchKeyword'
import { IAd } from '@business/search/provider/IProvider'
import { ISearchService } from '@services/searches/SearchService'
import { IActionExecutor } from '@business/action/IActionExecutor'

export class PushbulletAction<T extends ISearchKeyword> implements IActionExecutor<T> {
  private client: any
  private service: ISearchService

  constructor(client: any, service: ISearchService) {
    this.client = client
    this.service = service
  }

  /**
   * Execute the action
   * @param search
   * @param result
   */
  execute(search: T, result: IAd[]): void {
    result.forEach((ad) => {
      const title = `${search.key}: ${ad.title} (${ad.attributes.price})`
      this.client.link({}, title, ad.url, ad.description)
    })
    search.setMatched()
    this.service.save(search)
  }
}
