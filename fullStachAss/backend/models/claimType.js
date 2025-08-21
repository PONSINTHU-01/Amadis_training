
const {DataTypes}=require('sequelize');
const sequelize = require("../config/db");

const ClaimType=sequelize.define('ClaimType',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports=ClaimType;