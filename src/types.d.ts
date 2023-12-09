import type { Request } from 'express'

export interface RequestWithToken extends Request {
  token: string
}

export interface AuthenticatedRequest extends RequestWithToken {
  uid: string
  phone: string
}
