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
                                            updateChordFactory,
                                            currentChord,
                                            changeTargetMeasureFactory) {

    this.song = measuresFactory.currentSong;
    this.substitutions = [];

    $scope.hover = currentHover;

    var self = this;

    this.currentChord = currentChord;

    // $scope.$on('hovering', function(event, data) {

    //   self.updateHover(data.hover);
    //   console.log('hover', !!$scope.hover.hover)
    //   // console.log('data', data.hover)
    // })


    // DRAG N DROP

    this.mouseOver = function(index) {
      $scope.hover = currentHover;

      if (this.currentChord.chord !== null) {
        $('.dropdown-menu.splits').eq(index).toggle();
      }
    }

    this.dropdown = function(index) {
      if (this.song[index].chords) {
        console.log("TOGGLE", $('.dropdown-menu.measure').eq(index))
        $('.dropdown-menu.measure').eq(index).toggle();
        activeMeasure.m = this.song[index]
        this.substitutions = this.song[index].chords;
      }
    }

    this.mouseUp = function(index) {
      if (this.currentChord.chord !== null) {
        var rootNote = this.currentChord.chord;
        var rootIndex = this.currentChord.rootIndex;
        var measureNumber = index;
        if (currentHover.hover !== null) {
          changeTargetMeasureFactory.targetMeasure(rootNote, rootIndex, measureNumber)
          this.currentChord.chord = null;
          this.currentChord.rootIndex = null;
          $('.dropdown-menu.splits').eq(index).toggle();
        }
      }
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
