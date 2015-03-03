var _ = require('lodash');
var fs = require('fs');

module.exports = {
  getRenderer: function(path){
    var renderEngines = ['jade', 'hbs', 'ejs', 'html']
    var renderEngine;
    var viewTest = fs.readdirSync(path);
    var containsIndex = _.some(viewTest, function(f){
      var splitFile = f.split('.');
      if(splitFile[0] === 'index'){
        renderEngine = renderEngines[_.indexOf(renderEngines, splitFile[1])];
        return true
      }
    });

    return renderEngine
  }
};