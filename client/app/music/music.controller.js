'use strict';

angular.module('musicApp')
  // various values to track movements on the page, what chords are selected,
  // what measure and beat is currently active
  .value('activeMeasure', {m:null})
  .value('currentChord', {c:null})
  .value('activeBeat', {b:null})
  .factory('musicNotesFactory', function() {
    return {
      // 3 octaves of notes to reference as chords are built
      notes: ['A', 'B\u266d', 'B', 'C', 'C\u266f', 'D', 'E\u266d', 'E', 'F', 'F\u266f', 'G', 'A\u266d',
              'A', 'B\u266d', 'B', 'C', 'C\u266f', 'D', 'E\u266d', 'E', 'F', 'F\u266f', 'G', 'A\u266d',
              'A', 'B\u266d', 'B', 'C', 'C\u266f', 'D', 'E\u266d', 'E', 'F', 'F\u266f', 'G', 'A\u266d']
    }
  })
  .factory('changeTargetFactory', function(newChordRootFactory, musicNotesFactory,
                                           musicChordsFactory, chordNotesFactory,
                                           measuresFactory, playerFactory) {
    return {
      targetMeasure: function(rootNote, rootIndex, measureNumber, beats) {

        var newMeasure = [];

        for (var i = 0; i < beats; i++) {
          var chordObj = newChordRootFactory.newChord(rootNote, rootIndex);
          chordObj.chords = new musicChordsFactory();
          chordObj.currentroot = rootNote;
          newMeasure.push(chordObj)
        }
        newMeasure = chordNotesFactory.chordNotes(newMeasure);
        measuresFactory.currentSong[measureNumber] = newMeasure;  
      },
      targetBeat: function(rootNote, rootIndex, measureNumber, beatIndex) {
        var newBeat = newChordRootFactory.newChord(rootNote, rootIndex);
        newBeat.chords = new musicChordsFactory();
        chordNotesFactory.chordNotes([newBeat]);
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
