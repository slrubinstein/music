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
  .controller('MusicSandboxCtrl', function ($scope, measuresFactory, 
                                            activeMeasure, currentHover,
                                            updateChordFactory, instructions,
                                            playerFactory, currentChord,
                                            activeBeat, droppableFactory) {

    var self = this;
    this.song = measuresFactory.currentSong;
    this.substitutions = [];
    this.majorSubs = [];
    this.D7s = [];
    this.minorSubs = [];
    this.tonicSubs = [];
    this.setDroppable = droppableFactory.droppable;

    this.dropdownOpen = false;

    this.setDroppable();
    this.instructions = instructions;

    this.dropdown = function(event, songIndex, beatIndex) {
      // check if a dropdown is open & that the click is on a button to avoid bubbling
      if (!this.dropdownOpen && $(event.target).hasClass('dropdown-toggle')) {
        if (this.song[songIndex][beatIndex].chords) {

          $($(event.target).children()[1]).toggle().addClass('open');
          activeMeasure.m = this.song[songIndex];
          this.substitutions = this.song[songIndex][beatIndex].chords;

          this.majorSubs = _.where(this.substitutions, {use: 'majorSub'});
          this.minorSubs = _.where(this.substitutions, {use: 'minorSub'});
          this.tonicSubs = _.where(this.substitutions, {use: 'tonicSub'});
          this.D7s = _.where(this.substitutions, {use: 'D7'});
          
          this.substitutions = this.majorSubs.concat(this.D7s, this.minorSubs, this.tonicSubs);
        }
        this.dropdownOpen = true;

      } else {
        $('.open').toggle().removeClass('open');
        this.dropdownOpen = false;
      }
    }

    // close dropdown if open when clicked outside menu
    $('body').on('click', function(event) {
      if (self.dropdownOpen && !$(event.target).hasClass('dropdown-toggle')) {
        $('.open').toggle().removeClass('open');
        self.dropdownOpen = false;
      }
    })

    this.updateChord = function(name, chordroot, event, beatIndex) {
      
      this.instructions.changeSubstitution = true;
      updateChordFactory.update(name, chordroot, event, beatIndex);
      playerFactory.playOne(activeMeasure.m[beatIndex], name);
      activeMeasure.m = null;
      console.log(self)
      self.dropdownOpen = false;
      console.log('after')
    }

    this.deleteCurrentMeasure = function(index) {
      this.song.splice(index, 1);
    }
    
  })
  .factory('updateChordFactory', function(activeMeasure, musicNotesFactory) {
    return {
      update:function(chordName, chordroot, event, beat) {
        activeMeasure.m[beat].currentChord = chordName;
        activeMeasure.m[beat].currentroot = chordroot;
        $(event.target).closest('.dropdown-menu').toggle().removeClass('open');
        
      }
    }
  })
  .factory('droppableFactory', function(currentChord, changeTargetFactory, instructions) {
    return {
      droppable: function() {
        setTimeout(function() {
          $( ".droppable" ).droppable({
            accept: '.draggable',
            drop: function(event, ui) {
              instructions.changeChord = true;
              var beatIndex = $(event.target).index()
              var note = ui.draggable.text()
              // subtracting 1 from index to account for rest measure
              var index = ui.draggable.index() - 1;
              var measureNumber = $(event.target).closest('.measure').attr('id').slice(4);

              if (ui.draggable.attr('id') === 'rest') {
                changeTargetFactory.targetRest(measureNumber, beatIndex)
              }
              else {
                changeTargetFactory.targetBeat(note, index, measureNumber, beatIndex);
              }
            }
          })
        })
      }
    }
  })    