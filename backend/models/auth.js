const Sequelize = require("sequelize");
const { sequelize } = require("./dbhelper");

const Registration = sequelize.define("registration", {
  username: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  salt: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
});

exports.registration = (username, password, salt) => {
  return Registration.create({
    username: username,
    password: password,
    salt: salt,
  })
    .then((result) => {
      return "success";
    })
    .catch((err) => {
      console.error(`Registration failed. Error message: ${err}`);
      return err;
    });
};
