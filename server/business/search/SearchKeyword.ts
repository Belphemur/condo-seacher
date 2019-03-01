import { IModel } from '../model/IModel'
import { Exclude, Expose, Type } from 'class-transformer'
import { Editable } from '@business/model/decorator/Editable'
import { IProvider } from '@business/search/provider/IProvider'
import { ISearchService } from '@services/searches/SearchService'
import { IActionExecutor } from '@business/action/IActionExecutor'

export interface ISearchKeyword extends IModel {
  readonly createdAt: Date
  readonly lastMatch: Date | null
  readonly isMatched: boolean

  minPrice: number | null
  maxPrice: number | null

  cronRule?: string

  bodyMatch: string[]

  readonly provider: IProvider<ISearchKeyword>

  readonly service: ISearchService

  readonly action: IActionExecutor<ISearchKeyword>

  /**
   * Set the fact the search returned result
   */
  setMatched(): void
}

export abstract class SearchKeyword implements ISearchKeyword {
  readonly key: string
  @Type(() => Date)
  readonly createdAt: Date = new Date()
  @Type(() => Date)
  @Exclude()
  private LAST_MATCH?: Date = null
  @Editable()
  bodyMatch = []
  @Editable()
  cronRule = null

  @Editable((value: number) => value > 0 ? value : null)
  maxPrice: number | null
  @Editable((value: number) => value > 0 ? value : null)
  minPrice: number | null

  abstract get service(): ISearchService

  abstract get provider(): IProvider<ISearchKeyword>

  abstract get action(): IActionExecutor<ISearchKeyword>

  constructor(key: string) {
    this.key = key
  }

  /**
   * When was the last result successful
   */
  @Expose({ toPlainOnly: true })
  get lastMatch(): Date | null {
    return this.LAST_MATCH
  }

  /**
   * Set the fact the search returned result
   */
  setMatched(): void {
    this.LAST_MATCH = new Date()
  }

  /**
   * The search returned result
   */
  @Expose({ toPlainOnly: true })
  get isMatched(): boolean {
    return this.LAST_MATCH !== null
  }

}
