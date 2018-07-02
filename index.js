const http = require("http");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const trips = require('./routes/trips');

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//create app server
const server = app.listen(3000,  "127.0.0.1", function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port)
});

app.use('/trips', trips);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Not Found')
    error.status = 404;
    next(error);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});
