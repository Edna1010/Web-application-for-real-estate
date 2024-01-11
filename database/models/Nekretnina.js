module.exports=function(sequelize, DataTypes){
    const Nekretnina=sequelize.define("nekretnina",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        tip_nekretnine:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        naziv:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        kvadratura:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cijena:{
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        tip_grijanja:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        lokacija:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        godina_izgradnje:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        datum_objave:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        opis:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        brojpretraga:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        brojklikova:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return Nekretnina;
}