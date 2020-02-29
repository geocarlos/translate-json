const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = (sequelize, DataTypes) => {
  const Entry = sequelize.define(
    'entry',
    {
      key: {
        type: DataTypes.STRING(100),
        primaryKey: true
      },
      language: {
        type: DataTypes.STRING(5)
      },
      content: {
        type: DataTypes.STRING(1000)
      },
      description: {
        type: DataTypes.STRING(1000)
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  Entry.associate = models => {
    Entry.belongsTo(models.Language, {foreignKey: 'code', as: 'language'})
  }
  return Entry;
}