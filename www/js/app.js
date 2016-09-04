// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var handleOpenURL = function(url) {
    console.log("RECEIVED URL: " + url);
};


var app = angular.module('starter', ['ionic', 'ngStorage', 'ngCordova','ngMessages','starter.controllers','ngIOS9UIWebViewPatch']);

app.run(function ($ionicPlatform,$rootScope, $state, $location,$ionicHistory,$ionicLoading) 
{
	$ionicPlatform.registerBackButtonAction(function (event)
	{
		
		console.log(event);
        if ( ($state.$current.name=="app.lifeStyle") ||
             ($state.$current.name=="start")
            ){
                // H/W BACK button is disabled for these states (these views)
                // Do not go to the previous state (or view) for these states. 
              navigator.app.exitApp();
            } else 
			{
                $ionicHistory.goBack();
            }
	},100);

  $ionicPlatform.ready(function() 
	{
	  
	  
	  
	    if(typeof analytics !== 'undefined') {
            analytics.startTrackerWithId("UA-70027379-1");
        } else {
            console.log("Google Analytics Unavailable");
        }
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) 
		{
		  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
		}
		if (window.StatusBar) 
		{
		  // org.apache.cordova.statusbar required
		  StatusBar.styleDefault();
		}
	  if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                   alert("No Internet Connection");
            }
		}
  	});
	
	
	
	
    $rootScope.$on('loading:show', function() {
      $ionicLoading.show({template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'})
    });

    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide()
    });
	
})


app.config(function($stateProvider, $urlRouterProvider, $httpProvider,$ionicConfigProvider) {   
	$ionicConfigProvider.tabs.style('standard').position('top');

  $httpProvider.interceptors.push('TokenAuthInterceptor');
  $httpProvider.defaults.headers["Content-Type"]= "application/json";
  $stateProvider
  .state('start', {
    url: "/start",
    templateUrl: "templates/start.html",
	controller: 'startCtrl'
  })
  
   .state('signup', {
    url: "/signup",
    templateUrl: "templates/signup.html",
	controller: 'signupCtrl'
  })
  
  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
	  controller:'loginCtrl'
  })
  
   .state('emaillogin', {
    url: "/emaillogin",
    templateUrl: "templates/emaillogin.html",
	  	controller:'emailloginCtrl'

  })
  
  .state('signuphome', {
    url: "/signuphome",
    templateUrl: "templates/signuphome.html",
	controller:'signuphomeCtrl'
  })
  
  .state('sendemail', {
    url: "/sendemail/:email",
    templateUrl: "templates/sendemail.html",
	  	controller:'sendemailCtrl'

  })
  
  .state('profile', {
            url: '/profile',
            templateUrl: 'templates/profile.html',
            controller: 'ProfileController'
        })
  
  
    .state('share', {
            url: '/share',
            templateUrl: 'templates/share.html',
            controller: 'shareController'
        })

  //home state
  
  
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })


    .state('app.lifeStyle', {
      url: "/lifeStyle",
      views: {
        'menuContent': {
          templateUrl: "templates/lifeStyle.html",
          controller: 'lifeStyleCtrl'
        }
      }
    })
  
  
      .state('app.list', {
      url: "/list",
      views: {
        'menuContent': {
          templateUrl: "templates/list.html",
			controller: 'listController'
        }
      }
    })
  
  .state('app.myFavourite', {
      url: "/myFavourite",
      views: {
        'menuContent': {
          templateUrl: "templates/myFavourite.html",
			controller:'myFavouriteController'
        }
      }
    })
  
  .state('app.pasPage', {
      url: "/pasPage",
      views: {
        'menuContent': {
          templateUrl: "templates/pasPage.html",
			controller:'pasPageController'
        }
      }
    })
  .state('app.pasWhoTravel', {
      url: "/pasWhoTravel",
      views: {
        'menuContent': {
          templateUrl: "templates/pasWhoTravel.html",
			controller:'pasPageController'
        }
      }
    })
  .state('app.pasCategory', {
      url: "/pasCategory",
      views: {
        'menuContent': {
          templateUrl: "templates/pasCategory.html",
			controller:'pasPageController'
        }
      }
    })
    .state('app.pasQuestion', {
      url: "/pasQuestion",
      views: {
        'menuContent': {
          templateUrl: "templates/pasQuestion.html",
			controller:'pasPageController'
        }
      }
    })
  
  .state('app.detail', {
      url: "/detail",
      views: {
        'menuContent': {
          templateUrl: "templates/detail.html",
			controller:'detailController'
        }
      }
    })
	
	
	.state('app.booking', {
      url: "/booking",
      views: {
        'menuContent': {
          templateUrl: "templates/booking.html",
		controller:'bookingController'

        }
      }
    })
  
  .state('app.emailUs', {
      url: "/emailUs",
      views: {
        'menuContent': {
          templateUrl: "templates/emailUs.html",
        controller: "emailUsController"
        }
      }
    })
  
  .state('app.engage', {
      url: "/engageUser",
      views: {
        'menuContent': {
          templateUrl: "templates/engageUser.html",
        controller: 'engageController'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/start');
	

});

app.factory('TokenStorage', function() {
   var storageKey = 'auth_token';
   return {      
      store : function(token) {
         return localStorage.setItem(storageKey, token);
      },
      retrieve : function() {
         return localStorage.getItem(storageKey);
      },
      clear : function() {
         return localStorage.removeItem(storageKey);
      }
   };
});
app.factory('TokenAuthInterceptor', function($q, TokenStorage, $rootScope,$injector,$timeout) {
 return {
      requestError: function(config) {
        $rootScope.$broadcast('loading:show');
        return config;
      },
      request: function(config) {
        $rootScope.$broadcast('loading:show')

        var authToken = TokenStorage.retrieve();
         if (authToken) {
            config.headers['X-Auth-Token'] = authToken;
         }
		  config.timeout = 10000;
         return config;
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide');
        return response;
		  
      },
      responseError: function(error){
        $rootScope.$broadcast('loading:hide')
       if (error.status === 401 || error.status === 403) {
            TokenStorage.clear();
         }
          
		  
		  
		  var $ionicPopup = $injector.get('$ionicPopup');
            if (error.status === 0) {
                var userInputDefer = $q.defer();                
                var confirmPopup = $ionicPopup.confirm({
                    title: 'No Connectivity!',
                    template: 'Internet not available',
                    okText: 'Retry'
                });

                confirmPopup.then(function(res) {
                    if(res) {
                        var $http = $injector.get('$http');
                        userInputDefer.resolve($http(error.config));
                    } else {
                        userInputDefer.reject($q.reject(error));
                    }
                });

                return userInputDefer.promise;
      }
		           return $q.reject(error);

    }
 }
});



  			




