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
                                            measuresFactory) {

    this.measures = measuresFactory.currentMeasures;
    this.substitutions = [];

    this.dropdown = function(index) {
      $('.dropdown-menu').eq(index).toggle();
      this.substitutions = this.measures[index].chords;
    }
  });
