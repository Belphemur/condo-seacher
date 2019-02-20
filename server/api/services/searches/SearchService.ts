import {JsonDBService} from "../common/JsonDBService"
import {ISearchKeyword, SearchKeyword} from "@business/search/SearchKeyword"

export interface ISearchService {
  /**
   * Search with cron setup
   */
  withCron(): Promise<ISearchKeyword[] | null>
}

export class SearchService extends JsonDBService<ISearchKeyword> implements ISearchService {

  constructor() {
    super('searches', SearchKeyword)
  }

  /**
   * Search with cron setup
   */
  async withCron(): Promise<ISearchKeyword[] | null> {
    try {
      return Promise.resolve(this.db.filter(this.pathGenerator(), (value: ISearchKeyword) => {
        return value.cronRule != null
      }))
    } catch (e) {
      return Promise.resolve(null)
    }
  }
}