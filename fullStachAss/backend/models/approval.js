const {DataTypes}=require('sequelize');
const sequelize=require('../config/db');

const Approval=sequelize.define('Approval',{
    status:{
        type:DataTypes.STRING,
        defaultValue:'approved'
    },
    approvedBy:{
        type:DataTypes.STRING
    }
});

module.exports=Approval; 