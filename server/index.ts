import "reflect-metadata"

import './common/env'
import Server from './common/server'
import routes from './routes'
import {SearchService} from "@services/searches/SearchService"
import {CronJobScheduler} from "@business/cronjob/CronJobScheduler"
import {SearchCronMetadata} from "@business/cronjob/job/ICronMetadata"
import {ProviderType} from "@business/search/provider/ProviderTypes"
import {KijijiSearch} from "@business/search/kijiji/KijijiSearch"

const port = parseInt(process.env.PORT, 10)

const service = new SearchService(ProviderType.KIJIJI, KijijiSearch)
service.withCron().then((searches) => {
  searches.forEach((search) => {
    CronJobScheduler.scheduler.addCronJob(new SearchCronMetadata(search))
  })
})

export default new Server()
  .router(routes)
  .listen(port)
