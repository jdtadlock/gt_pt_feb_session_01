var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var dbName = 'gt_pt_feb';




var port = process.env.PORT || 5000;
// null, undefined, false, NaN, 0, ''

var app = express(); // {}

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// '/'

// var another = 'somethin else';



MongoClient.connect(url, function (err, client) {
  if (err) return console.log(err);

  console.log("Connected successfully to server");

  const db = client.db(dbName);


  app.get('/', function (request, response) {

    db.collection('test').find({}).toArray(function(err, items) {
      if ( err ) return console.log(err);

      response.render('index', { 
        name: 'JD',
        items: items,
        fruits: [
          { name: 'apple', color: 'red' },
          { name: 'orange', color: 'orange' }
        ] 
      });
    });

  });



  app.post('/people', function(request, response) {
    db.collection('test').insertOne(request.body)
      .then(function() {
        response.redirect('/');
      });
  });


  app.listen(port, function () {
    console.log(`Listening on port ${port}`);
  });

  // client.close();
});



// db.collection('test').insertOne({
//     name: 'JD',
//     age: 38
//   }).then(function() {
//     console.log('worked!');
//   });

  // db.collection('test').find({}).toArray(function(err, items) {
  //   if ( err ) return console.log(err);

  //   console.log(items);
  // })

  // db.collection('test').findOne({'5b1874fe4efc5917ac8c7b28'}).then(function (err, items) {
  //   if (err) return console.log(err);

  //   console.log(err);
  // })
















// `<div>
//   <h1>${someval}</h1>
//   <p>${another}</p>
// </div>`


//'some string' + ' another string ' + ' and one more'