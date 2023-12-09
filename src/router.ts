import express, { Router } from 'express'
import { handleErrors } from './error-handler'
import { getHelloWorld } from './controllers/hello-world-controller'
import { putUser } from './controllers/users-controller'

export function createRouter(): Router {
  const router = express.Router()

  router.get('/', handleErrors(getHelloWorld))
  router.put('/users/:id', handleErrors(putUser))

  return router
}
