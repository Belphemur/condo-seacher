import {IDBService} from "@services/common/JsonDBService"

export interface IModel {
  readonly key: string

  readonly service: IDBService<IModel>
}