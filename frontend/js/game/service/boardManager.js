var BoardManager = function() {
  // Constants    
  var PLAYER_FIGURE = {
    CROSS: 0,
    CIRCLE: 1
  };
    
  // Attributes
  var currentFigure = PLAYER_FIGURE.CROSS;
  var board = new Board();
  
  // Public methods
  // Returns true if the player was able to make the move. 
  this.makeMove = function(selectedPositionIndex) {
      var position = board.getPosition(selectedPositionIndex);
      
      var canMakeMove = position.isEmpty();
      if(canMakeMove) {
         var currentStatus = getCurrentStatus();
         
         board.setPositionStatus(selectedPositionIndex, currentStatus);
         updateCurrentFigure();
      }
      
      board.debugPrint();
      return canMakeMove;
  };
    
  this.getBoard = function() {
      return board;
  };
    
  this.isGameFinished = function() {
    var gameFinished = false;
      
    var leftToRightDiag = board.getLeftToRightDiagonal();
    if(arePositionsEqual(leftToRightDiag)) {
        gameFinished = true;
    }
      
    if(gameFinished) {
        return gameFinished;
    }
      
    var rightToLeftDiag = board.getRightToLeftDiagonal();
    if(arePositionsEqual(rightToLeftDiag)) {
        gameFinished = true;
    }
      
    for(var i = 0; i < 3 && !gameFinished; ++i) {
      var column = board.getColumn(i);
      if(arePositionsEqual(column)) {
        gameFinished = true;
      }
      
      var row = board.getRow(i);
      if(arePositionsEqual(row)) {
        gameFinished = true;
      }
    }
        
    return gameFinished;
  };
    
  // Private
  var getCurrentStatus = function() {
    if(currentFigure === PLAYER_FIGURE.CROSS) {
        return BOARD_POSITION_STATUS.CROSS;
    }  
    
    return BOARD_POSITION_STATUS.CIRCLE;
  };
  
  var updateCurrentFigure = function() {
    if(currentFigure === PLAYER_FIGURE.CROSS) {
      currentFigure = PLAYER_FIGURE.CIRCLE;
    }
    else {
      currentFigure = PLAYER_FIGURE.CROSS;
    }
  };    
    
  var arePositionsEqual = function(positions) {
    return !positions[0].isEmpty() && 
      positions[0].areEqual(positions[1]) && 
      positions[0].areEqual(positions[2]);
  }
    
};