// checks if the user is logged in when trying to access a page
const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
};

const isLoggedOut = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
};

module.exports = { isLoggedIn, isLoggedOut };
