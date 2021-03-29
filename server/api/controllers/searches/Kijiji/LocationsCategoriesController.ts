import {Request, Response} from "express"
const kijijiscr = require('kijiji-scraper')

export class LocationsCategoriesController {

  locations(req: Request, res: Response) : Promise<Response> {
    res.json(kijijiscr.locations)
    return Promise.resolve(res)
  }

  categories(req: Request, res: Response) : Promise<Response> {
    res.json(kijijiscr.categories)
    return Promise.resolve(res)
  }
}