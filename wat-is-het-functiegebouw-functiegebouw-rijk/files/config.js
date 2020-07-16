define(['/jsConfig?callback=define'], function (jsConfig) {
  var availableLibraries, paths, library;

  availableLibraries = jsConfig.availableLibraries;

  paths = {
    'swfaddress'            : 'vendor/swfaddress',
    'jwplayer'              : 'vendor/jwplayer',
    'swfobject'             : 'vendor/swfobject',
    'jquery.tabs'           : 'vendor/jquery.tabs',
    'FgrHomepage'           : 'modules/FgrHomepage',
    'mediaelementAndPlayer' : 'modules/mediaelement-and-player',
    'overheidsmediaplayer'  : 'modules/overheidsmediaplayer-combined.min'
  };

  // convert the available libraries to a require js format
  for (library in availableLibraries) {
    if (availableLibraries.hasOwnProperty(library)) {
      var path = availableLibraries[library];
      //only add libraries that have a path that is different than their name
      if (library != path) paths[library] = path.replace(/\.js/, '');
    }
  }

  return {
    requireJsConfig: {
      paths : paths,
      waitSeconds: 7,
      config: jsConfig.jsConfig,

      shim : {
        'swfobject': {
          exports: 'swfobject'
        },
        'jwplayer': {
          exports: 'jwplayer'
        },
        'jquery.tabs': {
          deps: ['jquery']
        },
        'overheidsmediaplayer': {
          deps: ['mediaelementAndPlayer']
        }
      }
    }
  };
});