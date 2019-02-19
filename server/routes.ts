import {Application} from 'express'
import SearchesRouter from "./api/controllers/searches/SearchesRouter"

export default function routes(app: Application): void {
  app.use('/api/v1/searches', SearchesRouter)
};