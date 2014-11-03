'use strict';

angular.module('musicApp')
  .controller('MusicRoomCtrl', function (musicChordsFactory,
                                         musicNotesFactory) {
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
      chordRoot.chords = new musicChordsFactory();
      chordRoot.root = this.root;
      console.log(chordRoot.chords)
      chordRoot.id = this.id;
      console.log('new chord root', chordRoot)
      this.chordNotes(chordRoot);
      this.subs = chordRoot.chords;
      console.log(this.subs)
    }
  })

