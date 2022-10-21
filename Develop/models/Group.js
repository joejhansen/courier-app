const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Group extends Model {}

Group.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        group_name: {
            type:DataTypes.STRING,
            allowNull: false
        },
        group_admin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        group_members: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'group',
    }
);

module.exports = Group;
