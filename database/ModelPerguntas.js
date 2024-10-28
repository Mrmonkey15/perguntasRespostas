// Conectanco com o sequelize e com o banco de dados
const { Sequelize } = require('sequelize');
const connection = require('./database');
// Criando a tabela 
const Pergunta = connection.define ('pergunta', {
titulo:{ // nome da tabela
    type: Sequelize.STRING, //tipo de tabela (string,float,int...)
    allowNull: false}, // Obrigatório? True ou false
descriçao:{
        type: Sequelize.TEXT,
        allowNull:false
    }
});


Pergunta.sync({force:false}).then(()=>{
    console.log("tabela Criada")
}) // sincroniza a criação da tabela. / o force refere se a força ou não a tabela caso ela já exista

//importa o modulo pergunta para ser usado no salvamento dos dados
module.exports= Pergunta; 