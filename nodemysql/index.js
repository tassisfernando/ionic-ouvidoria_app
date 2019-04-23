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
    execSQLQuery('SELECT * FROM tbtipo ORDER BY nmTipo', res);
})

router.get('/tipos/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE idTipo= ' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM tbtipo' + filter, res);
})


router.get('/secretarias', (req, res) =>{
  execSQLQuery('SELECT * FROM tbsecretaria ORDER BY nmSecretaria', res);
})

router.get('/secretarias/:id?', (req, res) =>{
  let filter = '';
  if(req.params.id) filter = ' WHERE idSecretaria= ' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM tbsecretaria' + filter, res);
})


router.get('/assuntos', (req, res) =>{
  execSQLQuery('SELECT * FROM tbassunto ORDER BY nmAssunto', res);
})

router.get('/assuntos/:id?', (req, res) =>{
  let filter = '';
  if(req.params.id) filter = ' WHERE idAssunto= ' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM tbassunto' + filter, res);
})


router.get('/unidades', (req, res) =>{
  execSQLQuery('SELECT * FROM tbunidade ORDER BY nmUnidade', res);
})

router.get('/unidades/:id?', (req, res) =>{
  let filter = '';
  if(req.params.id) filter = ' WHERE idUnidade= ' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM tbunidade' + filter, res);
})

router.get('/manifestacoes', (req, res) =>{
  execSQLQuery('SELECT * FROM tbmanifestacao', res);
})

router.get('/manifestacoes/ultima', (req, res) =>{
  let sql = 'SELECT MAX(idManifestacao) FROM tbmanifestacao';
  execSQLQuery(sql, res);
})

router.get('/manifestacoes/:protocolo?', (req, res) =>{
  let filter = '';
  if(req.params.protocolo) filter = ' WHERE idManifestacao= ' + parseInt(req.params.protocolo);
  execSQLQuery('SELECT * FROM tbmanifestacao' + filter, res);
})

router.put('/criarhash', (req, res) =>{
  const hash = req.body.hash;
  const idManifestacao = req.body.idManifestacao;
  let sql = `UPDATE tbmanifestacao SET hash = '${hash}' WHERE idManifestacao = ${idManifestacao}`;
  execSQLQuery(sql, res);
})

router.post('/criarmanifestacoes', (req, res) =>{
  const unidade =req.body.cdunidade;
  const assunto =req.body.cdassunto;
  const secretaria = req.body.cdsecretaria;
  const tipo = req.body.cdtipo;
  const observacao = req.body.observacao;
  const hash = req.body.hash;
  let sql = `INSERT INTO tbmanifestacao(idEndereco, hash, dtInclusao, dtEdicao, idAssunto, idSecretaria, idTipo, Status, Observacao, Origem) VALUES(${unidade},'${hash}',now(),now(),${assunto},${secretaria},${tipo},'Aberto','${observacao}', 'App')`;
  execSQLQuery(sql, res);
});

router.post('/criarmanifestacoes/manifestante', (req, res) =>{
  const unidade =req.body.cdunidade;
  const assunto =req.body.cdassunto;
  const secretaria = req.body.cdsecretaria;
  const tipo = req.body.cdtipo;
  const observacao = req.body.observacao;
  const hash = req.body.hash;
  const manifestante = req.body.idManifestante;
  let sql = `INSERT INTO tbmanifestacao(idManifestante, idEndereco, hash, dtInclusao, idAssunto, idSecretaria, idTipo, Status, Observacao, Origem) VALUES(${manifestante},${unidade},'${hash}',now(),${assunto},${secretaria},${tipo},'Aberto','${observacao}', 'App')`;
  execSQLQuery(sql, res);
});

router.post('/criarmanifestante', (req, res) =>{
  const nmManifestante = req.body.nmManifestante;
  const email = req.body.email;
  const cpf_cnpj = req.body.cpf_cnpj;
  const rg = req.body.rg;
  let sql = `INSERT INTO tbmanifestante(nmManifestante, email, dtInclusao, dtEdicao, cpf_cnpj, rg) VALUES('${nmManifestante}','${email}',now(),now(),'${cpf_cnpj}','${rg}')`;
  execSQLQuery(sql, res);
});

router.get('/manifestante/ultima', (req, res) =>{
  let sql = 'SELECT MAX(idManifestante) FROM tbmanifestante';
  execSQLQuery(sql, res);
})