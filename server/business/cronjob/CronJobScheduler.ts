import {CronJob} from "cron"
import L from "@/common/logger"
import {ICronMetadata} from "@business/cronjob/job/ICronMetadata"

class CronJobContainer {
  cronJob: CronJob
  metadata: ICronMetadata

  constructor(metadata: ICronMetadata) {
    this.metadata = metadata
    this.cronJob = new CronJob(metadata.cronRule, metadata.action)
  }

  public start() : void {
    this.cronJob.start()
    L.info(`Cronjob ${this.metadata.key}: ${this.metadata.cronRule}: started`)
  }

  public stop() : void {
    this.cronJob.stop()
    L.info(`Cronjob ${this.metadata.key}: ${this.metadata.cronRule}: stopped`)
  }
}

export class CronJobScheduler {
  private crons: Map<string, CronJobContainer> = new Map()


  private static instance: CronJobScheduler

  private constructor() {
  }

  static get scheduler() {
    if (!CronJobScheduler.instance) {
      CronJobScheduler.instance = new CronJobScheduler()
    }
    return CronJobScheduler.instance
  }


  public addCronJob(cron: ICronMetadata): boolean {
    if (this.crons.has(cron.key)) {
      return false
    }
    const container = new CronJobContainer(cron)
    container.start()

    this.crons.set(cron.key, container)

    return true
  }

  public removeCronJob(cron: ICronMetadata): boolean {
    if (!this.crons.has(cron.key)) {
      return false
    }

    this.crons.get(cron.key).stop()
    this.crons.delete(cron.key)
  }
}