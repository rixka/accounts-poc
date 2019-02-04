import * as logger from 'morgan'
import * as express from 'express'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'

import * as apiController from './controllers/apiController'
import * as accountController from './controllers/accountController'

const uri: string =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/development'

mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
})


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
    this.express.get('/accounts', accountController.allAccounts)
    this.express.get('/accounts/:id', accountController.getAccount)
    this.express.post('/accounts', accountController.addAccount)
    this.express.put('/accounts/:id', accountController.updateAccount)
    this.express.delete('/accounts/:id', accountController.deleteAccount)
  }
}

export default new App().express
