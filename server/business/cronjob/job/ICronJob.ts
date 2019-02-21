import {ISearchKeyword} from "@business/search/SearchKeyword"
import {getProvider} from "@business/search/provider/ProviderTypes"
import {CronJob} from "cron"

export interface ICronJob {
  readonly cronRule: string
  readonly key: string
  readonly action: () => Promise<any>

  toCronJob(): CronJob
}

export class SearchCronJob implements ICronJob {
  readonly action: () => Promise<any>
  readonly cronRule: string
  readonly key: string


  constructor(search: ISearchKeyword) {
    this.action = () => getProvider(search.provider).processSearch(search)
    this.cronRule = search.cronRule
    this.key = search.key
  }

  toCronJob(): CronJob {
    return new CronJob(this.cronRule, this.action)
  }
}