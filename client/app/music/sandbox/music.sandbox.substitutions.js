angular.module('musicApp')
  .factory('musicChordsFactory', function() {
    var MakeChords = function() {
      this.majorTriad = {name: '', build: [0, 4, 7]};
      this.maj6 = {name: '', build: [0, 4, 7, 9]};
      this.maj7 = {name: '', build: [0, 4, 7, 11]};
      this.minorTriad = {name: '', build: [0, 3, 7]};
      this.m6 = {name: '', build: [0, 3, 7, 9]};
      this.m7 = {name: '', build: [0, 3, 7, 10]};
      this.vim7 = {name: '', build: [9, 0, 4, 7]};
      this.iiim7 = {name: '', build: [4, 7, 11, 2]};   
    }
    return MakeChords;
  })
  .factory('newChordRootFactory', function() {
  	return {
  		newChord: function(self) {
  			var chordRoot = {};
	      chordRoot.root = self.root;
	      chordRoot.id = self.id;
	      return chordRoot;
	    }
  	}
  })
  .factory('chordNotesFactory', function() {
		return {
			chordNotes: function(chords, id, root, self) {
	      // chord is the array of nums in each chordObj.chords
	      for (var chord in chords) {
	      	// rename chord with root (zero index in build property)
	      	var chordroot = self.notes[id + chords[chord].build[0]]
	      	chords[chord].name = chordroot + ' ' + chord;
		      // create a new arr to hold the transformed nums to letters
		      var arr = (chords[chord].build).map(function(num) {
	          num = self.notes[num + id]
	          return num;
	        })
	        
	        // replace the chord of nums with chord of letters in each
	        chords[chord].build = arr;
	      }
	      return chords;
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
				// console.log(chordObj.chords)
				return chordObj;
			}
		}
	});