// Conectanco com o sequelize e com o banco de dados
const { Sequelize } = require('sequelize');
const connection = require('./database');
// Criando a tabela 
const resposta = connection.define ('resposta', {
corpo:{ // nome da tabela
    type: Sequelize.TEXT, //tipo de tabela (string,float,int...)
    allowNull: false}, // Obrigatório? True ou false
perguntaID:{
        type: Sequelize.INTEGER,
        allowNull:false
    }
});

resposta.sync({force:false});

module.exports = resposta;