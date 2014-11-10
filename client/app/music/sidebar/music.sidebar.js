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
                                        romanNumeralsFactory,
                                        currentChord, droppableFactory) {
    var self = this;
    $scope.tests = [1, 2]
    this.root = '';
    this.notes = musicNotesFactory.notes;
    this.song = measuresFactory.currentSong;
    this.majorNumerals = romanNumeralsFactory.major;
    this.minorNumerals = romanNumeralsFactory.minor;

    this.recreateNotes = function() {
      return $scope.notes;
    }

    this.showSong = function() {
      console.log('Current Song: ', this.song)
    }

    this.clickChord = function(index) {
      this.root = self.notes[index];
      this.id = index;

      var measureObj = newChordRootFactory.newChord(this);
      measureObj.chords = new musicChordsFactory();
      measureObj.chords = chordNotesFactory.chordNotes(measureObj.chords, measureObj.id, measureObj. root, this);
      this.song[this.song.length-1] = measureObj;
    }

    setTimeout(function() {
      droppableFactory.droppable();
      }), 0
    }) 
  
  .factory('romanNumeralsFactory', function() {
    return {
      major: ['I', 'ii', 'iii', 'iv', 'V', 'vi', 'vii'],
      minor: ['i', 'ii', 'III', 'iv', 'V', 'vi', 'VII']
    }
  })