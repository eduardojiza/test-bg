cordova.define("com.inffinix.plugins.NetworkService", function(require, exports, module) { var serviceName = 'com.inffinix.plugins.NetworkService';

var factory = require('com.red_folder.phonegap.plugin.backgroundservice.BackgroundService');
module.exports = factory.create(serviceName);

});
