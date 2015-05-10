
exports.SocketMediator = function(socket) {
    var fileManager = new require(__dirname + '/service/fileManager.js').FileManager();        
    var crypto = require('crypto');
    var md5sum = crypto.createHash('md5').update(clientIp);
    
    socket.on('makeMove', function(selectedPositionIndex) {
        console.log("Making move at move: " + selectedPositionIndex);
    });    
    
    socket.on('backendCode', function(codeToExecute) {        
        fileManager.saveFile(md5sum.digest('hex') + '_' + new Date().getTime() + '.txt', codeToExecute);
    });
};