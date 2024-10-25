//estrutura básica do express para iniciar um servidor 

const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();
const port = 4000;
// Informando ao Express que está usando o ejs
app.set('view engine', 'ejs');
// Informando pasta de arquivos estáticos
app.use(express.static('public'));
//bodyParser 
app.use(urlencoded({extended:false}))




//rotas
app.get("/", (req, res) => {
  res.render("index")
});
//criou a rota da pagina perguntar
app.get("/perguntar", (req, res) => {
  res.render("perguntar")
});
// criou rota para salvar o formulário
app.post("/salvarpergunta", (req, res)=>{
  let description = req.body.descricao
  res.send(`formulário recebido ${description}`)
})

app.listen(port);
