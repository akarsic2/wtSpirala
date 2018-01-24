const Sequelize = require("sequelize");
const sequelize = require("./baza.js");
const LicniPodaci = sequelize.define('LicniPodaci',{
    ime_prezime: Sequelize.STRING(30),
    broj_indexa: Sequelize.STRING(30),
    grupa: Sequelize.STRING(5),
    akademska_godina: Sequelize.STRING(10),
    fakultetski_mail: Sequelize.STRING(30),
    trenutni_semestar: Sequelize.STRING(15),
    regex_za_validaciju: Sequelize.STRING(15),
    bitbucket_url: Sequelize.STRING,
    bitbucket_ssh: Sequelize.STRING,
    naziv_repozitorija: Sequelize.STRING(15),
    maksimalan_broj_grupa: Sequelize.INTEGER,  
    verified: Sequelize.BOOLEAN
})
module.exports = function(sequelize,DataTypes){
    return LicniPodaci;
}