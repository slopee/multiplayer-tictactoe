var BoardView = function() {
    var BOARD_LINE_LIMIT_WIDTH = 15;
  
    // Attributes
    var self = this;
    var boardPositions = [];
    
    this.updateBoard = function(logicBoard) {
      for(positionIndex in boardPositions) {
          if(!boardPositions[positionIndex].painted) {
            var logicPosition = logicBoard.getPosition(positionIndex);
            if(!logicPosition.isEmpty()) {
              drawMovement(positionIndex, logicPosition.isCross());
            }
          }
      }
    };
    
    this.onMouseDown = function(mouseEvent) {
         var pressedPosition = -1;
      
      for(positionIndex in boardPositions) {
        var position = boardPositions[positionIndex];
        
        var positionLimit =  {
          minX: position.left,
          maxX: position.left + position.width,
          minY: position.top,
          maxY: position.top + position.height
        }
        
        if((mouseEvent.x >= positionLimit.minX) && 
           (mouseEvent.x <= positionLimit.maxX) &&
           (mouseEvent.y >= positionLimit.minY) &&
           (mouseEvent.y <= positionLimit.maxY))
        {
          pressedPosition = positionIndex;
          break;
        }
      }
      
      if(pressedPosition != -1) {
        self.listener.onPositionPressed(pressedPosition);        
      }
    };
    
    this.addListener = function(listener) {
      self.listener = listener;
    };
    
    // Private
    var calculateBoardPosition = function() {
      var boardSize = {
          width: window.game.width - (2 * BOARD_LINE_LIMIT_WIDTH),
          height: window.game.height - (2 * BOARD_LINE_LIMIT_WIDTH)
      };
      
      var elementWidth = boardSize.width / 3;
      var elementHeight = boardSize.height/ 3;
      
      var minWidth = 0;
      for(var horizontal = 0; horizontal < 3; ++horizontal) {
        var minHeight = 0;
        
        for(var vertical = 0; vertical < 3; ++vertical) {
          boardPositions.push({
            top: minHeight,
            left: minWidth,
            width: elementWidth,
            height: elementHeight,
            painted: false
          });
          
          minHeight += elementHeight + BOARD_LINE_LIMIT_WIDTH;
        }
        
        minWidth += elementWidth + BOARD_LINE_LIMIT_WIDTH;
      }
      console.log(boardPositions);
      debugDrawBoardPositions();
  };
  
  var debugDrawBoardPositions = function() {
    var graphics = window.game.add.graphics(0, 0);
    
    graphics.lineStyle(2, 0x0000FF, 1);
    
    for(positionIndex in boardPositions) {
      var position = boardPositions[positionIndex];
      graphics.drawRect(position.left, position.top, position.width, position.height);  
    }
  };
    
  var drawMovement = function(positionIndex, isCross) {
    var position = boardPositions[positionIndex];
    
    if(isCross)
    {
      game.add.sprite(position.left, position.top, 'boardSprite', 'cross.png');  
    }
    else 
    {
      game.add.sprite(position.left, position.top, 'boardSprite', 'circle.png');  
    }
  };
    
    // Constructor
    (function() {
        window.game.add.sprite(0, 0, 'boardSprite','board.png');
        window.game.input.onDown.add(self.onMouseDown);      
        calculateBoardPosition();
    })();
};