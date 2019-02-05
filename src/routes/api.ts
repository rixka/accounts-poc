import { Request, Response } from 'express'
let pkg = require(__dirname + '/../../package.json')

export let index = (req: Request, res: Response) => {
  res.json({
    message: 'hello world',
  })
}

export let health = (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    version: pkg.version,
  })
}
