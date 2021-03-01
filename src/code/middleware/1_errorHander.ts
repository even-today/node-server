import { Context } from 'koa'
import { Middleware, KoaMiddlewareInterface } from 'routing-controllers'

// URL prefix to miss this middleware
const byPass = [
    '/monitor/alive'
];

@Middleware({ type: 'before' })
export default class ErrorHandlerMiddleWare implements KoaMiddlewareInterface {
    async use(ctx: Context, next: () => Promise<any>): Promise<any> {
        try {
            await next()
            // 系统 HTTP Status Error
            const { status } = ctx.response
            if (!/^2[0-9][0-9]/.test(status)) {
                ctx.body = {
                    state: false,
                    error: 'error http status: ' + status
                }
                ctx.response.status = status
                return null
            }

            // 不经过包住的白名单
            const pass = byPass.find(urlPath => ctx.request.url.startsWith(urlPath))
            if (pass) return null

            // 正确返回
            ctx.body = {
                state: true,
                data: ctx.body,
            }
        } catch (err) {
            // 业务 Error
            ctx.body = {
                state: false,
                error: err.message,
                stack: err.stack,
            }
        }
    }
}