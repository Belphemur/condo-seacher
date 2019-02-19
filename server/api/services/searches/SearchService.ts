import {JsonDBService} from "../common/JsonDBService"
import {ISearchKeyword, SearchKeyword} from "../../../business/search/SearchKeyword"

export class SearchService extends JsonDBService<ISearchKeyword> {

  constructor() {
    super('searches', SearchKeyword)
  }
}