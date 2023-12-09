import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { createRouter } from './router'
import tokenExtractor from './middlewares/token-extractor'
import { NotFoundError, ValidationError } from './errors'

export function createApp() {
  const app = express()

  app.use(express.json())
  app.use(cors())
  app.use(tokenExtractor)

  app.use('/', createRouter())

  app.use((_req, res, _next) => {
    res.status(404).json({ success: false, errors: "Sorry can't find that!" })
  })

  app.use(errorHandler)

  return app
}

function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    return next(error)
  }

  if (error instanceof ValidationError) {
    res.status(400).json({ success: false, errors: error.errors })
  } else if (error instanceof NotFoundError) {
    res.status(404).json({ success: false, errors: "Sorry can't find that!" })
  } else {
    res.status(500).json({ success: false, errors: error.message })
  }
}
