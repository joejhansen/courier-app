const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).redirect(`/api/posts/${req.body.post_id}`)
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  