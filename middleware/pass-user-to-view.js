
// logic that assigns req.session.user to res.locals.user
const passUserToView = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null;
    next();
  };
  
  module.exports = passUserToView;