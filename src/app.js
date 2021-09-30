import express from 'express'
import cors from 'cors'
import routes from './routes'
// import { resolve } from 'path'

import './database'

class App {
  constructor() {
    this.app = express()

    this.middlewares()
    this.routes()
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
    // const log = fs.createWriteStream(path.join(__dirname, '/server/logs', `system${moment().format('DD-MM-YYYY')}.log`), {flags: 'a'})
    // Store the logs in the archive created by previous line
    // app.use(morgan('dev', {stream: log}))
  }
}

export default new App().app
