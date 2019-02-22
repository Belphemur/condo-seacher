import "reflect-metadata"

import './common/env'
import Server from './common/server'
import routes from './routes'
import {CronJobScheduler} from "@business/cronjob/CronJobScheduler"
import {SearchCronMetadata} from "@business/cronjob/job/SearchCronMetadata"
import {Injector, Services} from "@inject"
import {ISearchService} from "@services/searches/SearchService"

const port = parseInt(process.env.PORT, 10)

const service: ISearchService = Injector.service(Services.SearchKijiji)
service.withCron().then((searches) => {
  searches.forEach((search) => {
    CronJobScheduler.scheduler.addCronJob(new SearchCronMetadata(search))
  })
})

export default new Server()
  .router(routes)
  .listen(port)