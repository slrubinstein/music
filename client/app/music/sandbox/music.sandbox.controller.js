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
                                            updateChordFactory) {

    this.song = measuresFactory.currentSong;
    this.substitutions = [];

    this.dropdown = function(index) {
      if (this.song[index].chords) {
        $('.dropdown-menu').eq(index).toggle();
        activeMeasure.m = this.song[index]
        this.substitutions = this.song[index].chords;
      }
    }

    this.updateChord = updateChordFactory.update;

    this.deleteCurrentMeasure = function(index) {
      this.song.splice(index, 1);
    }
  })
  .factory('updateChordFactory', function(activeMeasure, musicNotesFactory) {
    return {
      update:function(index, name, chordroot) {
        activeMeasure.m.currentChord = name;
        $('.dropdown-menu').eq(this.song.indexOf(activeMeasure.m)).toggle();
        activeMeasure.m.currentroot = chordroot;
        activeMeasure.m = null;
      }
    }
  })
  // .directive('deleteable', function($document, currentHover) {
  //   return function(scope, element, attr) {

  //     element.on('mouseover', function(event) {
  //       event.preventDefault();
  //     });
  //     element.on('mouseleave', function(event) {
  //       event.preventDefault();
  //       currentHover.hover = null;
  //     })
  //   }
  // });
