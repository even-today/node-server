/**
 * Created by Even on 2021/01/28
 */
import "reflect-metadata"
import * as fs from 'fs'
import * as path from 'path'
import { createKoaServer, UnauthorizedError } from 'routing-controllers'
import config from './config'

// get file iteratively
function getFiles(dirPath: string): Array<Function> {
    const stat = fs.statSync(dirPath)
    if (!stat.isDirectory()) {
        const temp = require(dirPath).default
        return temp ? [temp] : []
    }
    const result = []
    const dirs = fs.readdirSync(dirPath)
    dirs.forEach(dir => result.concat(getFiles(path.join(dirPath, dir))))
    return result
}
// get all controllers and middlewares
const controllers = getFiles(path.join(__dirname, './controller'))
const middlewares = getFiles(path.join(__dirname, './middleware'))

// register all middlewares and controllers
const app = createKoaServer({
    middlewares,
    controllers,
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