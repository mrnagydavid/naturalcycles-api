import { Request, Response } from 'express'
import { db } from '../gateways/firebase-gateway'

export function putUser(req: Request, res: Response) {
  const id = req.params.id
  const { name } = req.body
  db.collection('test').add({ id, name })
  res.send({ success: true })
}
