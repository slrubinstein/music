'use strict';

angular.module('musicApp')
  .value('currentHover', {hover:null})
  .value('activeMeasure', {m:null})
  .controller('MusicCtrl', function ($scope, $http, chordBuilder) {
  	var self = this;

    this.chords = chordBuilder.chords;
    this.buildChord = function(root, index, notes) {
      return chordBuilder.buildChord(root, index, notes);
    }

    this.play = function(chord) {
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
  .directive('draggable', function($document, currentHover, changeTargetMeasureFactory) {
    return function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;
      element.css({
       position: 'relative',
          'z-index': 2
        });
      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        var clone = element.clone();
        clone.appendTo(element);
        clone.offset({
          top: event.pageY,
          left: event.pageX
        });
        startX = event.screenX - x;
        startY = event.screenY - y;

        $document.on('mousemove', clone, mousemove);
        $document.on('mouseup', clone, mouseup);
      });

      function mousemove(event) {
        y = event.screenY - startY + 5;
        x = event.screenX - startX + 5;
        var clone = event.data;
        
        clone.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup(event) {
        event.preventDefault();
        var clone = event.data;
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
        y = 0;
        x = 0;
        if (currentHover.hover !== null) {
          var targetMeasure = currentHover.hover;
          var rootNote = clone.text();
          var rootIndex = element.index();
          var measureNumber = targetMeasure.attr('id').slice(8)
          changeTargetMeasureFactory.targetMeasure(rootNote, rootIndex, measureNumber, scope)
        }
        clone.remove();
      }
    };
  })
  .directive('droppable', function($document, currentHover) {
    return function(scope, element, attr) {

      element.on('mouseover', function(event) {
        event.preventDefault();
        currentHover.hover = element
        // element.addClass('mouse-over');
      });
      element.on('mouseleave', function(event) {
        event.preventDefault();
        currentHover.hover = null;
        // element.removeClass('mouse-over');
      })
    }
  })
  .factory('musicNotesFactory', function() {
    return {
      notes: ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab',
              'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab',
              'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab',]
    }
  })
  .factory('changeTargetMeasureFactory', function(newChordRootFactory,
                                                  musicNotesFactory,
                                                  musicChordsFactory,
                                                  chordNotesFactory,
                                                  measuresFactory) {
    return {
      targetMeasure: function(rootNote, rootIndex, measureNumber, scope) {
        var measureObj = newChordRootFactory.newChord(rootNote, rootIndex);
        measureObj.chords = new musicChordsFactory();
        chordNotesFactory.chordNotes(measureObj)
        // console.log(measureObj)
        scope.$apply(function() {
          measuresFactory.currentMeasures[measureNumber] = measureObj;
        });
      }
    }
  });