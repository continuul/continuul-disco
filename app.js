/* Copyright (c) 2017 e-soa Jacques Desodt, MIT License */
'use strict'

// Prerequisites
const util = require('util')
const bodyParser = require('body-parser')
const config = require('./config/config')
const cors = require('cors')
const express = require('express')
const fs = require('fs')
const handler = require('./handler')
const http = require('http')
const https = require('https')
const store = require('./store')

// Express app
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Default headers
app.use(function (req, res, next) {
  // CORS headers
  // See: https://enable-cors.org/server_expressjs.html
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE')
  res.setHeader('Access-Control-Max-Age', '1000')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  return next()
})

// Enables pre-flight request
app.options('/', cors())

// GET request: gets a current cluster data
app.get('/:id', function (req, res) {
  handler.get(config, store, fs, req, res)
  .then(function (result) {
    return result
  })
})

// POST request: gets a new cluster
app.post('/', function (req, res) {
  handler.postNew(config, store, fs, req, res)
  .then(function (result) {
    return result
  })
})

// POST request: adds a node to the current cluster
app.post('/:id', function (req, res) {
  handler.post(config, store, fs, req, res)
  .then(function (result) {
    return result
  })
})

// DELETE request: removes a node from the current cluster
app.delete('/:id', function (req, res) {
  handler.delete(config, store, fs, req, res)
  .then(function (result) {
    return result
  })
})

// Any other request
app.use(function (req, res, next) {
  handler.methodNotAllowed('Method not allowed', res)
})
// Error handler
app.use(function (err, req, res, next) {
  // Sets locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  handler.badRequest('Bad request', res)
})

// Runs the server on HTTP/S
var server = null
if (config.protocol.startsWith('https')) {
  server = https.createServer(config, app)
} else {
  server = http.createServer(app)
}
// Docker signal handler
process.on('SIGTERM', function() {
  console.log('SIGTERM');
  server.close(function() {
    process.exit();
  })
})
process.on('SIGINT', function () {
  console.log('SIGINT');
  server.close(function() {
    process.exit();
  })
})
// Start listener
server.listen(config.port, function () {
  var version = require('./package.json').version
  console.log('Continuul Cluster Discovery Service',
    '\n     Version: ', util.format('\'%s\'', version),
    '\n Client Addr: ', util.format('%s://localhost:%s', config.protocol, config.port)
    )
})

