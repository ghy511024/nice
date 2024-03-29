#### 前言

> @wb/nice 并不是一个前端框架而是一个ts 路由注解器。
> 所有原生express 或者koa项目都能使用此库，平滑的迁移成ts项目，而不影响原项目逻辑。

#### 安装

```shell
npm i @wb/nice -D
```

#### 使用样例

* 目录结构举例：

```shell
src
    ├─controller
    │  └─ListController.ts
    ├─router
    │  └─Router.ts
    └─server.ts
 
```


* ListController.ts

```ts
import {Controller, Get, Post} from '@wb/nice';

@Controller('/')
export class ListController {
    @Get('/list')
    async list(req, res) {
        res.render('list')
    }

    @Post('/sub')
    async someFun(req, res) {
        let data = {code: 0}
        res.send(data)
    }
    // 正则
    @Get(/(shangpu|xiezilou|)(chuzu|)-list/)
    async someFun(req, res) {
        let data = {code: 0}
        res.send(data)
    }
}

```

* Router.ts
```ts
import {Router} from '@wb/nice';
import {ListController} from '../controller/ListController';
export const useRouter = function (app) {
    const router = new Router(app);
    /** 等价于  app.use('/list', ListController)  */
    router.use('/list', ListController)
};
```

* server.ts
```ts
const express = require('express');
const app = express();
const http = require('http');

import {useRouter} from "./routes/router"
useRouter(app)

let server = http.createServer(app);
server.listen(8001, () => {
    console.log("start app listen: http://127.0.0.1:8001")
});
```

### 使用中间件

* server.ts
```ts
import {Controller, Get, Mid} from "@wb/nice";
import {Request, Response} from 'express';
import {ICP_Express, FeCommon} from "@fang/icp"

const icp_Express = new ICP_Express();

/** 中间件调用demo */
@Controller('/')
export class MidServiceController {
   
    @Get('/midTest')
    @Mid([icp_Express.env(),icp_Express.auth()])
    async env(req: Request, res: Response) {
        let feCommon = req["feCommon"] as FeCommon;
        res.send({feCommon});
    }
}
```

### xss 修复

```ts
import {Router} from '@wb/nice';
import {ListController} from '../controller/ListController';
export const useRouter = function (app) {
    const router = new Router(app,{xssFix:true});
    router.use('/list', ListController)
};
```

