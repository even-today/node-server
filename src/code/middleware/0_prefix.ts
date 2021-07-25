// 0_prefix 0 代表处于所有中间件的第一个执行
import { Context } from 'koa'
import { Middleware, KoaMiddlewareInterface } from "routing-controllers"
import config from '../config'

@Middleware({ type: 'before' })
export default class PreFixMiddleWare implements KoaMiddlewareInterface {
    async use(ctx: Context, next: () => Promise<any>): Promise<any> {
        const prefixRegexp = new RegExp('^/api')
        ctx.request.url = ctx.request.url.replace(prefixRegexp, '')
        if (!ctx.request.url) ctx.request.url = '/'
        console.log(`<${ctx.method}> ${ctx.request.path}`)

        // 线下环境则支持跨域
        if (config.env === 'development') {
            // localhost:3000 front-end dev server port
            ctx.response.set('Access-Control-Allow-Origin', 'http://localhost:3000')
            ctx.response.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
            // 本地跨域测试 header 专用
            ctx.response.set('Access-Control-Allow-Headers', 'content-type,other-key')
            ctx.response.set('Access-Control-Allow-Credentials', 'true')
        }
        await next()
    }
}
