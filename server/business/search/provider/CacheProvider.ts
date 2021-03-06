import { JsonDB } from 'node-json-db'
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { IAd, IProvider } from '@business/search/provider/IProvider'
import { ISearchKeyword } from '@business/search/SearchKeyword'
import crypto from 'crypto'

export class CacheProvider<T extends ISearchKeyword> implements IProvider<T> {

  private db: JsonDB
  private provider: IProvider<T>

  constructor(db: JsonDB, provider: IProvider<T>) {
    this.db = db
    this.provider = provider
  }

  private getKey(ad: IAd): string {
    const hasher = crypto.createHash('sha256')
    hasher.update(ad.url)
    const key = hasher.digest('hex')
    return `/results/${this.provider.constructor.name}/${key}`
  }

  async processSearch(search: T): Promise<IAd[]> {
    let result = await this.provider.processSearch(search)
    result = result
      .filter((ad: IAd) => !this.db.exists(this.getKey(ad)))

    const today = new Date()
    result.forEach((ad: IAd) => {
      this.db.push(this.getKey(ad), today.toISOString(), true)
    })

    return Promise.resolve(result)
  }
}
