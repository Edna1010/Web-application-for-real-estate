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
db.Upiti=require(__dirname + '/models/Upiti')(sequelize, Sequelize);

db.Nekretnina.hasMany(db.Upiti, { foreignKey: 'IDNekretnine', as: 'Upiti' });
db.Upiti.belongsTo(db.Nekretnina, { foreignKey: 'IDNekretnine', as: 'Nekretnina' });
db.Korisnik.hasMany(db.Upiti, { foreignKey: 'IDKorisnika', as: 'Upiti' });
db.Upiti.belongsTo(db.Korisnik, { foreignKey: 'IDKorisnika', as: 'Korisnik' });
module.exports = db;