import Sequelize, { Model } from 'sequelize'

class Manufacturer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    )
    return this
  }

  static associate(models) {
    // Informations
    this.belongsTo(models.ManufacturerCategory)
    this.belongsTo(models.ManufacturerEmail)
    this.belongsTo(models.ManufacturerPhone)
    // Machine
    this.hasMany(models.Machine, {
      foreignKey: 'manufacturer_id',
      as: 'machine_manufacturer',
    })
    // Components
    this.hasOne(models.Software, {
      foreignKey: 'manufacturer_id',
      as: 'software_manufacturer',
    })
    this.hasOne(models.CNC, {
      foreignKey: 'manufacturer_id',
      as: 'cnc_manufacturer',
    })
    this.hasOne(models.Driver, {
      foreignKey: 'manufacturer_id',
      as: 'driver_manufacturer',
    })
    this.hasOne(models.IHM, {
      foreignKey: 'manufacturer_id',
      as: 'ihm_manufacturer',
    })
    this.hasOne(models.PLC, {
      foreignKey: 'manufacturer_id',
      as: 'plc_manufacturer',
    })
  }
}

export default Manufacturer
