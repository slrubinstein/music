angular.module('musicApp')
  .value('currentChord', {chord:null, rootIndex:null})
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
                                        currentChord) {
    var self = this;
    
    this.root = '';
    this.notes = musicNotesFactory.notes;
    this.song = measuresFactory.currentSong;
    this.majorNumerals = romanNumeralsFactory.major;
    this.minorNumerals = romanNumeralsFactory.minor;
    this.currentChord = currentChord;
    this.recreateNotes = function() {
      return $scope.notes;
    }

    this.chordMouseDown = function(index) {
      this.currentChord.chord = this.notes[index];
      this.currentChord.rootIndex = index;
      console.log(self.notes[index])
      console.log('current chord', this.currentChord)
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