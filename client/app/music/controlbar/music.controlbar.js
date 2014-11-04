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

    this.measures = measuresFactory.currentMeasures;

    this.addMeasures = measuresFactory.addMeasures;

    this.dropdown = function(index) {
      $('.dropdown-menu').eq(index).toggle();
    }
	})
  .factory('measuresFactory', function() {
  	return {
  		currentMeasures: [{currentChord: ' / / / / '}],
  		addMeasures: function() {
  			this.measures.push({currentChord: ' / / / / '})
  		}
  	}
  });