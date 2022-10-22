const router = require('express').Router();
const { User, Post, Group, UserGroups } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: [User, Group]
        });
        const posts = postData.map((post) => post.get({ plain: true }));

        const groupData = await Group.findAll({
            where: { group_admin: req.session.user_id },
            include: [{
                model: User
            }],
        });

        const groups = groupData.map((group) => group.get({ plain: true }));

        const user = await User.findByPk(req.session.user_id)
        const U = user.get({ plain: true })

        // console.log(posts)

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


router.get('/newpost', withAuth, async (req, res) => {
    try {
        if (req.session.logged_in) {

            const userGroupsData = await UserGroups.findAll({
                where: {
                    user_id: req.session.user_id
                },
                include: [Group]
            })

            const userGroups = await userGroupsData.map((group) => group.get({ plain: true }))

            console.log(userGroups)

            res.render('newPost', {
                userGroups,
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