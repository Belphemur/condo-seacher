import { ISearchKeyword } from '@business/search/SearchKeyword'
import { IAd } from '@business/search/provider/IProvider'

export interface IActionExecutor<T extends ISearchKeyword> {
  /**
   * Execute the action
   * @param search
   * @param result
   */
  execute(search: T, result: IAd[]): void
}
