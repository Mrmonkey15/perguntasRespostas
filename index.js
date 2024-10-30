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
  // Importa o Model da Resposta
  const RespostaModel = require("./database/ModelRespostas")
//rotas
//rota geral do index
app.get("/", (req, res) => {
  PerguntaModel.findAll({raw:true, order:[['id','DESC']]}).then(perguntas=>{ // metodo findAll, consulta todas as entradas na tabela 
    res.render("index", { perguntas}) // enviado para o front uma variavel "perguntas" que são os dados dentro do banco de dados obtido no models
  })
  
});
// Rota pelo id da pergunta 
app.get("/pergunta/:id", (req,res) =>{
  let id = req.params.id // obtem o id da rota
  PerguntaModel.findOne({ // é feita a busca que retorna oq foi pesquisado no banco
    where: {id} // com o shorthand, quando a key for igual a variavel, não precisa repetir
  }).then(pergunta=>{
    if (pergunta){ // Pergunta encontrada
      RespostaModel.findAll({ where:{perguntaId:pergunta.id}}).then(respostas =>{ res.render("pergunta",{pergunta,respostas})

      })
 
    }else{ // Não encontrada
    res.redirect("/")
    }
  })
})
// Rota de Salvar formulario  Resposta 
app.post("/responder", (req,res)=>{
  let corpo =  req.body.corpo;
  let perguntaID = req.body.idPergunta;
  RespostaModel.create({
    corpo:corpo,
    perguntaID:perguntaID
  }).then(()=>{
    res.redirect("/pergunta/"+perguntaID) // redireciona para a pagina com da reposta, usando o id da pergunta
  })
})

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
  })// pelo método create, é enviado para a tabela criada, os dados title e description
  .then(() => {
    res.redirect("/")
  })
  .catch((error) => {
    console.error("Erro ao salvar a pergunta:", error);
    res.send("Erro ao salvar a pergunta.");
  });
})


// rodou a aplicaçao 

app.listen(port);
