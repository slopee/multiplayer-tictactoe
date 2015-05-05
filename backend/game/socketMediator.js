exports.SocketMediator = function(socket) {
    socket.on('makeMove', function(selectedPositionIndex) {
        console.log("Making move at move: " + selectedPositionIndex);
    });    
};