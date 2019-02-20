import {CronJob} from "cron"
import {ISearchService} from "@services/searches/SearchService"

export type CronMap = {
  [key:string]: CronJob
}
export class CronJobPromise {
  private crons: CronMap = {}
  private readonly searchService : ISearchService

  constructor(searchService: ISearchService) {
    this.searchService = searchService
  }

}