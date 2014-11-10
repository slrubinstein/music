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
                                            playerFactory,
                                            currentChord,
                                            droppableFactory) {

    this.song = measuresFactory.currentSong;
    this.substitutions = [];
    var self = this;
    this.setDroppable = droppableFactory.droppable;

    this.setDroppable();


    $scope.nums = [1,2,3]
    $scope.add = function(num) {

      $scope.nums.push(num)
    }


    this.dropdown = function(event, songIndex, beatIndex) {
      if (this.song[songIndex].chords) {
        console.log('event', $(event.target).next())
        $(event.target).next().toggle();

        activeMeasure.m = this.song[songIndex]
        this.substitutions = this.song[songIndex].chords;
      }
    }

    this.updateChord = function(name, chordroot, event) {
      playerFactory.playExample([activeMeasure.m.chords[name]])
      updateChordFactory.update(name, chordroot, event);
    }

    this.deleteCurrentMeasure = function(index) {
      this.song.splice(index, 1);
    }
    
  })
  .factory('updateChordFactory', function(activeMeasure, musicNotesFactory) {
    return {
      update:function(chordName, chordroot, event) {
        activeMeasure.m.currentChord = chordName;
        $(event.target).closest('.dropdown-menu').toggle();
        activeMeasure.m.currentroot = chordroot;
        activeMeasure.m = null;
        
      }
    }
  })
  .factory('droppableFactory', function(currentChord, changeTargetMeasureFactory) {
    return {
      droppable: function() {

        setTimeout(function() {

          $( ".droppable" ).droppable({
            over: function() {
              console.log('over')
            },
            drop: function(event, ui) {
              var note = ui.draggable.text()
              var index = ui.draggable.index()
              var measureNumber = event.target.id.slice(4);
              changeTargetMeasureFactory.targetMeasure(note, index, measureNumber);

            }
          })
        })
      }
    }
  })    