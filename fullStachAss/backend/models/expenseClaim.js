const {DataTypes}=require('sequelize');
const sequelize=require('../config/db')

const ExpenseClaim=sequelize.define('ExpenseClaim',{
    amount:{
         type: DataTypes.FLOAT, 
        allowNull: false
    },
    expense_type:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING
    },
    receipt:{
       type:DataTypes.STRING,
    },
    status:{
        type:DataTypes.ENUM('pending','approved','rejected'),
        defaultValue:'pending'
    }
},{
    timestamps:true
}
);

module.exports=ExpenseClaim;