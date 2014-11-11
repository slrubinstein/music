angular.module('musicApp')
  .directive('musicSidebar', function() {
  	return {
  		restrict: 'E',
  		templateUrl: 'app/music/sidebar/music.sidebar.html',
  		controller: 'SidebarCtrl',
  		controllerAs: 'sidebar'
  	}
  })
  .value('instructions', {
    addChord: false,
    changeChord: false,
    changeSubstitution: false
  })
  .controller('SidebarCtrl', function ($scope, musicChordsFactory,
                                        musicNotesFactory,
                                        measuresFactory,
                                        newChordRootFactory,
                                        chordNotesFactory, instructions,
                                        currentChord, droppableFactory) {
    var self = this;
    this.root = '';
    this.notes = musicNotesFactory.notes;
    this.song = measuresFactory.currentSong;

    // instructions checker
    this.instructions = instructions;


    this.recreateNotes = function() {
      return $scope.notes;
    }

    this.showSong = function() {
      console.log('Current Song: ', this.song)
    }
  });
  