//estrutura básica do express para iniciar um servidor 

const express = require('express');
const app = express();
const port = 8080;
// Informando ao Express que está usando o ejs
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.send("Teste de rota1");
});

app.listen(port);
