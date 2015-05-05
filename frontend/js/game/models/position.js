var Position = function(id) {
    var id = id;
    var empty = true;
    var cross = false;
    var circle = false;
    
    this.setToEmpty = function() {
      empty = true;
      cross = false;
      circle = false;
    };
    
    this.setToCross = function() {
      empty = false;
      cross = true;
      circle = false;
    };
    
    this.setToCircle = function() {
      empty = false;
      cross = false;
      circle = true;
    };
    
    this.isEmpty = function() {
        
        return empty;
    };
    
    this.isCross = function() {
        return cross;
    };
    
    this.areEqual = function(position) {
        if(!empty && !position.isEmpty())
        {
            if(cross)
            {
                return position.isCross();
            }
            
            return !position.isCross();
        }
        
        return empty && position.isEmpty();
    };
    
    this.debugPrint = function() {
        console.log(id + ": " + empty  + " " + cross + " " + circle);
    };
};