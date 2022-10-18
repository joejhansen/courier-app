const Comment = require('./Comment');
const Group = require('./Group');
const Post = require('./Post');
const User = require('./User');

User.belongsToMany(Group, {
    foreignKey: 'user_id'
});

Group.belongsTo(User, {
    foreignKey: 'group_admin'
});

Group.belongsToMany(User, {
    // foreignKey: 'group_members'
    foreignKey: 'group_id'
})

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.belongsTo(Group, {
    foreignKey: 'group_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// Comment.belongsTo(Group, {
//     foreignKey: 'group_id'
// });

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

Group.hasMany(Post, {
    foreignKey: 'group_id'
});

Group.hasMany(User, {
    foreignKey: 'group_id'
});

User.hasMany(Post, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

User.hasMany(Group, {
    foreignKey: 'user_id'
});

module.exports = {
    Group, 
    Post,
    Comment,
    User
};
