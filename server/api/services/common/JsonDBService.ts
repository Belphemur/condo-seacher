import JsonDB from "node-json-db"

import L from "../../../common/logger"
import {JsonDatabase} from "@business/database/JsonDatabase"
import {classToPlain, plainToClass} from "class-transformer"
import _ from 'lodash'
import {IModel} from "@business/model/IModel"
import {ClassType} from "class-transformer/ClassTransformer"

export interface IDBService<T extends IModel> {

  all(): Promise<T[]>

  byKey(key: string): Promise<T | null>

  save(model: T): void

  delete(key: string): void

  deleteModel(model: T): void

  createDefault(...args: any): T
}

export abstract class JsonDBService<T extends IModel> implements IDBService<T> {

  protected readonly db: JsonDB
  private readonly path: string
  private readonly classType: ClassType<T>


  protected constructor(path: string, classType: ClassType<T>) {
    this.db = JsonDatabase.db
    this.path = path
    this.classType = classType
  }

  /**
   * Generate path for the given parts using the root path
   * @param parts
   */
  protected pathGenerator(...parts: string[]): string {
    if (parts.length === 0) {
      return `/${this.path}`
    }
    return `/${this.path}/${parts.join("/")}`
  }

  createDefault(...args: any): T {
    return new this.classType(...args)
  }

  all(): Promise<T[]> {
    try {
      const result = _.values(this.db.getData(this.pathGenerator())) as object[]
      return Promise.resolve(plainToClass(this.classType, result))
    } catch (error) {
      console.log(error)
      L.error("No values", error)
      return Promise.resolve([])
    }


  }

  byKey(key: string): Promise<T | null> {

    let search = null
    try {
      search = this.db.getData(this.pathGenerator(key))
    } catch (error) {
      L.error("Can't find the key", key, error.message)
      return Promise.resolve(search)
    }

    return Promise.resolve(plainToClass<T, object>(this.classType, search))
  }

  save(model: T): void {
    const key = model.key

    this.db.push(`/${this.path}/${key}`, model, true)
  }

  delete(key: string): void {
    try {
      this.db.delete(this.pathGenerator(key))
    } catch (e) {
      L.error("Can't find the key", key, e)
    }
  }

  deleteModel(model: T): void {
    this.delete(model.key)
  }
}