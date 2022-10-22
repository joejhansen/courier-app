const router = require('express').Router();
const { Group, Post, User, UserGroups } = require('../../models');
const withAuth = require('../../utils/auth')
const isAdmin = require('../../utils/isAdmin')
const isMember = require('../../utils/isMember')

router.get('/:id', withAuth, isMember, async (req, res) => {
  try {
    const groupPostData = await Post.findAll({
      where: { group_id: req.params.id },
      include: [User]
    });
    const groupPosts = await groupPostData.map((group) => group.get({ plain: true }));

    const groupData = await Group.findOne({
      where: { id: req.params.id },
      include: [{ model: UserGroups, include: [User] }, { model: User }]
    })

    const group = await groupData.get({ plain: true })

    const logged_in = req.session.logged_in

    const adminCheck = isAdmin(group.user.id, req.session.user_id)

    res.status(200).render("group", { groupPosts, logged_in, group, adminCheck })

  } catch (error) {
    res.status(500).json(error);
  }

});

// groupPost


router.post('/', async (req, res) => {
  try {
    const newMemberInfo = await User.findByPk(req.session.user_id)

    const newMemberInfoClean = newMemberInfo.get({ plain: true })

    const newMemberName = [newMemberInfoClean.username]

    const newMemberJSONd = JSON.stringify(newMemberName)

    const newGroup = await Group.create({
      group_name: req.body.group_name,
      group_admin: req.session.user_id,
      group_members: newMemberJSONd
    });

    const newUserGroup = await UserGroups.create({
      user_id: req.session.user_id,
      group_id: newGroup.id
    })

    const userGroup = newUserGroup.get({ plain: true })

    console.log(userGroup)

    if (newGroup && newUserGroup) {
      res.status(200).redirect('/dashboard')
    } else {
      res.status(500).json({ message: "Internal server error creating one or more groups" })
    }
    // if (!req.body.group_name) {
    //   return res.status(401).json({ msg: "No group!" })
    // }

  } catch (err) {
    res.status(400).json(err);
  }
});

// groups/id
router.put('/:id', async (req, res) => {
  try {

    const newUser = req.body.newUser

    const newMemberData = await User.findOne({
      where: {
        username: newUser
      }
    })
    
    if (!newMemberData){
      return res.status(404).send(`Can't find that user, sorry!`)
    }

    const user_id = newMemberData.id
    const group_id = req.params.id

    const newMember = await UserGroups.create({
      user_id: user_id,
      group_id: group_id,
    })

    if(!newMember){
      return res.status(500).send('something bad happened with the server')
    }

    res.status(200).redirect(`/api/groups/${req.params.id}`)
    // const [affectedRows] = await Group.update(req.body.group_members, {

    //   where: {
    //     id: req.params.id,
    //   },
    // });


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