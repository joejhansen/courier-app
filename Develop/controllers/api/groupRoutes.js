const router = require('express').Router();
const { Group, Post, User } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/:id', withAuth, async (req, res) => {
  try {
    const groupData = await Post.findAll({
      where: { group_id: req.params.id },
      include: [User]
    });
    const groupPosts = groupData.map((group) => group.get({ plain: true }));

    const logged_in = req.session.logged_in
    res.render("group", { groupPosts, logged_in })
  } catch (error) {
    res.status(500).json(error);
  }

});




router.post('/', async (req, res) => {
  try {
    const newGroup = await Group.create({
      group_name: req.body.group_name,
      group_admin: req.session.user_id,
    });
    if (!req.body.group_name) {
      return res.status(401).json({ msg: "No group!" })
    }
    res.status(200).json(newGroup);
  } catch (err) {
    res.status(400).json(err);
  }
});

// groups/id
router.put('/:id', async (req, res) => {
  try {
    const [affectedRows] = await Group.update(req.body.group_members, {

      where: {
        id: req.params.id,
      },
    });


    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const [affectedRows] = Group.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;