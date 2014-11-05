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
                                        renameChords,
                                        romanNumeralsFactory) {
    var self = this;
    
    this.root = '';
    this.notes = musicNotesFactory.notes;
    this.song = measuresFactory.currentMeasures;
    this.majorNumerals = romanNumeralsFactory.major;
    this.minorNumerals = romanNumeralsFactory.minor;

    this.recreateNotes = function() {
      return $scope.notes;
    }

    this.clickNumerals = function(index) {

    }

    this.clickChord = function(index) {
      this.root = self.notes[index];
      this.id = index;

      var measureObj = newChordRootFactory.newChord(this);
      measureObj.chords = new musicChordsFactory();
      measureObj.chords = chordNotesFactory.chordNotes(measureObj.chords, measureObj.id, measureObj. root, this);
      this.song[this.song.length-1] = measureObj;
    }
  })
  .factory('romanNumeralsFactory', function() {
    return {
      major: ['I', 'ii', 'iii', 'iv', 'V', 'vi', 'vii'],
      minor: ['i', 'ii', 'III', 'iv', 'V', 'vi', 'VII']
    }
  })