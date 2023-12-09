import { Request, Response, NextFunction } from 'express'
import { RequestWithToken } from '../types'

export default function tokenExtractor(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authorizationHeader = req.headers.authorization

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice('Bearer '.length)
    const reqWithToken = req as RequestWithToken
    reqWithToken.token = token
  }

  next()
}
