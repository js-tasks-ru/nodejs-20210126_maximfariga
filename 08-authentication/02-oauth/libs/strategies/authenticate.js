const User = require('../../models/User');

module.exports = async function authenticate(strategy, email, displayName, done) {
  if (!email) {
    return done(null, false, 'Не указан email');
  }

  try {
    const user = await User.findOne({email});

    if (user) {
      return done(null, user);
    } else {
      if (!displayName) {
        return done(null, false, 'User must have name');
      }

      const newUser = await User.create({email, displayName});

      return done(null, newUser);
    }
  } catch (err) {
    return done(err);
  }
};