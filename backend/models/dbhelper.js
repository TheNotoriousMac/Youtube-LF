require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: "mysql",
  maxConcurrentQueries: 100,
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

exports.sequelize = sequelize;

exports.connection = () => {
  sequelize
    .authenticate()
    .then(() => {
        console.log(`connection established successfully`);
    })
    .catch((err) => {
        console.error(`Unable to connect to database: ${err.message}`);
    });
};
