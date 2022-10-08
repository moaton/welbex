module.exports = (sequelize, Sequelize) => {
  const Data = sequelize.define("data", {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: Sequelize.DATE
    },
    name: {
      type: Sequelize.TEXT
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    distance: {
      type: Sequelize.INTEGER
    },
  });
  return Data;
}