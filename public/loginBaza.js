const Sequelize=require("sequelize");
const sequelize=require("./baza.js");
const LoginBaza=sequelize.define('Login',{
    username: Sequelize.STRING,
    password: Sequelize.STRING
})

const Rola=sequelize.import(__dirname+"/rola.js");
const LicniPodaci = sequelize.import(__dirname+"/licniPodaci.js");

Rola.hasOne(LoginBaza, {as: 'Rola', foreignKey: 'Rola'});
LicniPodaci.hasOne(LoginBaza, {foreignKey: 'LicniPodaci'});

module.exports=function(sequelize, DataTypes){
    return LoginBaza;
}