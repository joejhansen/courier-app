const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{
        model: User
      }],
    });
    console.log(postData)

    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id
      },
      include: [{
        model: User
      }],
    })
    console.log(commentData)
    if (postData) {
      const post = postData.get({ plain: true });

      const comments = commentData.map((comment) => comment.get({ plain: true }))

      const logged_in = req.session.logged_in

      res.status(200).render('single-post', { post, comments, logged_in });
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

router.post('/pdfHandler', async(req, res) => {
  try{

  } catch(err){
    throw err
  }
})

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