export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  }, {
    tableName: 'users',
  });

  return User;
};
