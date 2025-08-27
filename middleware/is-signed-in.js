
// logic that checks if req.session.user exists
const isSignedIn = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/auth/sign-in');
  };
  
  module.exports = isSignedIn;