const defaults = require('./defaults.js');
const config = require('parse-strings-in-object')(require('rc')('midirelay', defaults));
const midi = require('midi');

console.log('loaded Midi Websocket Relay with config', JSON.stringify(config));

const input = new midi.input();
const portCount = input.getPortCount();

if (portCount === 0) {
    console.error('no MIDI devices found!');
}

for (let i = 0; i < portCount; i++) {
    console.log('input #' + i + ': ' + input.getPortName(i));
}