import {IDBService} from "../../services/common/JsonDBService"
import {IModel} from "../../../business/model/IModel"
import {Request, Response} from "express"

export abstract class ModelController<T extends IModel> {
  protected readonly service: IDBService<T>

  constructor(service: IDBService<T>) {
    this.service = service
  }

  /**
   * Create an object from a request
   * @param req
   */
  abstract async createObjectFromRequest(req: Request): Promise<T>

  async all(req: Request, res: Response): Promise<Response> {
    const result = await this.service.all()
    return Promise.resolve(res.json(result))
  }

  async byKey(req: Request, res: Response): Promise<Response> {
    const results = await this.service.byKey(req.params.key)
    if (results) {
      return Promise.resolve(res.json(results))
    }

    res.status(404).end()
    return Promise.resolve(res)

  }

  async create(req: Request, res: Response): Promise<Response> {
    const object = await this.createObjectFromRequest(req)
    await this.service.save(object)
    res.status(201)
      .location(`<%= apiRoot %>/examples/${object.key}`)
      .json(object)
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