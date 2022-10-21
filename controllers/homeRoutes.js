const router = require('express').Router();
const { Post, User, Group, } = require('../models');
const withAuth = require('../utils/auth');

//Get all 
router.get('/', async (req, res) => {
  try {
    // const postData = await Post.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['username'],
    //     },
    //   ],
    // });

    // const posts = postData.map((post) => post.get({ plain: true }));
    const groupData = await Group.findAll({
      include: [User, Post],
    });
    const groups = groupData.map((group) => group.get({ plain: true }));

    res.render('homepage', {
      groups,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});





router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;