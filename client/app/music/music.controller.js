'use strict';

angular.module('musicApp')
  .controller('MusicCtrl', function ($scope, $http, chordBuilder) {
  	var self = this;

    this.chords = chordBuilder.chords;
    this.buildChord = function(root, index, notes) {
      return chordBuilder.buildChord(root, index, notes);
    }

    this.play = function(chord) {
      console.log(chord)
      var search = '#' + chord + '-chord'
      if ($(search)[0]) {
        $(search)[0].play();
      }
    }

  })
  .directive('musicRoom', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/templates/music.room.html',
      controller: 'MusicRoomCtrl',
      controllerAs: 'room'
    }
  })
  .directive('draggable', function($document) {
    return function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;
      element.css({
       position: 'relative',
          'z-index': 2
        });
      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        // console.log('mousedown event target', event.target)
        // console.log(element)
        var clone = element.clone();
        // console.log(clone)
        clone.appendTo(element)
        clone.offset({
          top: event.pageY,
          left: event.pageX
        })
        startX = event.screenX - x;
        startY = event.screenY - y;

        console.log('mouse down', startX)
        console.log('mouse down', startY)
        $document.on('mousemove', clone, mousemove);
        $document.on('mouseup', clone, mouseup);
      });

      function mousemove(event) {
        // console.log('event.screenY', event.screenY)
        y = event.screenY - startY;
        x = event.screenX - startX;
        var clone = event.data;
        
        clone.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup(event) {
        var clone = event.data;
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
        y = 0;
        x = 0;
        clone.remove();
      }
    };
  })
  .factory('musicNotesFactory', function() {
    return {
      notes: ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab',
              'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab',
              'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab',]
    }
  });
