'use strict';

angular.module('musicApp')
  .factory('playerFactory', function() {

    return {

      playSong: function(song) {
        var Synth = function(audiolet, frequency) {
          AudioletGroup.call(this, audiolet, 0, 1);
          // Basic wave
          this.saw = new Saw(audiolet, frequency * 2);

          // Gain envelope
          this.gain = new Gain(audiolet);
          this.env = new PercussiveEnvelope(audiolet, 1, 0.2, 0.1,
              function() {
                  this.audiolet.scheduler.addRelative(0, this.remove.bind(this));
              }.bind(this)
          );
          this.envMulAdd = new MulAdd(audiolet, .2, 0);

          // Main signal path
          this.saw.connect(this.gain);
          this.gain.connect(this.outputs[0]);

          // Envelope
          this.env.connect(this.envMulAdd);
          this.envMulAdd.connect(this.gain, 0, 1);
        };
        extend(Synth, AudioletGroup);

        var SchedulerApp = function() {
          this.audiolet = new Audiolet();

          var allChords = []

          song.forEach(function(measure) {


            // is the player distinguishing betw
            // Im7 iiim7 and vim7??

            measure.forEach(function(beat) {
              var chordFreqs = [];
              var chordType = beat.currentChord;
              var frequencies = beat.chords[chordType].frequencies;
              frequencies.forEach(function(f) {
                chordFreqs.push(f);
              });
              allChords.push(chordFreqs);
            })
          })
          var songPattern = new PSequence(allChords);

          this.audiolet.scheduler.play([songPattern], 1,
                                       this.playChord.bind(this));
        };

        SchedulerApp.prototype.playChord = function(chord) {
            for (var i = 0; i < chord.length; i++) {
                var frequency = chord[i]
                var synth = new Synth(this.audiolet, frequency);
                synth.connect(this.audiolet.output);
            }
        };

        var app = new SchedulerApp(song);
      },

      //-------------------------------------------------------------//

      playOne: function(chord) {
        var Synth = function(audiolet, frequency) {
              AudioletGroup.call(this, audiolet, 0, 1);
              // Basic wave
              this.saw = new Saw(audiolet, frequency * 1/2);

              // Gain envelope
              this.gain = new Gain(audiolet);
              this.env = new PercussiveEnvelope(audiolet, 1, 0.2, 0.1,
                  function() {
                      this.audiolet.scheduler.addRelative(0, this.remove.bind(this));
                  }.bind(this)
              );
              this.envMulAdd = new MulAdd(audiolet, .2, 0);

              // Main signal path
              this.saw.connect(this.gain);
              this.gain.connect(this.outputs[0]);

              // Envelope
              this.env.connect(this.envMulAdd);
              this.envMulAdd.connect(this.gain, 0, 1);
          };
          extend(Synth, AudioletGroup);

        var SchedulerApp = function() {
            this.audiolet = new Audiolet();

            console.log('chord', chord)

            var chordFreqs = [];

            chord.frequencies.forEach(function(f) {
              chordFreqs.push(f);
            });
            
            console.log('fs', chordFreqs)
            var chordPattern = new PSequence([chordFreqs]);

            this.audiolet.scheduler.play([chordPattern], 1,
                                         this.playChord.bind(this));
        }

        SchedulerApp.prototype.playChord = function(chord) {
          for (var i = 0; i < chord.length; i++) {
              var frequency = chord[i];
              var synth = new Synth(this.audiolet, frequency);
              synth.connect(this.audiolet.output);
          }
        };

        var app = new SchedulerApp(chord);
      }
    }
  })