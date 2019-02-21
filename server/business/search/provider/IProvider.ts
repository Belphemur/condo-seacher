import {ISearchKeyword} from "@business/search/SearchKeyword"

export interface IProvider {

  processSearch(search:ISearchKeyword) : Promise<any>
}