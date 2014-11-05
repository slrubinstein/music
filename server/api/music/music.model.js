'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MusicSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

var NoteSchema = new Schema({
	keyId: Number,
	octave: Number,
	noteName: String,
	// noteNameSharp: String,
	// noteNameFlat: String,
	frequency: Number
});

var Note = mongoose.model('Note', NoteSchema);

module.exports = {'Note': Note};