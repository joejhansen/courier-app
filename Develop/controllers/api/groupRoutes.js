const router = require('express').Router();
const { Group, Post, User } = require('../../models');


router.get('/', async (req, res) => {
    try {
      const groupData = await Group.findAll({
        include: [User, Post]
      })
      res.status(200).json(groupData);
    } catch (err) {
      res.status(500).json(err);
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

  router.delete('/:id', async (req, res) => {
    try {
      const groupData = await Group.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!groupData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(groupData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;