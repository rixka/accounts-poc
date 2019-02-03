import { Request, Response } from 'express'
import { isEmail } from 'validator'

import Account from './../models/accountModel'

export let allAccounts = (req: Request, res: Response) => {
  let accounts = Account.find((err: any, accounts: any) => {
    res.json(accounts)
  })
}

export let getAccount = (req: Request, res: Response) => {
  Account.findById(req.params.id, (err: any, account: any) => {
    if (err || account == null) {
      res.status(404).json({ error: 'Not Found' })
    } else {
      res.json(account)
    }
  })
}

export let addAccount = (req: Request, res: Response) => {
  let account = new Account(req.body)
  account.save((err: any) => {
    if (err) {
      res.status(400).json({ error: 'Bad Request' })
    } else {
      res.status(201).json(account)
    }
  })
}

export let updateAccount = (req: Request, res: Response) => {
  if (!isEmail(req.body.email)) {
    return res.status(400).json({ error: 'Bad Request' })
  }

  Account.findByIdAndUpdate(req.params.id, req.body, err => {
    if (err) {
      res.status(404).json({ error: 'Not Found' })
    } else {
      res.status(204).json()
    }
  })
}

export let deleteAccount = (req: Request, res: Response) => {
  Account.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      res.status(404).json({ error: 'Not Found' })
    } else {
      res.status(204).json()
    }
  })
}
