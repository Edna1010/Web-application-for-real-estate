const Sequelize = require('sequelize');
const sequelize = new Sequelize('wt24', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define:{
        freezeTableName: true
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize.options.logging = console.log;

db.Korisnik = require(__dirname + '/models/Korisnik')(sequelize, Sequelize);
db.Nekretnina=require(__dirname + '/models/Nekretnina')(sequelize, Sequelize);
db.Upit=require(__dirname + '/models/Upit')(sequelize, Sequelize);

db.Nekretnina.hasMany(db.Upit, { foreignKey: 'IDNekretnine', as: 'Upiti' });
db.Upit.belongsTo(db.Nekretnina, { foreignKey: 'IDNekretnine', as: 'Nekretnina' });
db.Korisnik.hasMany(db.Upit, { foreignKey: 'IDKorisnika', as: 'Upiti' });
db.Upit.belongsTo(db.Korisnik, { foreignKey: 'IDKorisnika', as: 'Korisnik' });
module.exports = db;