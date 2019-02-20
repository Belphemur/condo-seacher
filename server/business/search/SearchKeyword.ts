import {IModel} from "../model/IModel"
import {Expose, Type} from "class-transformer"
import {ProviderType} from "@business/search/provider/ProviderTypes"
import {Editable} from "@business/model/decorator/Editable"

export interface ISearchKeyword extends IModel {
  readonly createdAt: Date
  readonly lastMatch: Date | null
  readonly isMatched: boolean

  cronRule: string | null

  bodyRegex: RegExp | null

  provider: ProviderType

  /**
   * Set the fact the search returned result
   */
  setMatched(): void
}

export class SearchKeyword implements ISearchKeyword {
  readonly key: string
  readonly createdAt: Date = new Date()
  private _lastMatch: Date | null = null
  @Editable()
  bodyRegex: RegExp | null = null
  @Editable()
  cronRule: string | null = null
  @Editable()
  provider: ProviderType


  constructor(key: string) {
    this.key = key
  }

  /**
   * When was the last result successful
   */
  @Expose()
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
  @Expose()
  get isMatched(): boolean {
    return this._lastMatch !== null
  }
}