const router = require('express').Router();
const { Group, Post, User, UserGroups } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/:id', withAuth, async (req, res) => {
  try {
    const groupPostData = await Post.findAll({
      where: { group_id: req.params.id }, 
    }, {
      include: [User]
    });
    const groupPosts = groupPostData.map((group) => group.get({ plain: true }));

    const groupData = await Group.findByPk(req.params.id)

    const group = groupData.get({ force: true })
    
    const groupMembers = JSON.parse(group.group_members)

    console.log(group)
    // res.body.group.group_members.length
    // group.group_members[n]
    console.log(groupMembers)

    const logged_in = req.session.logged_in
    res.render("group", { groupPosts, logged_in, groupMembers })
    // {{#each groupPost }}
    // res.body
    // res.body.grouPosts
    // res.body.logged_in
    // res.body.groupMembers
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

    userGroup = newUserGroup.get({ plain: true })

    console.log(userGroup)

    if (newGroup && newUserGroup){
      res.status(200).redirect('/dashboard')
    } else {
      res.status(500).json({ message: "Internal server error creating one or more groups"})
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