'use strict';

angular.module('musicApp')
	.factory('updateMeasureFactory', function(newChordFactory) {
		return {
			addChord: function(options) {

				var rootNote = options.note,
						rootIndex = options.index,
						type = options.type || null,
						beats = options.beats;

				var newMeasure = [];

				for (var b = 0; b < beats; b++) {
					var newChord = newChordFactory.newChord(rootNote, rootIndex);
					newMeasure.push(newChord);
				}
			return newMeasure;
			},
			addRest: function(beats) {
				var newMeasure = [];
				for (var b = 0; b < beats; b++) {
					var newRest = newChordFactory.newRest();
					newMeasure.push(newRest);
				}
				return newMeasure;
			}
		}
	})