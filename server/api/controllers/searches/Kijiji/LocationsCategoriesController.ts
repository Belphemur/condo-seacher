import {Request, Response} from "express"
import locations from 'kijiji-scraper'
import categories from 'kijiji-scraper'

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