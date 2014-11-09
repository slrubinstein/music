/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Note = require('../api/music/music.model').Note;
var Standard = require('../api/music/music.model').Standard;
var teoria = require('teoria');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});


var notes = [];

var letters = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab']

for (var n = -48, i = 0; n < 40; n++, i++) {
  var note = {};
  var o = Math.floor(i/12);
  var frequency = 440 * Math.pow(2, (n/12))
  var j = i % 12
  var letter = letters[j]
  note.keyId = i;
  note.octave = o;
  note.noteName = letter;
  note.frequency = frequency;
  notes.push(note);
}

Note.find({}).remove(function() {
  for (var n = 0, len = notes.length; n < len; n++) {
    Note.create({
        keyId : notes[n].keyId,
        octave : notes[n].octave,
        noteName: notes[n].noteName,
        frequency: notes[n].frequency
      })
  }
});



var AllOfMe = { title: 'All of Me',
                song:
                 [ { root: 'C',
                     currentChord: 'maj7',
                     id: 3,
                     chords: [Object],
                     currentroot: 'C' },
                   { root: 'C',
                     currentChord: 'maj7',
                     id: 3,
                     chords: [Object],
                     currentroot: 'C' },
                   { root: 'E',
                     currentChord: '7',
                     id: 7,
                     chords: [Object],
                     currentroot: 'E' },
                   { root: 'E',
                     currentChord: '7',
                     id: 7,
                     chords: [Object],
                     currentroot: 'E' },
                   { root: 'A',
                     currentChord: '7',
                     id: 0,
                     chords: [Object],
                     currentroot: 'A' },
                   { root: 'A',
                     currentChord: '7',
                     id: 0,
                     chords: [Object],
                     currentroot: 'A' },
                   { root: 'D',
                     currentChord: 'm',
                     id: 5,
                     chords: [Object],
                     currentroot: 'D' },
                   { root: 'D',
                     currentChord: 'm7',
                     id: 5,
                     chords: [Object],
                     currentroot: 'D' } ] }

Standard.find({}).remove(function() {
  Standard.create({
    title: AllOfMe.title,
    song: AllOfMe.song
  });
});
