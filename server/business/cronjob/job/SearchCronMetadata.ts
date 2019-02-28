import { ISearchKeyword } from '@business/search/SearchKeyword'
import { ICronMetadata } from '@business/cronjob/job/ICronMetadata'

export class SearchCronMetadata implements ICronMetadata {
  readonly action: () => Promise<any>
  readonly cronRule: string
  readonly key: string

  constructor(search: ISearchKeyword) {
    this.action = async () => {
      const result = await search.provider.processSearch(await search.service.byKey(search.key))
      search.action.execute(search, result)
      return Promise.resolve(result)
    }
    this.cronRule = search.cronRule
    this.key = search.key
  }
}
