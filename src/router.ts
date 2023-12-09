import express, { Router } from 'express'
import { handleErrors } from './error-handler'
import { getHelloWorld } from './controllers/hello-world-controller'
import { getProfile, putProfile } from './controllers/profile-controller'
import verifyToken from './middlewares/verify-token'

export function createRouter(): Router {
  const router = express.Router()

  router.get('/', handleErrors(getHelloWorld))
  router.get('/profile', verifyToken, handleErrors(getProfile))
  router.put('/profile', verifyToken, handleErrors(putProfile))

  return router
}
