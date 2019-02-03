import * as logger from 'morgan'
import * as express from 'express'
import * as bodyParser from 'body-parser'

import * as apiController from './controllers/apiController'

class App {
  public express: express.Application

  constructor() {
    this.express = express()
    this.middleware()
    this.routes()
  }

  private middleware(): void {
    this.express.use(logger('dev'))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
  }

  // configure api endpoints
  private routes(): void {
    this.express.get('/', apiController.index)
    this.express.get('/health', apiController.health)
  }
}

export default new App().express
