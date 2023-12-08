import express, { Router } from 'express'
import { handleErrors } from './error-handler'
import { getHelloWorld } from './controllers/hello-world-controller'

export function createRouter(): Router {
  const router = express.Router()

  router.get('/', handleErrors(getHelloWorld))

  return router
}
