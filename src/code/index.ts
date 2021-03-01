/**
 * Created by Even on 2021/01/28
 */
import "reflect-metadata"
import * as path from 'path'
import { createKoaServer, UnauthorizedError } from 'routing-controllers'
import config from './config'

// register all middlewares and controllers
const app = createKoaServer({
    middlewares: [path.join(__dirname, './middleware/*.js')],
    controllers: [path.join(__dirname, './controller/**/*.js')],
    defaultErrorHandler: false,
})

// start server
const server = app.listen(config.port, () => {
    const port = server.address().port
    console.log(`server is listening at ${port}`)
})

// error log
app.on('error', (error) => {
    console.error(error)
})