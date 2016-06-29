cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.red_folder.phonegap.plugin.backgroundservice/www/backgroundService.js",
        "id": "com.red_folder.phonegap.plugin.backgroundservice.BackgroundService",
        "pluginId": "com.red_folder.phonegap.plugin.backgroundservice"
    },
    {
        "file": "plugins/com.inffinix.plugins/www/networkService.js",
        "id": "com.inffinix.plugins.NetworkService",
        "pluginId": "com.inffinix.plugins",
        "clobbers": [
            "cordova.plugins.networkService"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "com.red_folder.phonegap.plugin.backgroundservice": "2.0.0",
    "com.inffinix.plugins": "2.0.0"
}
// BOTTOM OF METADATA
});