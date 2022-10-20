const router = require('express').Router();
const { User, Post } = require('../../models');

router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const postData = await Post.findByPk(id, {
      include: [User]
    });

    const postComment = await Comment.findAll({
      where: {
        post_id: postData.id,
      }
    })

    if (!postData) {
      res.status(404).json({ message: "no post data, sorry" })
    } else {
      const post = postData.get({ plain: true })
      const comments = postComment.get({ plain: true })
      // res.status(200).json(post)
      res.status(200).render('single-post', {
        post,
        comments,
        logged_in: req.session.logged_in
      })
    }
  } catch (error) {
    res.status(500).json({ message: `Error: ${error}`})
  }
})

// must test router.get

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
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