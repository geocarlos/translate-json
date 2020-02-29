module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define(
    'language',
    {
      code: {
        type: DataTypes.STRING(5),
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(100)
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  Language.associate = models => {
    Language.hasMany(models.Entry, {as: 'entries'})
  }
  return Language;
}