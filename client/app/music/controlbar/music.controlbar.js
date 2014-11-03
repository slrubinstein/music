angular.module('musicApp')
  .directive('controlbar', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/music/controlbar/music.controlbar.html',
        controller: 'ControlbarCtrl',
        controllerAs: 'controlbar'
    }
  })
    .controller('ControlbarCtrl', function ($scope, buildSubsFactory, chordBuilder) {

    this.measures = ['/ / / /'];

    this.addMeasures = function() {
        this.measures.push('/ / / /')
    }

    this.dropdown = function(index) {
      $('.dropdown-menu').eq(index).toggle();
    }

    this.substitutions = [1, 2, 3, 4];
    this.chords = chordBuilder.chords

    this.measureNumber = [];
  });