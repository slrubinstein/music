angular.module('musicApp')
  .directive('musicSidebar', function() {
  	return {
  		restrict: 'E',
  		templateUrl: 'app/music/sidebar/music.sidebar.html',
  		controller: 'SidebarCtrl',
  		controllerAs: 'sidebar'
  	}
  })
  .controller('SidebarCtrl', function ($scope, musicChordsFactory,
                                        musicNotesFactory,
                                        measuresFactory,
                                        newChordRootFactory,
                                        chordNotesFactory,
                                        renameChords) {
    var self = this;
    
    this.root = '';
    this.notes = musicNotesFactory.notes;
    this.measures = measuresFactory.currentMeasures;

    this.recreateNotes = function() {
      return $scope.notes;
    }

    this.clickChord = function(index) {
      this.root = self.notes[index];
      this.id = index;

      var measureObj = newChordRootFactory.newChord(this);
      measureObj.chords = new musicChordsFactory();
      measureObj.chords = chordNotesFactory.chordNotes(measureObj.chords, measureObj.id, measureObj. root, this);
      this.measures[this.measures.length-1] = measureObj;
    }
  })
