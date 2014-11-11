angular.module('musicApp')
  .factory('musicChordsFactory', function() {
    var MakeChords = function() {
    	// major substitutions
      this.M = {name: 'M', rel: 'I', build: [0, 4, 7], use: 'majorSub'};
      this.maj6 = {name: 'maj6', rel: 'I', build: [0, 4, 7, 9], use: 'majorSub'};
      this.maj7 = {name: 'maj7', rel: 'I', build: [0, 4, 7, 11], use: 'majorSub'};
      this.maj9 = {name: 'maj9', rel: 'I', build: [0, 4, 7, 11, 14], use: 'majorSub'};
      // dominant 7 substitutions
      this['7'] = {name: '7', rel: 'I', build: [0, 4, 7, 10], use: 'D7'};
      this['9'] = {name: '9', rel: 'I', build: [0, 4, 7, 10, 14], use: 'D7'};
      this['7+5'] = {name: '7+5', rel: 'I', build: [0, 4, 8, 10], use: 'D7'};
      this['vii\u00B07'] = {name: '\u00B07', rel: 'vii', build: [-1, 2, 5, 8], use: 'D7'};
      this['\u266fii\u00B07'] = {name: '\u00B07', rel: '\u266fii', build: [3, 6, 9, 12], use: 'D7'};
      this['\u266fIV7'] = {name: '7', rel: '\u266fIV', build: [6, 10, 13, 16], use: 'D7'};
      // minor substitutions
      this.m = {name: 'm', rel: 'I', build: [0, 3, 7], use: 'minorSub'};
      this.m6 = {name: 'm6', rel: 'I', build: [0, 3, 7, 9], use: 'minorSub'};
      this.m7 = {name: 'm7', rel: 'I', build: [0, 3, 7, 10], use: 'minorSub'};
      // tonic substitutions
      this.vim7 = {name: 'm7', rel: 'vi', build: [-3, 0, 4, 7], use: 'tonicSub'};
      this.iiim7 = {name: 'm7', rel: 'iii', build: [4, 7, 11, 14], use: 'tonicSub'};
    }
    return MakeChords;
  })
  .factory('newChordRootFactory', function() {
  	return {
  		newChord: function(rootNote, rootIndex) {
  			var newBeat = {};
	      newBeat.root = rootNote;
	      newBeat.currentChord = 'M';
	      newBeat.id = rootIndex;
	      return newBeat;
	    }
  	}
  })
  .factory('chordNotesFactory', function($http, musicNotesFactory, playerFactory) {
		return {
			chordNotes: function(measure) {

     		$http.get('/api/music').success(function(notes) {
      		
     			measure.forEach(function(chordObj) {

		      	// chord is the array of nums in each chordObj.chords
			      for (var chord in chordObj.chords) {
			      	// rename chord with root (zero index in build property)
			      	var rootIndex = chordObj.id + chordObj.chords[chord].build[0];
			      	if (rootIndex < 0) { 
			      		rootIndex += 12 
			      	}
			      	chordObj.chords[chord].chordroot = musicNotesFactory.notes[rootIndex];
			      	chordObj.chords[chord].frequencies = [];

			      	// find frequency from notes json
			      	// middle A is notes[38] + id + num in build
			      	chordObj.chords[chord].build.forEach(function(num) {
			      		var thisFreq = notes[chordObj.id+num+48].frequency;
			      		chordObj.chords[chord].frequencies.push(thisFreq)
			      	});

				      // create a new arr to hold the transformed nums to letters
				      var arr = (chordObj.chords[chord].build).map(function(num) {
				      	if (num < 0) {
				      		num += 12
				      	}
			          num = musicNotesFactory.notes[num + chordObj.id]
			          return num;
			        })
			        // replace the chord of nums with chord of letters in each
			        chordObj.chords[chord].notes = arr;
			      }
			    })
     		})
				.success(function() {
					playerFactory.playOne(measure[0]);
				})
	      return measure;
	    }
	  }
	})
