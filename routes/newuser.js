const express = require('express');
const router = express.Router({mergeParams:true});
const Joi = require('joi');

const passport = require('passport');
const {requirelogin , storeReturnto }= require('../middleware.js');
const flash = require('connect-flash');
router.use(flash());
const userc = require('../controllers/userc.js');



router.route('/sign-up')
    .get(userc.getsignupfunc)
    .post(userc.postsignupfunc);


router.route('/login')
    .get(userc.getloginfunc)
    .post(storeReturnto ,passport.authenticate('local',{ failureMessage : true ,failureRedirect:'/user/login'}),userc.postloginfunc);

router.get('/logout',userc.getlogoutfunc);

router.get('/view/:id',userc.viewfunc);



module.exports = router;