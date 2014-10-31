'use strict';

angular.module('musicApp')
  .controller('MusicSandboxCtrl', function ($scope, buildSubsFactory, chordBuilder) {

    this.addMeasures = function() {
        console.log('addMeasures')
    }

    this.dropdown = function() {
      $('.dropdown-menu').toggle();
    }

    this.substitutions = [1, 2, 3, 4];
    this.chords = chordBuilder.chords
    this.buildSubs = function(rootId, chords) {
        var subs = buildSubsFactory.buildSubs(rootId);
        console.log(subs)
        this.substitutions.push(subs.majorSubs)
    }

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


                // var subs = {};
                // subs.majorSubs = {};
                // this.chordBuilder.majorTriad.forEach(function(n) {
                //     subs.majorSubs.majorTriad.push(rootId + n);
                // });
                // this.chordBuilder.majorSix.forEach(function(n) {
                //     subs.majorSubs.majorSix.push(rootId + n);
                // });
                
                // return subs;





            },
            convertToLetters: function(subs) {

            }
        }
           
  })
  ;

    // major triad:
    // Imaj7
    // I6
    // iii
    // iiim7
    // vim7

    // dom7
    // ii
    // dom9
    // dom7-5
    // dom7+5
    // aug
    // dim
    // tritone


