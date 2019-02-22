import {ISearchKeyword} from "@business/search/SearchKeyword"
import {ICronMetadata} from "@business/cronjob/job/ICronMetadata"

export class SearchCronMetadata implements ICronMetadata {
  readonly action: () => Promise<any>
  readonly cronRule: string
  readonly key: string


  constructor(search: ISearchKeyword) {
    this.action = async () => search.provider.processSearch(await search.service.byKey(search.key))
    this.cronRule = search.cronRule
    this.key = search.key
  }
}