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
                                            playerFactory) {

    this.song = measuresFactory.currentSong;
    this.substitutions = [];
    var self = this;

    this.dropdown = function(index) {
      if (this.song[index].chords) {
        $('.dropdown-menu').eq(index).toggle();
        activeMeasure.m = this.song[index]
        this.substitutions = this.song[index].chords;
      }
    }

    this.updateChord = function(index, name, chordroot) {
      console.log(activeMeasure.m.chords[name])
      playerFactory.playExample([activeMeasure.m.chords[name]])
      updateChordFactory.update(index, name, chordroot, self);
    }

    this.deleteCurrentMeasure = function(index) {
      this.song.splice(index, 1);
    }
  })
  .factory('updateChordFactory', function(activeMeasure, musicNotesFactory) {
    return {
      update:function(index, name, chordroot, self) {
        activeMeasure.m.currentChord = name;
        $('.dropdown-menu').eq(self.song.indexOf(activeMeasure.m)).toggle();
        activeMeasure.m.currentroot = chordroot;
        activeMeasure.m = null;
      }
    }
  })