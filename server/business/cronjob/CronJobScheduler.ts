import {CronJob} from "cron"
import {ICronJob} from "@business/cronjob/job/ICronJob"
import L from "@/common/logger"

export class CronJobScheduler {
  private crons: Map<string, CronJob> = new Map()


  private static instance: CronJobScheduler

  private constructor() {
  }

  static get scheduler() {
    if (!CronJobScheduler.instance) {
      CronJobScheduler.instance = new CronJobScheduler()
    }
    return CronJobScheduler.instance
  }


  public addCronJob(cron: ICronJob): boolean {
    if (this.crons.has(cron.key)) {
      return false
    }
    const cronJob = cron.toCronJob()
    cronJob.start()
    L.info(`Cronjob ${cron.key}: ${cron.cronRule}: started`)
    this.crons.set(cron.key, cronJob)

    return true
  }

  public removeCronJob(cron: ICronJob): boolean {
    if (!this.crons.has(cron.key)) {
      return false
    }

    this.crons.get(cron.key).stop()
    L.info(`Cronjob ${cron.key}: ${cron.cronRule}: stopped`)
    this.crons.delete(cron.key)
  }
}