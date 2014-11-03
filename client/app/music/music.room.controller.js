'use strict';

angular.module('musicApp')
  .controller('MusicRoomCtrl', function (musicChordsFactory,
                                         musicNotesFactory,
                                         clickChordFactory) {
    var self = this;
    // this.newRoot = musicChordsFactory;

    this.notes = musicNotesFactory.notes;

    this.root = '';
    this.id;
    this.subs;

    this.pickRoot = function(index) {
      this.root = this.notes[index]
      this.id = index;
      // clickChordFactory.updateMeasure(this.root, sand.measures[sand.measures.length-1])

    }

    this.createChords = function(id) {
      var chordRoot = {};
      chordRoot.chords = new musicChordsFactory;
      chordRoot.root = this.root;
      console.log(chordRoot.chords)
      chordRoot.id = this.id;
      console.log('new chord root', chordRoot)
      this.chordNotes(chordRoot);
      this.subs = chordRoot.chords;
      console.log(this.subs)
    }

    this.chordNotes = function(chordRoot) {
      // chord is the array of nums in each chordRoot.chords
      for (var chord in chordRoot.chords) {
      
      // create a new arr to hold the transformed nums to letters
      var arr = (chordRoot.chords[chord]).map(function(num) {
          num = self.notes[num + chordRoot.id]
          return num;
        })
        // replace the chord of nums with chord of letters in each
        chordRoot.chords[chord] = arr;
      }
      return chordRoot;
    }
  })

  .factory('musicNotesFactory', function() {
    return {
      // each note three times to account for wraparound
      notes: ['A', 'Bb', 'B', 'C', 'C#', 'D', 
              'Eb', 'E', 'F', 'F#', 'G', 'Ab',
              'A', 'Bb', 'B', 'C', 'C#', 'D', 
              'Eb', 'E', 'F', 'F#', 'G', 'Ab',
              'A', 'Bb', 'B', 'C', 'C#', 'D', 
              'Eb', 'E', 'F', 'F#', 'G', 'Ab']

      }
  });
