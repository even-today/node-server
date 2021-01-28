import { Context } from 'koa'
import { Controller, Param, Body, Get, Post, Put, Delete, Ctx } from 'routing-controllers'
import { Demo } from '#/interface/controller/demo/demo-interface'

@Controller('/demo')
export default class DemoController {
    @Get('/')
    async getDemo(@Ctx() ctx: Context): Promise<Demo> {
        return {
            name: '123',
            data: ['data']
        }
    }

    @Post('/')
    async postDemo(@Ctx() ctx: Context, @Body() body: Demo): Promise<Demo> {
        console.log(body, 123)
        return {
            name: '123',
            data: ['data']
        }
    }
}