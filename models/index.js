const Comment = require('./Comment');
const Group = require('./Group');
const Post = require('./Post');
const User = require('./User');
const UserGroups = require('./UserGroups')

User.belongsToMany(Group, {
    through: UserGroups,
    foreignKey: 'user_id'
});

Group.belongsTo(User, {
    foreignKey: 'group_admin',
    through: UserGroups
});

Group.belongsToMany(User, {
    foreignKey: 'group_id',
    through: UserGroups
})

UserGroups.belongsTo(User, {
    onDelete: 'cascade'
});

User.hasMany(UserGroups);

UserGroups.belongsTo(Group, {
    onDelete: 'cascade'
});

Group.hasMany(UserGroups)
// Group.belongsToMany(User, {
//     // foreignKey: 'group_members'
//     through: UserGroups
//     foreignKey: 'group_id'
// })

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

Post.belongsTo(Group, {
    foreignKey: 'group_id',
    onDelete: 'cascade'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

Comment.belongsTo(Group, {
    foreignKey: 'group_id',
    onDelete: 'cascade'
})

// Comment.belongsTo(Group, {
//     foreignKey: 'group_id'
// });

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

Group.hasMany(Post, {
    foreignKey: 'group_id',
    
});

// Group.hasMany(User, {
//     foreignKey: 'group_id',
//     // through: UserGroups
// });

User.hasMany(Post, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

// User.hasMany(Group, {
//     foreignKey: 'user_id'
// });

module.exports = {
    Group, 
    Post,
    Comment,
    User,
    UserGroups
};
