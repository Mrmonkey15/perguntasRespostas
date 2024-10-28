const { Sequelize } = require('sequelize');

const connection= new Sequelize('perguntasDatabase', 'root', 'Piloto307#', {
  host: 'localhost',
  dialect: 'mysql'  
});

module.exports= connection;
