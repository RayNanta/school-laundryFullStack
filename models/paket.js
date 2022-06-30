'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.detail_transaksi,{
        foreignKey: "id_paket",
        as: "detail_transaksi"
      }),
      this.belongsTo(models.outlet,{
        foreignKey: "id_outlet",
        as: "outlet"
      })
    }
  }
  paket.init({
    id_outlet: DataTypes.INTEGER,
    jenis: DataTypes.ENUM('kiloan','selimut','bed_cover','kaos','lain'),
    nama_paket: DataTypes.STRING,
    harga: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'paket',
    modelName: 'paket',
  });
  return paket;
};