'use strict';

angular.module('musicApp')
  .value('currentHover', {hover:null})
  .value('activeMeasure', {m:null})
  .value('currentChord', {c:null})
  .value('activeBeat', {b:null})
  .controller('MusicCtrl', function ($scope, $http) {
  	var self = this;

  })
  .filter('accidentals', function() {
    return function(input) {
      if (input.slice(1)=== "flat") {
        var str = input.slice(0,1) + String.fromCharCode(9837);
        return str;
      }
      if (input.slice(1)=== "sharp") {
        var str = input.slice(0,1) + String.fromCharCode(9839);
        return str;
      }
      return input;
    }
  })
  .factory('musicNotesFactory', function() {
    return {
      notes: ['A', 'B\u266d', 'B', 'C', 'C\u266f', 'D', 'E\u266d', 'E', 'F', 'F\u266f', 'G', 'A\u266d',
              'A', 'B\u266d', 'B', 'C', 'C\u266f', 'D', 'E\u266d', 'E', 'F', 'F\u266f', 'G', 'A\u266d',
              'A', 'B\u266d', 'B', 'C', 'C\u266f', 'D', 'E\u266d', 'E', 'F', 'F\u266f', 'G', 'A\u266d']
    }
  })
  .factory('changeTargetFactory', function(newChordRootFactory,
                                                  musicNotesFactory,
                                                  musicChordsFactory,
                                                  chordNotesFactory,
                                                  measuresFactory,
                                                  playerFactory) {
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
        // playerFactory.playOne(newMeasure[0], 'M');
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
