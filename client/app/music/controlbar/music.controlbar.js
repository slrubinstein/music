angular.module('musicApp')
  .directive('controlbar', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/music/controlbar/music.controlbar.html',
        controller: 'ControlbarCtrl',
        controllerAs: 'controlbar'
    }
  })
    .controller('ControlbarCtrl', function ($scope, chordBuilder, measuresFactory) {

    // this.measures = ['/ / / /'];

    // this.addMeasures = function() {
    //     this.measures.push('/ / / /')
    // }

    this.measures = measuresFactory.currentMeasures;

    this.addMeasures = measuresFactory.addMeasures;

    this.dropdown = function(index) {
      $('.dropdown-menu').eq(index).toggle();
    }

    this.substitutions = [1, 2, 3, 4];
    this.chords = chordBuilder.chords

    this.measureNumber = [];
	})
  .factory('measuresFactory', function() {
  	return {
  		currentMeasures: [{root: ' / / / / '}],
  		addMeasures: function() {
  			this.measures.push({root: ' / / / / '})
  		}
  	}
  });