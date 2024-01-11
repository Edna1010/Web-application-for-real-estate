module.exports = function(sequelize, DataTypes) {
    const Korisnik = sequelize.define("korisnik", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        Ime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Prezime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Korisnik;
};