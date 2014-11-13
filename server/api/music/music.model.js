'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StandardSchema = new Schema({
  title: String,
  song: Array,
  tempo: Number,
  beatsPerMeasure: Number
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
var Standard = mongoose.model('Standard', StandardSchema)

module.exports = {'Note': Note, 'Standard': Standard};