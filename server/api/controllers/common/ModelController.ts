import {IDBService} from "@services/common/JsonDBService"
import {IModel} from "@business/model/IModel"
import {Request, Response} from "express"
import {classToPlain, ClassTransformOptions} from "class-transformer"
import {EditableMetadata, getEditableFields} from "@business/model/decorator/Editable"

export type RequestTranformer = ((value: any) => any) | null

export abstract class ModelController<T extends IModel> {
  protected readonly service: IDBService<T>
  protected readonly apiPath: string


  protected constructor(service: IDBService<T>, apiPath: string) {
    this.service = service
    this.apiPath = apiPath
  }

  protected classToPlainOptions(): ClassTransformOptions {
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

  /**
   * Update the object from the request
   * @param object
   * @param req
   */
  protected updateObjectFromRequest(object: T, req: Request): void {
    getEditableFields(object).forEach((metadata: EditableMetadata) => {
      if (!req.body[metadata.field]) {
        return
      }
      metadata.setValue(object, req.body[metadata.field])
    })
  }

  /**
   * When the object has been updated
   * @param object
   * @param req
   */
  protected onUpdated(object: T, req: Request) : void {

  }

  /**
   * When the object has been created
   * @param object
   * @param req
   */
  protected onCreated(object: T, req: Request) : void {

  }

  /**
   * When the object has been deleted
   * @param object
   */
  protected onDeleted(object: T) : void {

  }

  async all(req: Request, res: Response): Promise<Response> {
    const result = await this.service.all()
    return Promise.resolve(res.json(this.transformModelToPlain(result)))
  }

  async byKey(req: Request, res: Response): Promise<Response> {
    const result = await this.service.byKey(req.params.key)

    if (!result) {
      res.status(404).end()
      return Promise.resolve(res)
    }

    return Promise.resolve(res.json(this.transformModelToPlain(result)))
  }

  async create(req: Request, res: Response): Promise<Response> {
    const object = await this.createObjectFromRequest(req)
    await this.service.save(object)
    res.status(201)
      .location(`<%= apiRoot %>/${this.apiPath}/${object.key}`)
      .json(this.transformModelToPlain(object))

    this.onCreated(object, req)

    return Promise.resolve(res)
  }

  async update(req: Request, res: Response): Promise<Response> {
    const object = await this.service.byKey(req.params.key)
    if (!object) {
      res.status(404).end()
      return Promise.resolve(res)
    }

    this.updateObjectFromRequest(object, req)

    this.service.save(object)

    res.status(200)
      .location(`<%= apiRoot %>/${this.apiPath}/${object.key}`)
      .json(this.transformModelToPlain(object))

    this.onUpdated(object, req)

    return Promise.resolve(res)
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const object = await this.service.byKey(req.params.key)
    if (!object) {
      res.status(404).end()
      return Promise.resolve(res)
    }

    this.service.deleteModel(object)
    res.status(204).end()

    this.onDeleted(object)
    return Promise.resolve(res)


  }
}