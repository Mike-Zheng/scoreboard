
const express = require('express');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express();

const server = require('http').Server(app);



// Body Parser Middleware
app.use(bodyParser.json()); // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Middleware
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
});


app.use("/", express.static(__dirname + '/dist'));

server.listen(11111);

console.log("ScoreBoard server start! at port " + 11111);
