import {IModel} from "../model/IModel"
import {Expose, Type} from "class-transformer"
import {ProviderType} from "@business/search/provider/ProviderTypes"
import {Editable} from "@business/model/decorator/Editable"
import {IProvider} from "@business/search/provider/IProvider"

export enum SearchType {
  RENT = 'rent',
  BUY = 'buy'
}

export interface ISearchKeyword extends IModel {
  readonly createdAt: Date
  readonly lastMatch: Date | null
  readonly isMatched: boolean

  cronRule?: string

  bodyRegex?: RegExp

  provider: IProvider<ISearchKeyword>

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
  private _lastMatch?: Date = null
  @Editable()
  bodyRegex = null
  @Editable()
  cronRule = null


  constructor(key: string) {
    this.key = key
  }

  /**
   * When was the last result successful
   */
  @Expose({ toPlainOnly: true })
  get lastMatch(): Date | null {
    return this._lastMatch
  }

  /**
   * Set the fact the search returned result
   */
  setMatched(): void {
    this._lastMatch = new Date()
  }


  /**
   * The search returned result
   */
  @Expose({ toPlainOnly: true })
  get isMatched(): boolean {
    return this._lastMatch !== null
  }

  abstract get provider() : IProvider<ISearchKeyword>
}