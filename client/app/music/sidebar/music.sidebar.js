angular.module('musicApp')
	.controller('SidebarCtrl', function ($scope) {
  	var self = this;

  	$scope.notes = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab']
  	this.recreateNotes = function() {
  		return $scope.notes;
  	}

  	this.clickChord = function(i) {
  		this.root = $scope.notes[i];
  		this.id = i;
    //   this.play(this.root);
  	}
  })

  .directive('musicSidebar', function() {
  	return {
  		restrict: 'E',
  		templateUrl: 'app/music/sidebar/music.sidebar.html',
  		controller: 'SidebarCtrl',
  		controllerAs: 'sidebar'
  	}
  })