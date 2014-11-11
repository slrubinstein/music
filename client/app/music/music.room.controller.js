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

    }

    this.createChords = function(id) {
      var chordRoot = {};
      chordRoot.chords = new musicChordsFactory();
      chordRoot.root = this.root;
      chordRoot.id = this.id;
      this.chordNotes(chordRoot);
      this.subs = chordRoot.chords;
    }
  })

