import {ModelController} from "../common/ModelController"
import {ISearchKeyword, SearchKeyword} from "../../../business/search/SearchKeyword"
import {Request} from "express"

export class SearchesController extends ModelController<ISearchKeyword> {


  async createObjectFromRequest(req: Request): Promise<ISearchKeyword> {
    return Promise.resolve(new SearchKeyword(req.body.key))
  }

}