angular.module('musicApp')
  .factory('musicChordsFactory', function() {
    var MakeChords = function() {
    	// major substitutions
      this.M = {name: 'M', rel: 'I', build: [0, 4, 7]};
      this.maj6 = {name: 'maj6', rel: 'I', build: [0, 4, 7, 9]};
      this.maj7 = {name: 'maj7', rel: 'I', build: [0, 4, 7, 11]};
      this.maj9 = {name: 'maj9', rel: 'I', build: [0, 4, 7, 11, 14]}
      // dominant 7 substitutions
      this['7'] = {name: '7', rel: 'I', build: [0, 4, 7, 10]};
      this['9'] = {name: '9', rel: 'I', build: [0, 4, 7, 10, 14]}
      this['7+5'] = {name: '7+5', rel: 'I', build: [0, 4, 8, 10]};
      // minor substitutions
      this.m = {name: 'm', rel: 'I', build: [0, 3, 7]};
      this.m6 = {name: 'm6', rel: 'I', build: [0, 3, 7, 9]};
      this.m7 = {name: 'm7', rel: 'I', build: [0, 3, 7, 10]};
      // relative minor substitutions
      this.vim7 = {name: 'm7', rel: 'vi', build: [-3, 0, 4, 7]};
      this.iiim7 = {name: 'm7', rel: 'iii', build: [4, 7, 11, 14]};
    }
    return MakeChords;
  })
  .factory('newChordRootFactory', function() {
  	return {
  		newChord: function(rootNote, rootIndex) {
  			var newMeasure = {};
	      newMeasure.root = rootNote;
	      newMeasure.currentChord = 'M';
	      newMeasure.id = rootIndex;
	      return newMeasure;
	    }
  	}
  })
  .factory('chordNotesFactory', function($http, musicNotesFactory, playerFactory) {
		return {
			chordNotes: function(chordObj) {

     		$http.get('/api/music').success(function(notes) {
      		
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
				.success(function() {
					console.log(chordObj)
					playerFactory.playOne(chordObj, 'M');
				})
	      return chordObj;
	    }
	  }
	})
