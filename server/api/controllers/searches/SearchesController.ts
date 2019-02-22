import {ModelController} from "../common/ModelController"
import {ISearchKeyword} from "@business/search/SearchKeyword"
import {Request, Response} from "express"
import {IDBService} from "@services/common/JsonDBService"
import {CronJobScheduler} from "@business/cronjob/CronJobScheduler"
import {SearchCronMetadata} from "@business/cronjob/job/ICronMetadata"

export class SearchesController extends ModelController<ISearchKeyword> {


  constructor(service: IDBService<ISearchKeyword>) {
    super(service)
  }

  async createObjectFromRequest(req: Request): Promise<ISearchKeyword> {
    const searchKeyword = this.service.createDefault(req.body.key)
    this.updateObjectFromRequest(searchKeyword, req)
    return Promise.resolve(searchKeyword)
  }


  protected onUpdated(object: ISearchKeyword, req: Request): void {
    if(!req.body.cronRule) {
      return
    }
    CronJobScheduler.scheduler.removeCronJob(new SearchCronMetadata(object))
    CronJobScheduler.scheduler.addCronJob(new SearchCronMetadata(object))
  }

  protected onCreated(object: ISearchKeyword, req: Request): void {
    if(!object.cronRule) {
      return
    }
    CronJobScheduler.scheduler.removeCronJob(new SearchCronMetadata(object))
    CronJobScheduler.scheduler.addCronJob(new SearchCronMetadata(object))
  }

  protected onDeleted(object: ISearchKeyword): void {
    CronJobScheduler.scheduler.removeCronJob(new SearchCronMetadata(object))
  }
}