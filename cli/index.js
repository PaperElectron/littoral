#!/usr/bin/env node
var app = require('commander');
var path = require('path')
var packageVersion = require(path.join(__dirname, '../', 'package.json')).version;

app
  .version(packageVersion)
  .option('[path]', 'Specify path for theme and route files. Default is ~/.littoral');

app.parse(process.argv);

require(path.join(__dirname, '../', 'index.js'))