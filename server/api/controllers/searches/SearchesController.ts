import {ModelController} from "../common/ModelController"
import {ISearchKeyword, SearchKeyword} from "@business/search/SearchKeyword"
import {Request, Response} from "express"
import {IDBService} from "@services/common/JsonDBService"
import {CronJobScheduler} from "@business/cronjob/CronJobScheduler"
import {SearchCronJob} from "@business/cronjob/job/ICronJob"

export class SearchesController extends ModelController<ISearchKeyword> {


  constructor(service: IDBService<ISearchKeyword>) {
    super(service, 'searches')
  }

  async createObjectFromRequest(req: Request): Promise<ISearchKeyword> {
    const searchKeyword = new SearchKeyword(req.body.key)
    this.updateObjectFromRequest(searchKeyword, req)
    return Promise.resolve(searchKeyword)
  }


  protected onUpdated(object: ISearchKeyword, req: Request): void {
    if(!req.body.cronRule) {
      return
    }
    CronJobScheduler.scheduler.removeCronJob(new SearchCronJob(object))
    CronJobScheduler.scheduler.addCronJob(new SearchCronJob(object))
  }

  protected onCreated(object: ISearchKeyword, req: Request): void {
    if(!object.cronRule) {
      return
    }
    CronJobScheduler.scheduler.removeCronJob(new SearchCronJob(object))
    CronJobScheduler.scheduler.addCronJob(new SearchCronJob(object))
  }

  protected onDeleted(object: ISearchKeyword): void {
    CronJobScheduler.scheduler.removeCronJob(new SearchCronJob(object))
  }
}