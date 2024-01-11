module.exports = function(sequelize, DataTypes) {
    const Upit = sequelize.define("upiti", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        Tekst: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        IDNekretnine: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        IDKorisnika: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    

    return Upit;
};
