import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import morgan from 'morgan'
import { format } from 'date-fns'

import routes from './routes'
import './database'

class App {
  constructor() {
    this.app = express()

    this.middlewares()
    this.routes()
    // this.logs()
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(cors())
  }

  routes() {
    this.app.use(routes)
  }

  logs() {
    // Create a log archive
    const log = fs.createWriteStream(
      path.join(__dirname, '/logs', `system${format('dd-MM-yyy')}.log`),
      { flags: 'a' }
    )
    // Store the logs in the archive created by previous line
    this.app.use(morgan('dev', { stream: log }))
  }
}

export default new App().app
