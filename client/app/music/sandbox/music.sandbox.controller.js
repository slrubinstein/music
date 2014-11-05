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
                                            measuresFactory, activeMeasure,
                                            currentHover) {

    this.song = measuresFactory.currentMeasures;
    this.substitutions = [];

    this.dropdown = function(index) {
      if (this.song[index].chords) {
        $('.dropdown-menu').eq(index).toggle();
        activeMeasure.m = this.song[index]
        this.substitutions = this.song[index].chords;
      }
    }

    this.updateChord = function(index, name, chordroot) {   
      activeMeasure.m.currentChord = chordroot + name;
      $('.dropdown-menu').eq(this.song.indexOf(activeMeasure.m)).toggle();
      activeMeasure.m = null;
    }
  })
  .directive('deleteable', function($document, currentHover) {
    return function(scope, element, attr) {

      element.on('mouseover', function(event) {
        event.preventDefault();
        // console.log('hovering', currentHover)
      });
      element.on('mouseleave', function(event) {
        event.preventDefault();
        currentHover.hover = null;
        // element.removeClass('mouse-over');
      })
    }
  });
