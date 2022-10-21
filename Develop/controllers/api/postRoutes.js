const router = require('express').Router();
const { User, Post } = require('../../models');

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
      //   {
      //     model: Comment,
      //     include: [User],
      //   },
      ],
    });

    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id
      }
    },{
      include: [User]
    })

    if (postData) {
      const post = postData.get({ plain: true });

      const comments = commentData.map((comment) => comment.get({ plain: true}))

      res.render('single-post', { post, comments });         
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// must test router.get

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).redirect('/dashboard');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;