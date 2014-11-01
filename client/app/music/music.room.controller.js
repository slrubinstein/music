'use strict';

angular.module('musicApp')
  .controller('MusicRoomCtrl', function (musicChordsFactory,
                                         musicNotesFactory) {
    var self = this;
    this.newRoot = musicChordsFactory;

    this.notes = musicNotesFactory.notes;

    this.root = '';
    this.id;
    this.subs;

    this.pickRoot = function(index) {
      this.root = this.notes[index]
      this.id = index;
    }

    this.createChords = function(id) {
      var chordRoot = {};
      chordRoot.chords = this.newRoot;
      chordRoot.root = this.root;
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
  .factory('musicChordsFactory', function() {
    var newRoot = {};
    newRoot.majorTriad = [0, 4, 7];
    newRoot.maj6 = [0, 4, 7, 9];
    newRoot.maj7 = [0, 4, 7, 11];
    newRoot.minorTriad = [0, 3, 7];
    newRoot.m6 = [0, 3, 7, 9];
    newRoot.m7 = [0, 3, 7, 10];
    newRoot.vim7 = [9, 0, 4, 7];
    newRoot.iiim7 = [4, 7, 11, 2];   
    return newRoot;
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
