module.exports = async function mustBeAuthenticated(ctx, next) {
  const {user} = ctx;

  if (!user) {
    ctx.status = 401;
    ctx.body = {error: 'Пользователь не залогинен'};
    return;
  }

  return next();
};
