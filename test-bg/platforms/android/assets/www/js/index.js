var TIMER_SERVICE = 6000;

function displayError( data, msj ) {
    console.log( 'ERROR : ' + msj );
}

function registerForUpdates( data ) {
    if ( !data.RegisteredForUpdates ) {
        networkService.registerForUpdates(
        function( r ) { handleResult( r ) },
         function( e ) { displayError( e, 'registerForUpdates' ) }
        );
    }
}

function handleResult( data ) {
    console.log('--------- RESULT: ' + JSON.stringify( data.LatestResult ) + ' ---------' );
    if( data.LatestResult.files ) {
        for( var i = 0; i < data.LatestResult.files.length; i++ ) {
            var element = data.LatestResult.files[ i ];
            console.log( 'element: ' + JSON.stringify( element ) );
        };
    }
}

function handleStartService( data ) {
    if( data.ServiceRunning ) {
        enableTimer( data );
    } else {
        networkService.startService(
            function( r ) { enableTimer( r ) },
            function( e ) { displayError( e, 'startService' ) }
        );
    }
}

function handleStopService( data ) {
    if( data.ServiceRunning ) {
        networkService.stopService(
            function( r ) { console.log( 'StopService OK: service is runnning ' + r.ServiceRunning ) },
            function( e ) { displayError( e, 'enableTimer' ) }
        );
    }
}

function enableTimer( data ) {
    if( data.TimerEnabled ) {
        registerForUpdates( data );
        console.log('timer enable');
    } else {
        networkService.enableTimer( TIMER_SERVICE,
            function( r ) { registerForUpdates( r ) },
            function( e ) { displayError( e, 'enableTimer' ) }
        );
    }
}

function setConfiguration( config ){
    networkService.setConfiguration( config,
        function( r ) { console.log( 'SetConfiguration OK: ' + JSON.stringify( config ) ) },
        function( e ) { displayError( e, 'setConfiguration' ) }
    );
}

function startService() {
    networkService.getStatus(
        function( r ) { handleStartService( r ) },
        function( e ) { displayError( e, 'getStatus' ) }
    );
}

function stopService() {
    networkService.getStatus(
        function( r ) { handleStopService( r ) },
        function( e ) { displayError( e, 'getStatus' ) }
    );
}

function start() {
    console.log('-------------- Start ----------------');
    startService();
}

function stop() {
    console.log('-------------- Stop ----------------');
    stopService();
}

var num = 0;
function setConfig() {
    console.log('-------------- setConfig ----------------');
    var objeto = {
        'filePath' : '/storage/emulated/0/DCIM/Camera/IMG_20160704_163900595.jpg',
        'server' : 'http://200.76.163.199:8009/d2dmobile/D2DAppUploadDocument',
        'fileName' : 'IMG_20160704_163900595.jpg',
        'params' : {
            'password' : 'secret',
            'login' : 'ffricke',
            'group' : '6',
            'account' : '101670007816939',
            'description' : 'desde android bg'
        }
    };
    setConfiguration( objeto );
}

function setLocation() {
    console.log('-------------- setLocation ----------------');
        console.log('-------------- setConfig ----------------');
        var objeto = {
            'serverLocation' : 'http://200.76.163.199:8009/d2dmobile/RegisterServlet',
            'login' : 'ffricke',
            'password' : 'secret',
        };
        setConfiguration( objeto );
}

var networkService;
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById("start").addEventListener("click", start);
        document.getElementById("stop").addEventListener("click", stop);
        document.getElementById("setConfig").addEventListener("click", setConfig);
        document.getElementById("setLocation").addEventListener("click", setLocation);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        console.log('------------------- Received Event: ' + id + ' -------------------');
        networkService = cordova.plugins.networkService;
    }
};

app.initialize();