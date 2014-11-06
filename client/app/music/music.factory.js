// 'use strict';

// angular.module('musicApp')
// 	.factory('chordBuilder', function() {
// 		return {
// 			// chords: [{
// 			// 	majorSubs: {
// 			// 		majorTriad: [0, 4, 7],
// 			// 		majorSix: [0, 4, 7, 9],
// 			// 		majorSeven: [0, 4, 7, 11]},
// 			// 	}, {
// 			// 	minorSubs: {
// 			// 		minorTriad: [0, 3, 7],
// 			// 		minorSix: [0, 3, 7, 9],
// 			// 		minorSeven: [0, 3, 7, 10]
// 			// 	}

// 			// }],

// 			chords: [{
//   			type: 'minor', build: [0, 3, 7]
//   		}, {
//   			type: 'major', build: [0, 4, 7]
//   		}, {
//   			type: 'dominant7', build: [0, 4, 7, 10]
// 	  	}, {
//   			type: 'minor7', build: [0, 3, 7, 10]
//   		}],

// 			buildChord: function(root, chordIndex, notes) {
// 	  		var chordNotes = '';

// 	  		var chordType = this.chords[chordIndex].type;
// 	  		this.chord = this.root + ' ' + chordType;

// 	 			// push current root into current notes
// 	  		var currentNotes = [];
// 	  		// currentNotes.push(root);

// 	  		// get intervals for chord
// 	  		var intervals = this.chords[chordIndex].build;

// 	  		// push notes into currentNotes based on chord build
// 	  		intervals.forEach(function(i) {
// 	  			var intv = self.id + i;
// 	  			if (intv > 11) {
// 	  				intv -= 12;
// 	  			}
// 	  			currentNotes.push(notes[intv]);
// 	  		});

// 	  		currentNotes.forEach(function(n) {  			
// 	  			self.chordNotes = self.chordNotes + ' ' + n;  		
// 	  		})
// 	  		return 
//   		},

//   		noteNames: function(root, chord) {

//   		}
// 		}
// 	});