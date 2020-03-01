'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('entry', {
      id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
      },
      key: {
        type: Sequelize.STRING(100),
      },
      language: {
        type: Sequelize.STRING(5)
      },
      content: {
        type: Sequelize.STRING(1000)
      },
      description: {
        type: Sequelize.STRING(1000)
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
