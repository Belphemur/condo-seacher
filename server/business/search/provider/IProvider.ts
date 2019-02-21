import {ISearchKeyword} from "@business/search/SearchKeyword"

export interface IProvider<T extends ISearchKeyword> {

  processSearch(search:T) : Promise<any>
}