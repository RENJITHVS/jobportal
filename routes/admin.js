var express = require('express');
var router = express.Router();
const adminHelpers = require('../helpers/admin-helpers');


/* GET users listing. */
router.get('/', function (req, res,) {
  res.render('admin/admin-login', { plain: true })
});

router.post('/admin-login', function (req, res) {
  adminHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      //validating the user
      response.status = true;

      //user and employer collection
      adminHelpers.getAllUsers().then((users) => {
        adminHelpers.getAllEmployers().then((employers) => {
          console.log(users)
          console.log(employers)
          res.render('admin/admin-index', { title: 'JobNow', users, employers, admin: true });
        });
      });
    } else {
      response.status = false;
      res.render('admin/admin-login', { plain: true })
    }

  })
});

module.exports = router;
