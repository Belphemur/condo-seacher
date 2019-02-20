import {IModel} from "@business/model/IModel"

export class EditableMetadata {
  field: string
  transformer: EditableTransformer

  constructor(field: string, transformer: EditableTransformer) {
    this.field = field
    this.transformer = transformer
  }

  public setValue(model: IModel, value:any) : void {
    model[this.field] = this.transformer(value)
  }
}

export type EditableTransformer = (value: any) => any

const editableFields: Map<Function, Map<string, EditableMetadata>> = new Map()

export function Editable(transformer: EditableTransformer = (value) => value) {
  return (target: any, propertyKey: string) => {
    if (!editableFields.has(target.constructor)) {
      editableFields.set(target.constructor, new Map<string, EditableMetadata>())
    }

    editableFields.get(target.constructor).set(propertyKey, new EditableMetadata(propertyKey, transformer))
  }
}

export function getEditableFields(target: IModel): EditableMetadata[] {
  if (!editableFields.has(target.constructor)) {
    return []
  }

  return Array.from(editableFields.get(target.constructor).values())
}