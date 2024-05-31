const express = require('express');
const router = express.Router({mergeParams:true});
const {user,gossip} = require('../models/gposts.js');
const {requirelogin}= require('../middleware.js');
const postc = require('../controllers/postc.js');
//multer for rendering files in the form
const multer = require('multer');
const {storage}  = require('../cloudinary');
const upload = multer({storage});


router.route('/newpost')
    .get(requirelogin,postc.getnpostfunc)
    .post(requirelogin,upload.single('image') ,postc.postnpostfunc);

router.get('/:id',postc.viewpostfunc);

router.route('/:id/edit')
    .get(postc.editgetfunc)
    .put(postc.editputfunc);

router.put('/:id/like',requirelogin,postc.likeputfunc)

router.delete('/:id/delete',postc.deletepfunc);




module.exports = router;