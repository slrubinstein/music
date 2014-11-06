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
                                          findAllSongsFactory, playerFactory) {
    var self = this;
    this.song = measuresFactory.currentMeasures;
    this.songTitle = '';
    this.tempo = 60;

    this.addMeasures = measuresFactory.addMeasures;

    this.currentUser = Auth.getCurrentUser;

    this.userSongs = [];

    if (this.currentUser()._id) {
      findAllSongsFactory.find(this.currentUser()._id, self);
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

    this.loadSample = function() {
      measuresFactory.currentMeasures = sampleSongFactory.sampleSong;
      this.song = measuresFactory.currentMeasures;
      this.songTitle = this.song.title;
    }

    this.discard = function() {
      console.log('discard')
      console.log(measuresFactory.currentMeasures)
      measuresFactory.currentMeasures = [{currentChord: ' / / / / '}];
      console.log(measuresFactory.currentMeasures)
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
  })
  // .factory('sampleSongFactory', function() {
  //   return {
  //     sampleSong: [{
  //       title: 'my beautiful song',
  //       chords: {
  //         7: {build: ['A', 'C#', 'E', 'G'], chordroot: 'A',
  //             name: '7', rel: 'I'},
  //         maj6: {build: ['A', 'C#', 'E', 'F#'], chordroot: 'A',
  //             name: 'maj6', rel: 'I'},
  //         maj9: {build: ['A', 'C#', 'E', 'G#', 'B'], chordroot: 'A',
  //             name: 'maj9', rel: 'I'},
  //       },
  //       currentChord: 'Amin',
  //       id: 0,
  //       root: 'A'
  //     }, {
  //       chords: {
  //         7: {build: ['A', 'C#', 'E', 'G'], chordroot: 'A',
  //             name: '7', rel: 'I'},
  //         maj6: {build: ['A', 'C#', 'E', 'F#'], chordroot: 'A',
  //             name: 'maj6', rel: 'I'},
  //         maj9: {build: ['A', 'C#', 'E', 'G#', 'B'], chordroot: 'A',
  //             name: 'maj9', rel: 'I'},
  //       },
  //       currentChord: 'A',
  //       id: 0,
  //       root: 'A'
  //     }]
  //   }
  // });