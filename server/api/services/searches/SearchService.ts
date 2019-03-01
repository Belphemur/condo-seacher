import { IDBService, JsonDBService } from '../common/JsonDBService'
import { ISearchKeyword } from '@business/search/SearchKeyword'
import { ClassType } from 'class-transformer/ClassTransformer'

export interface ISearchService extends IDBService<ISearchKeyword> {
  /**
   * Search with job setup
   */
  withCron(): Promise<ISearchKeyword[] | null>
}

export class SearchService extends JsonDBService<ISearchKeyword> implements ISearchService {

  constructor(path: string, classType: ClassType<ISearchKeyword>) {
    super(`searches/${path}`, classType)
  }

  /**
   * Search with job setup
   */
  async withCron(): Promise<ISearchKeyword[] | null> {
    try {

      let results = this.db.filter<ISearchKeyword>(this.pathGenerator(), (value: ISearchKeyword) => {
        return value.cronRule !== null
      })

      if (!results) {
        results = []
      }

      return Promise.resolve(this.plainToClass(results) as ISearchKeyword[])
    } catch (e) {
      return Promise.resolve([])
    }
  }
}
