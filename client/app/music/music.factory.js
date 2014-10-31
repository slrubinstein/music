'use strict';

angular.module('musicApp')
	.factory('chordBuilder', function() {
		return {
			chords: [{
				majorSubs: {
					majorTriad: [0, 4, 7],
					majorSix: [0, 4, 7, 9],
					majorSeven: [0, 4, 7, 11]},
				}, {
				minorSubs: {
					minorTriad: [0, 3, 7],
					minorSix: [0, 3, 7, 9],
					minorSeven: [0, 3, 7, 10]
				}
				
			}]
		}
	});