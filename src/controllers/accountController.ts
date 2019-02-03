import { Request, Response } from 'express'
import Account from './../models/accountModel'

export let allAccounts = (req: Request, res: Response) => {
  let accounts = Account.find((err: any, accounts: any) => {
    res.json(accounts)
  })
}
