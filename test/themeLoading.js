var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var helpers = require(path.join(__dirname, '../', 'lib', 'helpers'))

suite("Loads and validates application paths.", function(){

  suite("Finds the theme directory, returns default otherwise.", function(){

    var fakehome = path.join(__dirname,'mocks', 'fakeHome')
    var themePath = path.join(fakehome, 'themes')

    test('Returns the default path if none matching.', function(){
      var themeDirPath = helpers.getTheme(themePath, 'littoral-test-theme')
      expect( themeDirPath.split('/').pop()).to.equal('littoral-demo-theme')
    })

    test('Throws an error if called with no input', function(){
      //helpers.getTheme()
      expect( helpers.getTheme.bind(helpers)).to.throw('Missing themesPath parameter')
    })

    /*
     * This should return the path to the directory the theme resides in NOT the name
     * property of the package.json file.
     */
    test('Returns the correct path if matching.', function(){
      var themeDirPath = helpers.getTheme(themePath, 'littoral-test-theme-1')
      expect( themeDirPath.split('/').pop()).to.equal('test-theme-1')
    })
  })


})