const Router = require('koa-router');
const router = new Router();

let subscription = [];

router.get('subscribe', '/subscribe', async (ctx, next) => {
  const { message } = await new Promise((resolve) => {
    subscription.push(resolve);
  })

  ctx.body = message
});

router.post('publish', '/publish', async (ctx, next) => {
  if (subscription.length && ctx.request.body.message) {

    subscription.forEach(item => item(ctx.request.body))
    subscription = [];
  }

  ctx.body = 'ok'
});

module.exports = router;