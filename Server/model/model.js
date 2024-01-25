const Sequelize=require("sequelize");
const sequelize=require('../database/database');
module.exports.Users=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:Sequelize.CHAR(255),
        allowNull:false
    },
    email:{
        type:Sequelize.STRING(255),
        unique:true,
        allowNull:false
    },
    mobile:{
        type:Sequelize.STRING(255),
        unique:true,
        allowNull:false
    },
    time:{
        type:Sequelize.DATE,
        allowNull:false
    }
});

