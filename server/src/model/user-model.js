import sequelize from '../config/connection.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, {
  tableName: 'users',
  timestamps: false
});


export default User;