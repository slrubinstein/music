'use strict';

angular.module('musicApp')
    .directive('musicSandbox', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/music/sandbox/music.sandbox.html',
        controller: 'MusicSandboxCtrl',
        controllerAs: 'sand'
    }
  })
  .directive('measureSplit', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/music/sandbox/measure.split.html',
        controller: 'MusicSandboxCtrl',
        controllerAs: 'sand'
    }
  })
  .controller('MusicSandboxCtrl', function ($scope, measuresFactory, 
                                            activeMeasure, currentHover,
                                            updateChordFactory) {

    this.song = measuresFactory.currentSong;
    this.substitutions = [];

    $scope.hover = currentHover;

    var self = this;

    // $scope.$on('hovering', function(event, data) {

    //   self.updateHover(data.hover);
    //   console.log('hover', !!$scope.hover.hover)
    //   // console.log('data', data.hover)
    // })

    this.mouseOver = function() {
      console.log('updateHover', currentHover)
      // $scope.$apply(function() {
        $scope.hover = currentHover;
      // })
      // this.hover = element;
    }

    this.dropdown = function(index) {
      if (this.song[index].chords) {
        console.log($('.dropdown-menu').eq(index))
        $('.dropdown-menu').eq(index).toggle();
        activeMeasure.m = this.song[index]
        this.substitutions = this.song[index].chords;
      }
    }

    this.mouseUp = function() {
      console.log('mouse up')
    }
    this.updateChord = updateChordFactory.update;

    this.deleteCurrentMeasure = function(index) {
      this.song.splice(index, 1);
    }
  })
  .factory('updateChordFactory', function(activeMeasure, musicNotesFactory) {
    return {
      update:function(index, name, chordroot) {
        activeMeasure.m.currentChord = name;
        $('.dropdown-menu').eq(this.song.indexOf(activeMeasure.m)).toggle();
        activeMeasure.m.currentroot = chordroot;
        activeMeasure.m = null;
      }
    }
  })
  // .directive('deleteable', function($document, currentHover) {
  //   return function(scope, element, attr) {

  //     element.on('mouseover', function(event) {
  //       event.preventDefault();
  //     });
  //     element.on('mouseleave', function(event) {
  //       event.preventDefault();
  //       currentHover.hover = null;
  //     })
  //   }
  // });
