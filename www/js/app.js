// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'firebase', 'starter.configs'])

.run(function($ionicPlatform, CONFIG) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    firebase.initializeApp({
      apiKey: CONFIG.FIREBASE_API,
      authDomain: CONFIG.FIREBASE_AUTH_DOMAIN,
      databaseURL: CONFIG.FIREBASE_DB_URL,
      storageBucket: CONFIG.FIREBASE_STORAGE,
      messagingSenderId: CONFIG.FIREBASE_STORAGE
    });
  });
})

.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
  function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.navBar.alignTitle('center');
  $stateProvider

  .state('app', {
url: '/app',
abstract: true,
templateUrl: 'templates/menu.html',
controller: 'AppCtrl'
})

.state('app.search', {
url: '/search',
views: {
  'menuContent': {
    templateUrl: 'templates/search.html'
  }
}
})

.state('app.browse', {
  url: '/profile',
  views: {
    'menuContent': {
      templateUrl: 'templates/browse.html'
    }
  }
})
.state('app.playlists', {
  url: '/playlists',
  views: {
    'menuContent': {
      templateUrl: 'templates/playlists.html',
      controller: 'ChatsCtrl'
    }
  }
})

.state('app.contactus', {
  url: '/contact',
  views: {
    'menuContent': {
      templateUrl: 'templates/contactus.html',
    }
  }
})

.state('app.single', {
url: '/playlists/:index',
views: {
  'menuContent': {
    templateUrl: 'templates/playlist.html',
    controller: 'ChatDetailCtrl'
  }
 }
})

.state('app.dashboard', {
        url: '/dashboard',
        views: {
          'menuContent': {
            templateUrl: "templates/dashboard.html",
            controller: "dashboardController"
          }
        }
      })

.state('login', {
        url: '/login',
        templateUrl: "templates/login.html",
        controller: "loginController"
      })
.state('signup', {
        url: '/signup',
        templateUrl: "templates/signup.html",
        controller: "signupController"
      })
.state('reset', {
        url: '/reset',
        templateUrl: "templates/resetemail.html",
        controller: "resetController"
      })


  .state('intro', {
    url: '/',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  })
  // if none of the above states are matched, use this as the fallback

  $urlRouterProvider.otherwise('/');
}])

.factory('Chats', function($http) {

  var chats = [];

  return {
    getUsers : function(){
      return $http.get('https://randomuser.me/api/?results=10').then(function(response){
        chats = response.data.results;
        return response.data.results;
      });
    },
    getUser: function(index){
      return chats[index];
    }
  }
});
