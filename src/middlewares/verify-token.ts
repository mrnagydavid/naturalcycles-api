import { Request, Response, NextFunction } from 'express'
import { validateToken } from '../gateways/firebase-gateway'
import { RequestWithToken, AuthenticatedRequest } from '../types'

export default async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const reqWithToken = req as RequestWithToken
  const token = reqWithToken.token

  if (!token) {
    res.status(401).json({ success: false, error: 'Unauthorized' })
    return
  }

  const result = await validateToken(token)

  if (!result) {
    res.status(401).json({ success: false, error: 'Unauthorized' })
    return
  }

  const { uid, phone } = result
  const authenticatedReq = req as AuthenticatedRequest
  authenticatedReq.uid = uid
  authenticatedReq.phone = phone

  next()
}
