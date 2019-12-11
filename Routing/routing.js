const express = require('express');
const rout = express.Router();

const LoginController = require('../Controllers/LoginController');
const AdminController = require('../Controllers/AdminController');
const {roleWiseAuth} = require('../Models/rolewiseAuth');

rout.get('/',LoginController.index)
    
    .get('/register',LoginController.sigup_Get)
    .post('/register',LoginController.signup_Post)

    .get('/app/login',LoginController.login_Get)
    .post('/app/login',LoginController.login_Post)

    .get('/logout',LoginController.logoff)
    .get('/spotify',LoginController.spotify_api);

/**************Admin Controller Routing  */

rout.get('/admin', [roleWiseAuth.roleAuth('User,Administration,Employee')] ,AdminController.index)
    .get('/admin/profile',[roleWiseAuth.notAllowAnnonmus()], AdminController.profile_Get)

    rout.post('/bulk_csv',LoginController.csv_bulk_upload);
    rout.post('/bulk_xlsx',LoginController.xlsx_bulk_upload);


module.exports = rout;