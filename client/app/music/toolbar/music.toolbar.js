angular.module('musicApp')
  .value('dragging', {drag: false})
  .directive('toolbar', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/music/toolbar/music.toolbar.html',
        controller: 'ToolbarCtrl',
        controllerAs: 'toolbar'
    }
  })
  .controller('ToolbarCtrl', function ($scope, measuresFactory,
                                          saveSongFactory, Auth,
                                          findAllSongsFactory, playerFactory,
                                          musicNotesFactory,
                                          changeTargetFactory,
                                          loadSongFactory, dragging,
                                          findAllStandardsFactory,
                                          droppableFactory,
                                          instructions) {
    var self = this;
    this.song = measuresFactory.currentSong;
    this.songTitle = '';
    this.tempo = 120;
    this.beatsPerMeasure = 4;

    this.notes = musicNotesFactory.notes;
    this.standards = [];
    this.selectStandard;
    this.instructions = instructions;

    this.addMeasures = measuresFactory.addMeasures;

    this.currentUser = Auth.getCurrentUser;

    this.userSongs = [];

    this.mySong = '';

    this.discardSong = measuresFactory.discardSong;

    // $('#q-mark').


    this.tempoUp = function() {
      this.tempo += 4;
    }
    this.tempoDown = function() {
      this.tempo -= 4;
    }


    if (this.currentUser()._id) {
      findAllSongsFactory.find(this.currentUser()._id, self);
    }

    findAllStandardsFactory.find(self);

    this.addRest = function() {
      if (!dragging.drag) {
        this.addMeasures(this.beatsPerMeasure);
      }
    }
    this.addChordMeasure = function(note, index) {
      this.instructions.addChord = true;
      if (!dragging.drag) {
        this.addMeasures();
        var measureNumber = this.song.length - 1;
        changeTargetFactory.targetMeasure(note, index, measureNumber, this.beatsPerMeasure);
        droppableFactory.droppable();
      }
    }

    this.play = function() {
      playerFactory.playSong(this.song, this.tempo); 
    }

    this.saveSong = function() {
      this.song.title = this.songTitle;
      saveSongFactory.save(this.song, this.song.title, this.currentUser()._id, self);
    }

    this.loadMySong = function() {
      this.discardSong(this);
      loadSongFactory.load(this.currentUser()._id, this.mySong, self);
    }

    setTimeout(function() {
      $(function() {
        $('.draggable').draggable({
          revert: 'invalid',
          cursor: 'grabbing',
          helper: 'clone',
          zIndex: 10,
          start: function(event) {
            // reset .droppables to be droppable
            droppableFactory.droppable();
            dragging.drag = true;
          },
          stop: function() {
            dragging.drag = false;
          },
          revertDuration: 200
        });
      }), 0}) 

  })
  .factory('measuresFactory', function() {
    return {
      currentSong: [],
      addMeasures: function(beats) {
        var measure = [];
        for (var i = 0; i < beats; i++) {
          measure.push({currentChord: '/'});
        }
        this.song.push(measure);
      },
      discardSong: function(self) {
        this.song.length = 0;
      }
    }
  })
  .factory('saveSongFactory', function($http, findAllSongsFactory) {
    return {
      save: function(song, title, userId, self) {
        $http.post('/api/users/'+userId+'/newsong', { song: song, title: title })
        .success(function() {
          self.userSongs = [];
          findAllSongsFactory.find(userId, self);
        });
      }
    }
  })
  .factory('findAllSongsFactory', function($http) {
    return {
      find: function(userId, self) {
        $http.get('/api/users/'+userId+'/findallsongs')
        .success(function(data) {
          data.forEach(function(song) {
            self.userSongs.push(song.title);
          });
        })
        .error(function() {
          console.log("err");
        });
      }
    }
  })
  .factory('loadSongFactory', function($http) {
    return {
      load: function(userId, title, self) {
        $http.get('/api/users/'+userId+'/title/'+title)
        .success(function(data) {
          data.song.forEach(function(measure) {
            self.song.push(measure);
          })
          self.songTitle = data.title;
        });
      }
    }
  })
  .factory('findAllStandardsFactory', function($http) {
    return {
      find: function(self) {
        $http.get('/api/music/standards')
        .success(function(titles) {
          titles.forEach(function(song) {
            self.standards.push(song.title);
          });
        })
        .error(function() {
          console.log("err");
        });
      }
    }
  });