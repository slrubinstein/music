'use strict';

angular.module('musicApp')
  .controller('MusicCtrl', function ($scope, $http, chordBuilder) {
  	var self = this;

  // 	this.keyboard = [];
		// for (var i = 1; i <= 8; i++) {
		// 	this.keyboard.push($scope.notes);
		// }

  	// this.root = '';
  	// this.id;

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
      var startingPosition = {}
      element.css({
       position: 'relative',
          'z-index': 2
        });
      var clone;
      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        // clone = element.clone();
        // clone.appendTo(element);
        startX = event.screenX - x;
        startY = event.screenY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(event) {
        y = event.screenY - startY;
        x = event.screenX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
        // element.remove();
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
