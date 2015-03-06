var express = require('express');
var http = require('http');
var appSettings = require('./helpers').getAppSettings();
var app = express();

var expressConfig = require('./expressConfig')(app);
var expressRoutes = require('./expressRoutes')(app);
var dynamicRoutes = require('./routeLoader')(app);
var server = http.createServer(app);

var port = appSettings.settings.server.port
server.listen(port, function serverStarted(){
  console.log('Started server on port ' + port)
});
