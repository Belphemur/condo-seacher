import { JsonDB } from 'node-json-db'
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

export class JsonDatabase {
  private static instance: JsonDB

  private constructor() {
  }

  static get db() {
    if (!JsonDatabase.instance) {
      JsonDatabase.instance = new JsonDB(process.env.DB_FILE, true, false)
    }
    return JsonDatabase.instance
  }
}
