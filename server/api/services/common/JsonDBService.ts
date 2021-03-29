import nodeJsonDb from 'node-json-db'

import { JsonDatabase } from '@business/database/JsonDatabase'
import { plainToClass } from 'class-transformer'
import lodash from 'lodash'
import { IModel } from '@business/model/IModel'
import { ClassType } from 'class-transformer/esm2015/ClassTransformer'
import { L } from '@/common/logger'

export interface IDBService<T extends IModel> {

  all(): Promise<T[]>

  byKey(key: string): Promise<T | null>

  save(model: T): void

  delete(key: string): void

  deleteModel(model: T): void

  createDefault(...args: any): T
}

export abstract class JsonDBService<T extends IModel> implements IDBService<T> {

  protected readonly db: nodeJsonDb
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
    return `/${this.path}/${parts.join('/')}`
  }

  createDefault(...args: any): T {
    return new this.classType(...args)
  }

  all(): Promise<T[]> {
    try {
      const result = lodash.values(this.db.getData(this.pathGenerator())) as object[]
      return Promise.resolve(this.plainToClass(result) as T[])
    } catch (error) {
      console.log(error)
      L.error('No values', error)
      return Promise.resolve([])
    }

  }

  protected plainToClass(result) {
    return plainToClass<T | T[], object>(this.classType, result)
  }

  byKey(key: string): Promise<T | null> {

    let search = null
    try {
      search = this.db.getData(this.pathGenerator(key))
    } catch (error) {
      L.error("Can't find the key", key, error.message)
      return Promise.resolve(search)
    }

    return Promise.resolve(this.plainToClass(search) as T)
  }

  save(model: T): void {
    const key = model.key

    this.db.push(this.pathGenerator(key), model, true)
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
