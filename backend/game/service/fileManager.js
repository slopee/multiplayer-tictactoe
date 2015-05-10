exports.FileManager = function() {    
    var fileSystem = require('fs');
  
    this.saveFile = function(fileName, content) {
        fileSystem.writeFile('/vagrant/temp/' + fileName, content, function(error) {
            if(error) {                
                return console.log('Error while writting file: ' + error);
            }
            
            console.log('File '+fileName+' saved!');
        });    
    };
    
    return this;
};