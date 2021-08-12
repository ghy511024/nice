#### 前言

> @wb/nice 并不是一个前端框架而是一个ts 路由注解器。
> 所有原生express 或者koa项目都能使用此组件平滑的迁移成ts项目，而不影响原项目逻辑。

#### 安装

```shell
npm i @wb/nice -D --registry http://ires.58corp.com/repository/58npm/
```

#### 使用样例

* 目录结构举例：

```shell
src
    ├─controller
    │  ├─HomeController.js
    │  └─ListController.ts
    ├─router
    │  └─Router.ts
    └─server.ts

```

* HomeController.js

```js
const express = require('express');
const router = express.Router();

router.get('/home', async function (req, res) {
    res.send("ok")
});

module.exports = router;
```

* ListController.ts

```ts
import {Controller, Get, Post} from '@fang/router';

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
}

```

* Router.ts
```shell

```
