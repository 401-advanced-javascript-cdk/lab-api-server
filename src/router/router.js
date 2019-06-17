'use strict';

const express = require('express');
const router = express.Router();

const Files = require('../models/files.js');
const files = new Files();

const QClient = require('@nmq/q/client');

router.get('/files', getFiles);
router.post('/files', postFiles);
router.get('/files/:id', getOneFile);
router.put('/files/:id', putFiles);
router.delete('/files/:id', deleteFiles);

function getFiles(request,response,next) {
  files.get()
    .then( data => {
      QClient.publish('database', 'read', `Read all: \n${data}`);
      response.status(200).send(data);
    })
    .catch(next);
}

function getOneFile(request,response,next) {
  files.get(request.params.id)
    .then( result => {
      QClient.publish('database', 'read' `Read One: \n${result}`)
      response.status(200).json(result) 
    })
    .catch(next);
}

function postFiles(request,response,next) {
  files.post(request.body)
    .then( result => {
      QClient.publish('database', 'create', `Create: \n${result}`);
      response.status(200).json(result) 
    })
    .catch(next);
}

function putFiles(request,response,next) {
  files.put(request.params.id, request.body)
    .then( result => {
      QClient.publish('database', 'update', `Update: \n${result}`)
      response.status(200).json(result) 
    })
    .catch(next);
}

function deleteFiles(request,response,next) {
  files.delete(request.params.id)
    .then( result => {
      QClient.publish('database', 'delete', `Delete: \n${result}`)
      response.status(200).json(result) 
    })
    .catch(next);
}

module.exports = router;