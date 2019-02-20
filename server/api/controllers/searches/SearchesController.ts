import {ModelController} from "../common/ModelController"
import {ISearchKeyword, SearchKeyword} from "@business/search/SearchKeyword"
import {Request} from "express"
import {IDBService} from "@services/common/JsonDBService"

export class SearchesController extends ModelController<ISearchKeyword> {


  constructor(service: IDBService<ISearchKeyword>) {
    super(service, 'searches')
  }

  async createObjectFromRequest(req: Request): Promise<ISearchKeyword> {
    const searchKeyword = new SearchKeyword(req.body.key)
    this.updateObjectFromRequest(searchKeyword, req)
    return Promise.resolve(searchKeyword)
  }
}