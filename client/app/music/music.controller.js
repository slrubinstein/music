'use strict';

angular.module('musicApp')
  .value('currentHover', {hover:null})
  .value('activeMeasure', {m:null})
  .value('currentChord', {c:null})
  .value('activeBeat', {b:null})
  .controller('MusicCtrl', function ($scope, $http) {
  	var self = this;

    this.play = function(chord) {
      var search = '#' + chord + '-chord'
      if ($(search)[0]) {
        $(search)[0].play();
      }
    }

  })
  .directive('musicRoom', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/templates/music.room.html',
      controller: 'MusicRoomCtrl',
      controllerAs: 'room'
    }
  })
  .factory('musicNotesFactory', function() {
    return {
      notes: ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab',
              'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab',
              'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab']
    }
  })
  .factory('changeTargetFactory', function(newChordRootFactory,
                                                  musicNotesFactory,
                                                  musicChordsFactory,
                                                  chordNotesFactory,
                                                  measuresFactory) {
    return {
      targetMeasure: function(rootNote, rootIndex, measureNumber, beats) {

        var newMeasure = [];

        for (var i = 0; i < beats; i++) {
          var chordObj = newChordRootFactory.newChord(rootNote, rootIndex);
          chordObj.chords = new musicChordsFactory();
          chordNotesFactory.chordNotes(chordObj);
          chordObj.currentroot = rootNote;
          newMeasure.push(chordObj)
        }
        measuresFactory.currentSong[measureNumber] = newMeasure;  
      },
      targetBeat: function(rootNote, rootIndex, measureNumber, beatIndex) {
        var newBeat = newChordRootFactory.newChord(rootNote, rootIndex);
        newBeat.chords = new musicChordsFactory();
        chordNotesFactory.chordNotes(newBeat);
        newBeat.currentroot = rootNote;
        measuresFactory.currentSong[measureNumber].splice(beatIndex, 1, newBeat);
      },
      targetRest: function(measureNumber, beatIndex) {
        var rest = {
          currentChord: '/'
        }
        measuresFactory.currentSong[measureNumber].splice(beatIndex, 1, rest);
      }

    }
  });
