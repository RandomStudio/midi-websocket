const defaults = require('./defaults.js');
const config = require('parse-strings-in-object')(require('rc')('midirelay', defaults));
const midi = require('midi');

console.log('loaded Midi Websocket Relay with config', JSON.stringify(config));




const openDevice = ({ port, name }) => {
    const input = new midi.input();
    const portCount = input.getPortCount();
    for (let i = 0; i < portCount; i++) {
        const name = input.getPortName(i);
        console.log(`found MIDI device at port #${i}: "${i}"`);
        if (name === null) {
    
        }
    }

}

const input = openDevice(config.midi);