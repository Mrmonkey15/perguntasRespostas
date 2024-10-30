// após a instalação é importado o sequelize
const { Sequelize } = require('sequelize');

// conectou com o banco de dados
const connection= new Sequelize('perguntasDatabase', 'root', 'Piloto307#', {
  host: 'localhost',
  dialect: 'mysql'  
});
// Exportou a conexeção para ser usado no index

module.exports= connection;
