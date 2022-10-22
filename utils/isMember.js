const { UserGroups } = require('../models');

const isMember = async (req, res, next) => {
    const userGroupData = await UserGroups.findOne({
        where: {
            user_id: req.session.user_id,
            group_id: req.params.id
        }
    })

    if(!userGroupData){
        res.redirect('/')
    } else{
        next()
    }

}

module.exports = isMember;