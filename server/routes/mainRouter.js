var express = require('express');

//routers declarations
var router = express.Router();
var tagsRouter = require('./tagsRouter')


// Middleware that checks if logged in and sets cookie to true
// Used so that Angular can check for this cookies existence to see if logged in or not
// Used only on production
// router.use(function(req, res, next) {
//   if (req.isAuthenticated()) {
//     res.cookie('isLoggedIn', true);
//   } else {
//     res.cookie('isLoggedIn', false);
//     req.logout();
//   }
//   next();
// });


// Set up our different api endpoints
router.use('/tags', tagsRouter);

module.exports = router; 

