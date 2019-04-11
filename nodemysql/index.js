const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

app.listen(port);
console.log('API funcionando!');


function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : '127.0.0.1',
    port     : 3306,
    user     : 'root',
    password : '',
    database : 'dbouvidoria'
  });
 
  connection.query(sqlQry, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      connection.end();
      console.log('executou!');
  });
}

router.get('/tipos', (req, res) =>{
    execSQLQuery('SELECT * FROM tbtipo', res);
})

router.get('/tipos/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE idTipo= ' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM tbtipo' + filter, res);
})


router.get('/secretarias', (req, res) =>{
  execSQLQuery('SELECT * FROM tbsecretaria', res);
})

router.get('/secretarias/:id?', (req, res) =>{
  let filter = '';
  if(req.params.id) filter = ' WHERE idSecretaria= ' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM tbsecretaria' + filter, res);
})


router.get('/assuntos', (req, res) =>{
  execSQLQuery('SELECT * FROM tbassunto', res);
})

router.get('/assuntos/:id?', (req, res) =>{
  let filter = '';
  if(req.params.id) filter = ' WHERE idAssunto= ' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM tbassunto' + filter, res);
})


router.get('/unidades', (req, res) =>{
  execSQLQuery('SELECT * FROM tbunidade', res);
})

router.get('/assuntos/:id?', (req, res) =>{
  let filter = '';
  if(req.params.id) filter = ' WHERE idUnidade= ' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM tbunidade' + filter, res);
})

router.get('/manifestacoes', (req, res) =>{
  execSQLQuery('SELECT * FROM tbmanifestacao', res);
})

//CRIAR UMA ROTA DE MANIFESTAÇÃO QUE RETORNA DE ACORDO COM O PROTOCOLO

router.post('/criarmanifestacoes', (req, res) =>{
  const unidade =req.body.cdunidade;
  const assunto =req.body.cdassunto;
  const secretaria = req.body.cdsecretaria ;
  const tipo = req.body.cdtipo;
  execSQLQuery(`INSERT INTO tbmanifestacao(idUnidade, idAssunto, idSecretaria, idTipo, Status) VALUES('${unidade}','${assunto}','${secretaria}','${tipo}','Aberto')`, res);
});