'use strict';

angular.module('musicApp')
    .directive('musicSandbox', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/music/sandbox/music.sandbox.html',
        controller: 'MusicSandboxCtrl',
        controllerAs: 'sand'
    }
  })
  .controller('MusicSandboxCtrl', function ($scope, measuresFactory, 
                                            activeMeasure, currentHover,
                                            updateChordFactory,
                                            playerFactory, currentChord,
                                            activeBeat, droppableFactory) {

    var self = this;
    this.song = measuresFactory.currentSong;
    this.substitutions = [];
    this.setDroppable = droppableFactory.droppable;

    this.setDroppable();

    this.dropdown = function(event, songIndex, beatIndex) {
      if (this.song[songIndex][beatIndex].chords) {
        console.log(event.target)
        $($(event.target).children()[0]).toggle();
        activeMeasure.m = this.song[songIndex];
        this.substitutions = this.song[songIndex][beatIndex].chords;
      }
    }

    this.updateChord = function(name, chordroot, event, beatIndex) {
      updateChordFactory.update(name, chordroot, event, beatIndex);
      playerFactory.playOne(activeMeasure.m[beatIndex], name);
      activeMeasure.m = null;
    }

    this.deleteCurrentMeasure = function(index) {
      this.song.splice(index, 1);
    }
    
  })
  .factory('updateChordFactory', function(activeMeasure, musicNotesFactory) {
    return {
      update:function(chordName, chordroot, event, beat) {
        activeMeasure.m[beat].currentChord = chordName;
        activeMeasure.m[beat].currentroot = chordroot;
        $(event.target).closest('.dropdown-menu').toggle();
        
      }
    }
  })
  .factory('droppableFactory', function(currentChord, changeTargetFactory) {
    return {
      droppable: function() {
        setTimeout(function() {
          $( ".droppable" ).droppable({
            accept: '.draggable',
            drop: function(event, ui) {
              console.log($(event.target).index())
              var beatIndex = $(event.target).index()
              var note = ui.draggable.text()
              // subtracting 1 from index to account for rest measure
              var index = ui.draggable.index() - 1;
              var measureNumber = $(event.target).closest('.measure').attr('id').slice(4);

              if (ui.draggable.attr('id') === 'rest') {
                changeTargetFactory.targetRest(measureNumber, beatIndex)
              }
              else {
                changeTargetFactory.targetBeat(note, index, measureNumber, beatIndex);
              }
            }
          })
        })
      }
    }
  })    