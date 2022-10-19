const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req,res) => {
    try {
        const userData = await Post.findAll({
            where: {user_id: req.session.user_id},
            include: [User]
        });
        const posts = userData.map((post) => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});


router.get('/newpost', withAuth, (req, res) => { 
    try {
        if(req.session.logged_in) {
            res.render('newPost',{
                logged_in: req.session.logged_in
            });
            return;
        }
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json(error);
    }
    
});


module.exports = router;