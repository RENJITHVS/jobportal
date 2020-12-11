var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers');
const jobHelpers = require('../helpers/job-helpers');



/* GET home page. */
router.get('/', function (req, res, next) {
  let user = req.session.user
  jobHelpers.getAllJobs().then((jobs) => {
    console.log(jobs)
    res.render('user/user-index', { title: 'JobNow', user, jobs });
  });

});

router.get('/user-login', function (req, res) {

  //check the session is valid
  if (req.session.loggedIn) {
    res.redirect('/', { user: true })
  } else {
    res.render('user/user-login', { "loginErr": req.session.loginErr, plain: true })
    req.session.loginErr = false;
  }
});

router.get('/user-signup', function (req, res) {
  res.render('user/user-signup', { plain: true })
});

router.post('/user-signup', function (req, res) {
  userHelpers.doSignup(req.body).then((response) => {
    req.session.loggedIn = true
    req.session.user = response
    res.redirect('/')
  })
});

router.post('/user-login', function (req, res) {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      //validating the user
      req.session.loggedIn = true;
      req.session.user = response.user
      res.redirect('/')
    } else {
      req.session.loginErr = true;
      res.redirect('/user-login')
    }

  })
});
router.get('/user-logout', function (req, res) {

  //destroy session
  req.session.destroy();
  res.redirect('/')
})

module.exports = router;
