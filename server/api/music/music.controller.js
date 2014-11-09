/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /music              ->  index
 * POST    /music              ->  create
 * GET     /music/:id          ->  show
 * PUT     /music/:id          ->  update
 * DELETE  /music/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Music = require('./music.model');
var Note = require('./music.model').Note;
var Standard = require('./music.model').Standard;

// Get list of notes
exports.index = function(req, res) {
  Note.find(function (err, notes) {
    if(err) { return handleError(res, err); }
    notes = _.indexBy(notes, 'keyId');
    return res.json(200, notes);
  });
};

// Get list of standards
exports.showAll = function(req, res) {
  Standard.find(function (err, songs) {
    if(err) { return handleError(res, err); }
    // var titles = songs.title;
    return res.json(200, songs);
  });
};

// Get a single music
exports.show = function(req, res) {
  Music.findById(req.params.id, function (err, music) {
    if(err) { return handleError(res, err); }
    if(!music) { return res.send(404); }
    return res.json(music);
  });
};

// Creates a new music in the DB.
exports.create = function(req, res) {
  Music.create(req.body, function(err, music) {
    if(err) { return handleError(res, err); }
    return res.json(201, music);
  });
};

// Updates an existing music in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Music.findById(req.params.id, function (err, music) {
    if (err) { return handleError(res, err); }
    if(!music) { return res.send(404); }
    var updated = _.merge(music, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, music);
    });
  });
};

// Deletes a music from the DB.
exports.destroy = function(req, res) {
  Music.findById(req.params.id, function (err, music) {
    if(err) { return handleError(res, err); }
    if(!music) { return res.send(404); }
    music.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}