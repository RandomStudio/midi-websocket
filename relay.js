const midi = require('midi');

const input = new midi.input();
const portCount = input.getPortCount();

if (portCount === 0) {
    console.error('no MIDI devices found!');
}

for (let i = 0; i < portCount; i++) {
    console.log('input #' + i + ': ' + input.getPortName(i));
}