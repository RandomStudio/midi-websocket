const defaults = require('./defaults.js');
const config = require('parse-strings-in-object')(require('rc')('midirelay', defaults));
const midi = require('midi');
const app = require('http').createServer();
const io = require('socket.io')(app);


let state = {
    clients: null
}

console.log('loaded Midi Websocket Relay with config', JSON.stringify(config));

app.listen(config.websocket.port);
io.on('connect', (socket) => {
    console.log('connected client:', socket.id);
    state.client = socket;
});

const input = new midi.input();
const portCount = input.getPortCount();

if (portCount === 0) {
    console.error('no MIDI devices found!');
} else {
    console.log('found', portCount, 'midi devices');
}

for (let i = 0; i < portCount; i++) {
    const name = input.getPortName(i);
    console.log('input #' + i + ': ' + name);

    if (config.midi.port !== null) {
        if (config.midi.port === i) {
            console.log('found matching port');
            input.openPort(i);
        
            input.on('message', (delta, message) => {
                if (state.client) {
                    const socket = state.client;
                    if (config.websocket.debug) {
                        console.log('emit', message, 'to', socket.id);
                    }
                  socket.emit('midi', message);
                }
                if (config.midi.debug) {
                    console.log(message);
                }
            });
        }
    }

}