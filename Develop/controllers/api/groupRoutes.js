const router = require('express').Router();
const { Group, Post, User } = require('../../models');

router.post('/', async (req, res) => {
    const body = req.body;
    
    try {
        const newGroup = await Group.create({ ...body, user_id: req.session.user_id,})
        res.json(newGroup);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
      const [affectedRows] = await Group.update(req.body, {

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