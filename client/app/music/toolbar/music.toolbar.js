angular.module('musicApp')
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
                                      musicNotesFactory, changeTargetMeasureFactory) {
    var self = this;
    this.song = measuresFactory.currentSong;
    this.songTitle = '';
    this.tempo = 60;
    this.notes = musicNotesFactory.notes;

    this.selectSong;

    this.addMeasures = measuresFactory.addMeasures;

    this.currentUser = Auth.getCurrentUser;

    this.userSongs = [];

    if (this.currentUser()._id) {
      findAllSongsFactory.find(this.currentUser()._id, self);
    }

    this.addChordMeasure = function(note, index) {
      this.addMeasures();
      var measureNumber = this.song.length - 1;
      changeTargetMeasureFactory.targetMeasure(note, index, measureNumber, $scope);
    }

    this.play = function() {
      playerFactory.playExample(this.song); 
    }

    this.saveSong = function() {
      this.song.title = this.songTitle;
      saveSongFactory.save(this.song, this.song.title, this.currentUser()._id, self);
      console.log(this.userSongs)
    }

    this.mySongDropdown = function() {
      $('#my-song-dropdown-menu').toggle();
    }

    this.discardSong = measuresFactory.discardSong;

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
        $http.get('/api/users/'+userId+'/findallsongs', {})
        .success(function(data) {
          data.forEach(function(song) {
            self.userSongs.push(song);
            console.log('user songs', self.userSongs)
          });
        });
      }
    }
  })
  .factory('loadSongFactory', function($http) {
    return {
      load: function(title, userId) {
        $http.get('/api/users/'+userId+'/loadsong', { title: title });
      }
    }
  });