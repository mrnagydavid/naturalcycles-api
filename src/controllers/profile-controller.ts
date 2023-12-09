import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../types'
import getProfileUseCase from '../core/get-profile'
import updateProfileUseCase from '../core/update-profile'

export async function getProfile(req: Request, res: Response) {
  const { phone } = req as AuthenticatedRequest

  const result = await getProfileUseCase.run(phone)

  res.send({ success: true, data: result })
}

export async function putProfile(req: Request, res: Response) {
  const { phone } = req as AuthenticatedRequest
  const { name, email } = req.body

  const result = await updateProfileUseCase.run({ phone, name, email })

  res.send({ success: true, data: result })
}
