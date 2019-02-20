import {IDBService} from "../../services/common/JsonDBService"
import {IModel} from "../../../business/model/IModel"
import {Request, Response} from "express"
import {classToPlain, ClassTransformOptions} from "class-transformer"

export abstract class ModelController<T extends IModel> {
  protected readonly service: IDBService<T>
  protected readonly apiPath: string


  protected constructor(service: IDBService<T>, apiPath: string) {
    this.service = service
    this.apiPath = apiPath
  }

  protected classToPlainOptions() : ClassTransformOptions {
    return {excludePrefixes: ['_']}
  }

  protected transformModelToPlain(object: T | T[]): Object {
    return classToPlain(object, this.classToPlainOptions())
  }

  /**
   * Create an object from a request
   * @param req
   */
  abstract async createObjectFromRequest(req: Request): Promise<T>

  async all(req: Request, res: Response): Promise<Response> {
    const result = await this.service.all()
    return Promise.resolve(res.json(this.transformModelToPlain(result)))
  }

  async byKey(req: Request, res: Response): Promise<Response> {
    const results = await this.service.byKey(req.params.key)
    if (results) {
      return Promise.resolve(res.json(this.transformModelToPlain(results)))
    }

    res.status(404).end()
    return Promise.resolve(res)

  }

  async create(req: Request, res: Response): Promise<Response> {
    const object = await this.createObjectFromRequest(req)
    await this.service.save(object)
    res.status(201)
      .location(`<%= apiRoot %>/${this.apiPath}/${object.key}`)
      .json(this.transformModelToPlain(object))
    return Promise.resolve(res)
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const result = await this.service.byKey(req.params.key)
    if (result) {
      this.service.deleteModel(result)
      res.status(202).end()
      return Promise.resolve(res)
    }

    res.status(404).end()
    return Promise.resolve(res)

  }
}