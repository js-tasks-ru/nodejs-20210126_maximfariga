const path = require('path');
const Koa = require('koa');
const router = require('./router');

const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

app.use(router.routes());

module.exports = app;
