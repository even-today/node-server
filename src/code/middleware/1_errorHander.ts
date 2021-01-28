import { Context } from 'koa'
import { Middleware, KoaMiddlewareInterface } from 'routing-controllers'

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