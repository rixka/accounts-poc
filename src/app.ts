import * as logger from 'morgan'
import * as express from 'express'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'

import * as api from './routes/api'
import * as account from './routes/account'

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
    this.express.get('/api/', api.index)
    this.express.get('/api/health', api.health)
    this.express.get('/api/accounts', account.allAccounts)
    this.express.get('/api/accounts/:id', account.getAccount)
    this.express.post('/api/accounts', account.addAccount)
    this.express.put('/api/accounts/:id', account.updateAccount)
    this.express.delete('/api/accounts/:id', account.deleteAccount)
  }
}

export default new App().express
