import { Context } from 'koa'
import { Controller, Param, Body, Get, Post, Put, Delete, Ctx } from 'routing-controllers'

import * as DemoInterface from '#/interface/controller/demo/demo'

@Controller('/demo')
export default class DemoController {
    @Get('/')
    getDemo1(@Ctx() ctx: Context): DemoInterface.PostDemo1Return {
        return {
            data1: 123,
            what: 123,
            test2: 123
        }
    }

    @Post('/')
    postDemo2(@Ctx() ctx: Context, @Body() body: DemoInterface.PostDemo2Body ) : DemoInterface.PostDemo2Return {
        const { data1, data2, test } = body;
        return {
            data2: 234,
            data: 123
        }
    }
}
