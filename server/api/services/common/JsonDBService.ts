import JsonDB from "node-json-db"

import L from "../../../common/logger"
import {JsonDatabase} from "../../../business/database/JsonDatabase"
import {classToPlain, plainToClass} from "class-transformer"
import _ from 'lodash'
import {ISearchKeyword, SearchKeyword} from "../../../business/search/SearchKeyword"
import {DatabaseError, DataError} from "node-json-db/dist/types/lib/Errors"
import {IModel} from "../../../business/model/IModel"
import {ClassType} from "class-transformer/ClassTransformer"

export abstract class JsonDBService<T extends IModel> {

  private readonly db: JsonDB
  private readonly path: string
  private readonly classType: ClassType<T>


  protected constructor(path: string, classType: ClassType<T>) {
    this.db = JsonDatabase.db
    this.path = path
    this.classType = classType
  }

  all(): Promise<T[]> {
    const result = _.values(this.db.getData(`/${this.path}`)) as object[]
    return Promise.resolve(plainToClass(this.classType, result))
  }

  byKey(key: string): Promise<T | null> {

    let search = null
    try {
      search = this.db.getData(`/${this.path}/${key}`)
    } catch (error) {
      L.error("Can't find the key", key, error)
      return Promise.resolve(search)
    }

    return Promise.resolve(plainToClass(this.classType, search)[0])
  }

  save(model: T): void {
    const key = model.key

    this.db.push(`/${this.path}/${key}`, classToPlain(model), true)
  }

  delete(key: string): void {
    try {
      this.db.delete(`/${this.path}/${key}`)
    } catch (e) {
      L.error("Can't find the key", key, e)
    }
  }
}