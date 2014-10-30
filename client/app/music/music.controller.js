'use strict';


angular.module('musicApp')
  .controller('MusicCtrl', function ($scope, $http) {
  	var self = this;
  	$scope.hello = 'hi there'

  	this.notes = ['A1', 'Bb1', 'B1', 'C1', 'Db1', 'D1', 'Eb1', 'E1', 'F1', 'Gb1', 'G1', 'Ab1',
  								'A2', 'Bb2', 'B2','C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2', 'Ab2'];

  	this.key = '';
  	this.id;

  	this.chooseKey = function(i) {
  		this.key = this.notes[i].slice(0,-1);
  		this.id = i;
  	}

  	this.chords = [{
  		type: 'minor', build: [3, 7]
  	}, {
  		type: 'major', build: [4, 7]
  	}, {
  		type: 'dominant7', build: [4, 7, 10]
  	}]

  	this.chord = '';
  	this.chordNotes = '';

  	this.buildChord = function(chordIndex) {
  		this.chordNotes = '';
  		var chordType = this.chords[chordIndex].type;
  		this.chord = this.key + ' ' + chordType;

 			// push current key into current notes as chord root
  		var currentNotes = [];
  		currentNotes.push(this.key);

  		// get intervals for chord
  		var intervals = this.chords[chordIndex].build;
  		console.log(intervals)

  		// push notes into currentNotes based on chord build
  		intervals.forEach(function(i) {
  			currentNotes.push(self.notes[self.id + i]);
  		});

  		currentNotes.forEach(function(n) {
  			console.log(n)
  			self.chordNotes = self.chordNotes + ' ' + n;
  			console.log(self.chordNotes)
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
  });
