import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { createRouter } from './router'

export function createApp() {
  const app = express()

  app.use(express.json())
  app.use(cors())

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

  res.status(500).json({ success: false, errors: error.message })
}
