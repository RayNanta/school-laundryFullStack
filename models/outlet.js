'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class outlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.transaksi,{
        foreignKey: "id_outlet",
        as: "transaksi"
      }),
      this.hasMany(models.paket,{
        foreignKey: "id_outlet",
        as: "paket"
      }),
      this.hasMany(models.user,{
        foreignKey: "id_outlet",
        as: "user"
      })
    }
  }
  outlet.init({
    nama: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    tlp: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'outlet',
    modelName: 'outlet',
  });
  return outlet;
};