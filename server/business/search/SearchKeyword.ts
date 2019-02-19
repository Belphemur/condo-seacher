import {IModel} from "../model/IModel"

export interface ISearchKeyword extends IModel {
  readonly createdAt: Date
  readonly lastMatch: Date | null
  readonly isMatched: boolean

  /**
   * Set the fact the search returned result
   */
  setMatched(): void
}

export class SearchKeyword implements ISearchKeyword {
  readonly key: string
  readonly createdAt: Date = new Date()
  private _lastMatch: Date | null


  constructor(key: string) {
    this.key = key
  }

  /**
   * When was the last result successful
   */
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
  get isMatched(): boolean {
    return this._lastMatch !== null
  }
}