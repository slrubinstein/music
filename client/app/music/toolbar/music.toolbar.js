angular.module('musicApp')
  .directive('toolbar', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/music/toolbar/music.toolbar.html',
        controller: 'ToolbarCtrl',
        controllerAs: 'toolbar'
    }
  })
  .controller('ToolbarCtrl', function ($scope, chordBuilder, measuresFactory,
                                          saveSongFactory, Auth, sampleSongFactory,
                                          findAllSongsFactory) {
    var self = this;
    this.song = measuresFactory.currentMeasures;
    this.songTitle = '';
    this.tempo = 60;

    this.addMeasures = measuresFactory.addMeasures;

    this.currentUser = Auth.getCurrentUser;

    this.userSongs = [];
    console.log(self.userSongs, 'USER SONGS')

    if (this.currentUser()._id) {
      findAllSongsFactory.find(this.currentUser()._id, self);
    }


    this.saveSong = function() {
      this.song.title = this.songTitle;
      saveSongFactory.save(this.song, this.song.title, this.currentUser()._id);
      this.userSongs = [];
      findAllSongsFactory.find(this.currentUser()._id, self);
    }

    this.mySongDropdown = function() {
      $('#my-song-dropdown-menu').toggle();
    }

    this.loadSample = function() {
      measuresFactory.currentMeasures = sampleSongFactory.sampleSong;
      this.song = measuresFactory.currentMeasures;
      this.songTitle = this.song.title;
    }
  })
  .factory('measuresFactory', function() {
    return {
      currentMeasures: [{currentChord: ' / / / / '}],
      addMeasures: function() {
        this.song.push({currentChord: ' / / / / '})
      }
    }
  })
  .factory('saveSongFactory', function($http) {
    return {
      save: function(song, title, userId) {
        console.log('saving', song, 'for', userId)
        $http.post('/api/users/'+userId+'/newsong', { song: song, title: title });
      }
    }
  })
  .factory('findAllSongsFactory', function($http) {
    return {
      find: function(userId, self) {
        $http.get('/api/users/'+userId+'/findallsongs', {})
        .success(function(data) {
          console.log(data)
          console.log(self.userSongs)
          data.forEach(function(song) {
            self.userSongs.push(song);
          });
          console.log(self.userSongs)
          // return data;
        });
      }
    }
  })
  .factory('loadSongFactory', function($http) {
    return {
      load: function(title, userId) {
        console.log('loading', song, 'for', userId)
        $http.get('/api/users/'+userId+'/loadsong', { title: title });
      }
    }
  })
  .factory('sampleSongFactory', function() {
    return {
      sampleSong: [{
        title: 'my beautiful song',
        chords: {
          7: {build: ['A', 'C#', 'E', 'G'], chordroot: 'A',
              name: '7', rel: 'I'},
          maj6: {build: ['A', 'C#', 'E', 'F#'], chordroot: 'A',
              name: 'maj6', rel: 'I'},
          maj9: {build: ['A', 'C#', 'E', 'G#', 'B'], chordroot: 'A',
              name: 'maj9', rel: 'I'},
        },
        currentChord: 'Amin',
        id: 0,
        root: 'A'
      }, {
        chords: {
          7: {build: ['A', 'C#', 'E', 'G'], chordroot: 'A',
              name: '7', rel: 'I'},
          maj6: {build: ['A', 'C#', 'E', 'F#'], chordroot: 'A',
              name: 'maj6', rel: 'I'},
          maj9: {build: ['A', 'C#', 'E', 'G#', 'B'], chordroot: 'A',
              name: 'maj9', rel: 'I'},
        },
        currentChord: 'A',
        id: 0,
        root: 'A'
      }]
    }
  });