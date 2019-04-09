const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : '127.0.0.1',
    port     : 3306,
    user     : 'root',
    password : '',
    database : 'dbouvidoria'
  });

  
connection.connect(function(err){
  if(err) return console.log(err); 
  console.log('conectou!');
})


