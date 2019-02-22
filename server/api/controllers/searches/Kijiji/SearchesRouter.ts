import express from "express"
import {SearchesController} from "../SearchesController"
import {LocationsCategoriesController} from "@controllers/searches/Kijiji/LocationsCategoriesController"
import {Injection, Services} from "@inject"


const controller = new SearchesController(Injection.service(Services.SearchKijiji))

const categorieLocationsController = new LocationsCategoriesController()

export default express.Router()
  .post('/', (req, res) => controller.create(req, res))
  .get('/', (req, res) => controller.all(req, res))
  .get('/categories', (req, res) => categorieLocationsController.categories(req, res))
  .get('/locations', (req, res) => categorieLocationsController.locations(req, res))
  .get('/:key', (req, res) => controller.byKey(req, res))
  .put('/:key', (req, res) => controller.update(req, res))
  .delete('/:key', (req, res) => controller.delete(req, res))