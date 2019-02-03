import { Request, Response } from 'express'
import Account from './../models/accountModel'

export let allAccounts = (req: Request, res: Response) => {
  let accounts = Account.find((err: any, accounts: any) => {
    res.json(accounts)
  })
}

export let getAccount = (req: Request, res: Response) => {
  Account.findById(req.params.id, (err: any, account: any) => {
    if (err) {
      res.status(404).json({ error: 'Not Found' })
    } else {
      res.json(account)
    }
  })
}

export let updateAccount = (req: Request, res: Response) => {
  Account.findByIdAndUpdate({ _id: req.params.id }, req.body, err => {
    if (err) {
      res.status(404).json({ error: 'Not Found' })
    } else {
      res.status(204).json()
    }
  })
}

export let deleteAccount = (req: Request, res: Response) => {
  Account.deleteOne({ _id: req.params.id }, err => {
    res.status(204).json()
  })
}
