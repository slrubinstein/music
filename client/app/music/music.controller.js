'use strict';

angular.module('musicApp')
  .controller('MusicCtrl', function ($scope, $http, chordBuilder) {
  	var self = this;

  	$scope.notes = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab']
  	this.recreateNotes = function() {
  		return $scope.notes;
  	}
  	this.keyboard = [];
		for (var i = 1; i <= 8; i++) {
			this.keyboard.push($scope.notes);
		}

  	this.root = '';
  	this.id;

  	this.chooseRoot = function(i) {
  		this.root = $scope.notes[i];
  		this.id = i;
  	}

    this.chordShapes = chordBuilder.chords;

  	this.chords = [{
  		type: 'minor', build: [3, 7]
  	}, {
  		type: 'major', build: [4, 7]
  	}, {
  		type: 'dominant7', build: [4, 7, 10]
  	}, {
  		type: 'minor7', build: [3, 7, 10]
  	}]

  	this.chord = '';
  	this.chordNotes = '';

  	this.buildChord = function(chordIndex) {
  		this.chordNotes = '';
  		var chordType = this.chords[chordIndex].type;
  		this.chord = this.root + ' ' + chordType;

 			// push current root into current notes
  		var currentNotes = [];
  		currentNotes.push(this.root);

  		// get intervals for chord
  		var intervals = this.chords[chordIndex].build;

  		// push notes into currentNotes based on chord build
  		intervals.forEach(function(i) {
  			var intv = self.id + i;
  			if (intv > 11) {
  				intv -= 12;
  			}
  			currentNotes.push($scope.notes[intv]);
  		});

  		currentNotes.forEach(function(n) {  			
  			self.chordNotes = self.chordNotes + ' ' + n;  		
  		})

  	}

  })
  .directive('musicForm', function() {
  	return {
  		restrict: 'E',
  		templateUrl: 'app/templates/music.form.html',
  		controller: 'MusicCtrl',
  		controllerAs: 'music'
  	}
  })
  .directive('musicSandbox', function() {
  	return {
  		restrict: 'E',
  		templateUrl: 'app/templates/music.sandbox.html',
  		controller: 'MusicSandboxCtrl',
  		controllerAs: 'sand'
  	}
  })
  .directive('draggable', function($document) {
    return function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;
      element.css({
       position: 'relative'
      });
      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
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
        element.remove();
      }
    };
  });
