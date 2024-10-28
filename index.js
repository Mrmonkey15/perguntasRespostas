//estrutura básica do express para iniciar um servidor 

const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();
const port = 5000;
// Informando ao Express que está usando o ejs
app.set('view engine', 'ejs');
// Informando pasta de arquivos estáticos
app.use(express.static('public'));
//bodyParser 
app.use(urlencoded({extended:false}))
//carregando conexão com o database
const connection = require('./database/database')
// confirmando a conexão 
connection.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });
  // Importa o Model da tabela
  const PerguntaModel = require("./database/ModelPerguntas")
//rotas
app.get("/", (req, res) => {
  PerguntaModel.findAll({raw:true}).then(perguntas=>{
    res.render("index", { perguntas:perguntas}) // enviado para o front uma variavel "perguntas" que são os dados dentro do banco de dados obtido no models
  })
  
});
//criou a rota da pagina perguntar
app.get("/perguntar", (req, res) => {
  res.render("perguntar")
});
// criou rota para salvar o formulário
app.post("/salvarpergunta", (req, res)=>{
  let title = req.body.titulo;
  let description = req.body.descricao
  PerguntaModel.create({
    titulo: title,
    descriçao: description
  })
  .then(() => {
    res.redirect("/")
  })
  .catch((error) => {
    console.error("Erro ao salvar a pergunta:", error);
    res.send("Erro ao salvar a pergunta.");
  });
})

app.listen(port);
