import { ISearchKeyword } from '@business/search/SearchKeyword'
import { ICronMetadata } from '@business/cronjob/job/ICronMetadata'

export class SearchCronMetadata implements ICronMetadata {
  readonly action: () => Promise<any>
  readonly cronRule: string
  readonly key: string

  constructor(search: ISearchKeyword) {
    this.action = async () => {
      const currentSearch = await search.service.byKey(search.key)
      const result = await currentSearch.provider.processSearch(currentSearch)
      currentSearch.action.execute(currentSearch, result)
      return Promise.resolve(result)
    }
    this.cronRule = search.cronRule
    this.key = search.key
  }
}
