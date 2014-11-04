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
  .controller('MusicSandboxCtrl', function ($scope, chordBuilder, 
                                            measuresFactory, activeMeasure) {

    this.measures = measuresFactory.currentMeasures;
    this.substitutions = [];

    this.dropdown = function(index) {
      $('.dropdown-menu').eq(index).toggle();
      activeMeasure.m = this.measures[index]
      this.substitutions = this.measures[index].chords;
    }

    this.updateChord = function(index, name, chordroot) {   
      activeMeasure.m.currentChord = chordroot + name;
      $('.dropdown-menu').eq(this.measures.indexOf(activeMeasure.m)).toggle();
      activeMeasure.m = null;
    }
  });
