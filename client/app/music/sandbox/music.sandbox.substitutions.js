angular.module('musicApp')
  .factory('musicChordsFactory', function() {
    var MakeChords = function() {
      // var newRoot = {};
      this.majorTriad = [0, 4, 7];
      this.maj6 = [0, 4, 7, 9];
      this.maj7 = [0, 4, 7, 11];
      this.minorTriad = [0, 3, 7];
      this.m6 = [0, 3, 7, 9];
      this.m7 = [0, 3, 7, 10];
      this.vim7 = [9, 0, 4, 7];
      this.iiim7 = [4, 7, 11, 2];   
      // return newRoot;
    }
    return MakeChords;
  })