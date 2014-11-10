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
      this.minorTriad = {name: 'm', rel: 'I', build: [0, 3, 7]};
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
  .factory('chordNotesFactory', function($http, musicNotesFactory) {
		return {
			chordNotes: function(measureObj) {

     		$http.get('/api/music', {}).success(function(notes) {
      		
	      	// chord is the array of nums in each chordObj.chords
		      for (var chord in measureObj.chords) {
		      	// rename chord with root (zero index in build property)
		      	measureObj.chords[chord].chordroot = musicNotesFactory.notes[measureObj.id + measureObj.chords[chord].build[0]]
		      	measureObj.chords[chord].frequencies = [];

		      	// find frequency from notes json
		      	// middle A is notes[38] + id + num in build
		      	measureObj.chords[chord].build.forEach(function(num) {
		      		var thisFreq = notes[measureObj.id+num+48].frequency;
		      		measureObj.chords[chord].frequencies.push(thisFreq)
		      	});
			      // create a new arr to hold the transformed nums to letters
			      var arr = (measureObj.chords[chord].build).map(function(num) {
		          num = musicNotesFactory.notes[num + measureObj.id]
		          return num;
		        })
		        // replace the chord of nums with chord of letters in each
		        measureObj.chords[chord].notes = arr;
		      }
		    })
	      return measureObj;
	    }
	  }
	})
	.factory('renameChords', function() {
		return {
			rename: function(chordObj, self) {
				// give subs names based on first index in chord structure
				for (name in chordObj.chords) {
					var oldName = name;
					name = self.notes[chordObj.chords[name][0]] + ' ' + name;
				}
				return chordObj;
			}
		}
	})
	