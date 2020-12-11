var express = require('express');
var router = express.Router();
const employerHelpers = require('../helpers/employer-helpers');
const jobHelpers = require('../helpers/job-helpers');


/* GET employers listing. */
router.get('/', function (req, res, next) {
  if (req.session.loggedIn) {
    let employer = req.session.employer;
    jobHelpers.getAllJobs().then((jobs) => {
      console.log(jobs)
      res.render('employer/employer-index', { jobs, employer });
    });
  } else {

    res.render('employer/employer-login', { "loginErr": req.session.loginErr, plain: true })
    req.session.loginErr = false;

  }

  router.get('/add-new-job', function (req, res) {
    res.render('employer/add-new-job', { employer:true })
  })

  router.post('/add-new-job', (req, res) => {
    jobHelpers.addJob(req.body)
    res.redirect('/employer')
  })

})

router.get('/employer-logout', (req, res) => {

  req.session.destroy();
  res.redirect('/employer')

});

router.get('/employer-signup', function (req, res) {
  res.render('employer/employer-signup', { plain: true })
});

router.post('/employer-signup', function (req, res) {
  employerHelpers.doSignup(req.body).then((response) => {
    req.session.loggedIn = true
    req.session.employer = response
    res.redirect('/employer')
  })
});

router.post('/employer-login', function (req, res) {
  employerHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      //validating the user
      req.session.loggedIn = true;
      req.session.employer = response.employer
      res.redirect('/employer')
    } else {
      req.session.loginErr = true;
      res.render('employer/employer-login', { "loginErr": req.session.loginErr, plain: true })

    }

  })
});

module.exports = router;
