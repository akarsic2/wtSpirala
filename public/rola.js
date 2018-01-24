const Sequelize = require("sequelize");
const sequelize = require("./baza.js");
const Rola = sequelize.define('Rola',{
    naziv: Sequelize.STRING(30),
})
module.exports = function(sequelize,DataTypes){
    return Rola;
}