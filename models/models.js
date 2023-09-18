const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Task = sequelize.define('Task', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
      defaultValue: 'pending',
    },
    dueDate: {
      type: DataTypes.DATE,
    },
  });

module.exports = {Task};