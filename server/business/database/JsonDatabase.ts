import nodeJsonDb from 'node-json-db'

export class JsonDatabase {
  private static instance: nodeJsonDb

  private constructor() {
  }

  static get db() {
    if (!JsonDatabase.instance) {
      JsonDatabase.instance = new nodeJsonDb(process.env.DB_FILE, true, false)
    }
    return JsonDatabase.instance
  }
}
