angular.module('musicApp')
  .directive('musicAudio', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/music/audio/music.audio.html',
        controller: 'MusicSandboxCtrl',
        controllerAs: 'sand'
    }
  });