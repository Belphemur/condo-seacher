import {Request, Response} from "express"
import locations from 'kijiji-scraper/lib/locations.js'
import categories from 'kijiji-scraper/lib/categories.js'

export class LocationsCategoriesController {

  locations(req: Request, res: Response) : Promise<Response> {
    res.json(locations)
    return Promise.resolve(res)
  }

  categories(req: Request, res: Response) : Promise<Response> {
    res.json(categories)
    return Promise.resolve(res)
  }
}