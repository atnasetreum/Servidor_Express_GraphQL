var express         = require('express');
var graphqlHTTP     = require('express-graphql');
var { buildSchema } = require('graphql');
var mysql           = require('mysql');
var host_db         = 'localhost';
var user_db         = 'tecnosinergia';
var password_db     = 'tecnosinergia';
var db_db           = 'tecnosinergia_sql';

//var $db = mysql.createConnection({host: host_db,user: user_db, password: password_db, database: db_db});


var connection = mysql.createConnection({
  host    : host_db,
  user    : user_db,
  password: password_db,
  database: db_db
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('You are now connected...');
});


//var usuarios;

/*$db.connect(function(err) {
  if (err) throw err;
  console.log("Conexión Mysql correctamente.");
  $db.query("SELECT ISEQ AS id, ICOD AS code, IDESCR AS description FROM finv limit 5", function (err, result, fields) {
    if (err) throw err;
    products = result;
    console.log('resultados de tecnosinergia_sql local: '+products.length);
  });

  var newConnection = mysql.createPool({host: '192.168.20.245',
                                          user: 'tecnosinergia',
                                          password : 'tecnosinergia',
                                          port : 3306,
                                          database:'tecnosinergia_sql'});
                                          app.set('connection_user',newConnection);

  $db.query("SELECT ISEQ AS id, ICOD AS code, IDESCR AS description FROM finv limit 5", function (err, result, fields) {
    if (err) throw err;
    products = result;
    console.log('resultados de tecnosinergia_sql local: '+products.length);
  });

});*/

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`

  type Query {
    catalogo: String,
    usuarios: String,
    credentials(numDice: Int!, numSides: Int): [Int],
    products: [String]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  catalogo: () => {
    return 'Hello world POSTMAN!';
  },
  usuarios: () => {
    return 'aaa';
  },
  credentials: function ({numDice, numSides}) {
    console.log(numDice);
    //var output = [];
    //for (var i = 0; i < numDice; i++) {
      //output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    //}
    return [1,2,3];
  },

  products: () =>{
    return ['DD102SEA01', 'RAA10APR06', 'MTA03ENS15'];
  }

};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: process.env.NODE_ENV === 'development',
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('El servidor esta corriendo en la url: http://'+host_db+':4000/graphql');

