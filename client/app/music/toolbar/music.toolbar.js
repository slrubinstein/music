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
                                          changeTargetMeasureFactory,
                                          loadSongFactory, dragging,
                                          findAllStandardsFactory,
                                          droppableFactory) {
    var self = this;
    this.song = measuresFactory.currentSong;
    this.songTitle = '';
    this.tempo = 60;
    this.notes = musicNotesFactory.notes;
    this.standards = [];
    this.selectStandard;

    this.addMeasures = measuresFactory.addMeasures;

    this.currentUser = Auth.getCurrentUser;

    this.userSongs = [];

    this.mySong = '';

    this.discardSong = measuresFactory.discardSong;

    if (this.currentUser()._id) {
      findAllSongsFactory.find(this.currentUser()._id, self);
    }

    findAllStandardsFactory.find(self);

    this.addChordMeasure = function(note, index) {
      if (!dragging.drag) {
        this.addMeasures();
        var measureNumber = this.song.length - 1;
        changeTargetMeasureFactory.targetMeasure(note, index, measureNumber, $scope);
        droppableFactory.droppable();
      }
    }

    this.play = function() {
      playerFactory.playExample(this.song); 
    }

    this.saveSong = function() {
      this.song.title = this.songTitle;
      saveSongFactory.save(this.song, this.song.title, this.currentUser()._id, self);
    }

    this.loadMySong = function() {
      this.discardSong(this);
      loadSongFactory.load(this.currentUser()._id, this.mySong, self);
    }

    // this.mySongDropdown = function() {
    //   $('#my-song-dropdown-menu').toggle();
    // }


    // JQUERY UI

    

    // this.makeDroppable = function() {
    //   setTimeout(function() {
    //     console.log($('.droppable'))
    //     $( ".droppable" ).droppable({
    //       over: function() {
    //         console.log('over')
    //       },
    //       drop: function(event, ui) {
    //         console.log('event', event)
    //         console.log('ui', ui)

    //         // changeTargetMeasureFactory.targetMeasure(note, index, measureNumber, $scope);
    //       }
    //     })
    //   })
    // }

    setTimeout(function() {
      $(function() {
        $('.draggable').draggable({
          revert: true,
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
      currentSong: [{currentChord: ' / / / / '}],
      addMeasures: function() {
        this.song.push({currentChord: ' / / / / '});
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