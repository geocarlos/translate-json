const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = (sequelize, DataTypes) => {
  const Entry = sequelize.define(
    'translation',
    {
      source: {
        type: DataTypes.STRING(5)
      },
      target: {
        type: DataTypes.STRING(5)
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  Entry.associate = models => {
    Entry.hasOne(models.Language, {foreignKey: 'code', as: 'source'})
  }
  Entry.associate = models => {
    Entry.hasOne(models.Language, {foreignKey: 'code', as: 'target'})
  }
  return Entry;
}