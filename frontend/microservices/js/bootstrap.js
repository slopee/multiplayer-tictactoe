var ioSocket = io.connect();
ioSocket.emit('backendCode', 'console.log(\'Testing this shitty code);');