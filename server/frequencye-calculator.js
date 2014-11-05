
var notes = [];

var letters = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab']

for (var n = -48, i = 0; n < 48; n++, i++) {
	var note = {};
  var o = Math.floor(i/12);
  frequency = 440 * Math.pow(2, (n/12))
  var j;
  if (i > 11) {j = i % 12}
  var letter = letters[j]
  console.log(o, letter, frequency)
  note.keyId = i;
  note.octave = o;
  note.noteName = letter;
  note.frequency = frequency;
  notes.push(note);
}




Note.create({
    keyId : notes[n].keyId,
    octave : notes[n].octave,
    noteName: notes[n].noteName,
    frequency: notes[n].frequency
  })