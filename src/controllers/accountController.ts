import { Request, Response } from 'express'
let pkg = require(__dirname + '/../../package.json')

export let allAccounts = (req: Request, res: Response) => {
  res.json([{
    email: 'hello@world.com'
  }])
}

