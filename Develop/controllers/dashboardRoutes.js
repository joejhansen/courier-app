const router = require('express').Router();
const { User, Post, Group } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req,res) => {
    try {
        const userData = await Post.findAll({
            where: {user_id: req.session.user_id},
            include: [User]
        });
        const posts = userData.map((post) => post.get({ plain: true }));
        const groupData = await Group.findAll({
            where: {group_admin: req.session.user_id}
        });
        const groups = groupData.map((group) => group.get({ plain: true }));

        const user = await User.findByPk(req.session.user_id)
        const U = user.get({plain: true})

        res.render('dashboard', {
            posts,
            groups,
            U,
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


router.get('/group/:id', withAuth, async (req, res) => { 
    try {
        const groupData = await Post.findAll({
            where: {group_id: req.params.id}
        });
        const groupPosts = groupData.map((group) => group.get({ plain: true }));
       res.render("group", {groupPosts})
    } catch (error) {
        res.status(500).json(error);
    }
    
});


module.exports = router;