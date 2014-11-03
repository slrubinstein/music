'use strict';

angular.module('musicApp')
  .controller('MusicSandboxCtrl', function ($scope, buildSubsFactory, chordBuilder) {

    this.measures = ['/ / / /'];

    this.addMeasures = function() {
        this.measures.push('/ / / /')
    }

    this.dropdown = function(index) {
      $('.dropdown-menu').eq(index).toggle();
    }

    this.substitutions = [1, 2, 3, 4];
    this.chords = chordBuilder.chords

    this.measureNumber = [];


  })
  .factory('buildSubsFactory', function() {
    return {
        chordBuilder: {
            majorTriad: [0, 4, 7],
            majorSix: [0, 4, 7, 9],
            majorSeven: [0, 4, 7, 11],
            minorTriad: [0, 3, 7],
            minorSix: [0, 3, 7, 9],
            minorSeven: [0, 3, 7, 10]
        },


            buildSubs: function(rootId, chords) {


                console.log(chords)

            },
            convertToLetters: function(subs) {

            }
        }
           
  })
  // .directive('musicAudio', function() {
  //   return {
  //       restrict: 'E',
  //       templateUrl: 'app/templates/music.audio.html',
  //       controller: 'MusicSandboxCtrl',
  //       controllerAs: 'sand'
  //   }
  // })
  .factory('clickChordFactory', function() {
    return {
        updateMeasure: function(chord, measure) {
            // change measure to current chord
            console.log('updateMeasuer', chord, measure)
        },
        updateNumMeasures: function() {
            // add 1 to num of measures
        },
        buildSubstitutions: function(chord) {
            // build subs for current chord
        }
    }
  })
    .directive('musicSandbox', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/music/sandbox/music.sandbox.html',
        controller: 'MusicSandboxCtrl',
        controllerAs: 'sand'
    }
  });




