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

    this.song = measuresFactory.currentSong;
    this.substitutions = [];
    var self = this;
    this.setDroppable = droppableFactory.droppable;

    this.setDroppable();

    this.dropdown = function(event, songIndex, beatIndex) {
      if (this.song[songIndex][beatIndex].chords) {
        $(event.target).next().toggle();
        activeMeasure.m = this.song[songIndex];
        this.substitutions = this.song[songIndex][beatIndex].chords;
      }
    }

    this.updateChord = function(name, chordroot, event, beatIndex) {
      console.log('active beat', activeMeasure.m[beatIndex])
      playerFactory.playOne(activeMeasure.m[beatIndex].chords[name])
      updateChordFactory.update(name, chordroot, event, beatIndex);
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
        activeMeasure.m = null;
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
              var beatIndex = $(event.target).parent().index()
              var note = ui.draggable.text()
              // subtracting 1 from index to account for rest measure
              var index = ui.draggable.index() - 1;
              var measureNumber = $(event.target).closest('.measure').attr('id').slice(4);
              changeTargetFactory.targetBeat(note, index, measureNumber, beatIndex);
            }
          })
        })
      }
    }
  })    