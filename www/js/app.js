// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'ngStorage', 'ngCordova','ngMessages','starter.controllers','ngIOS9UIWebViewPatch']);

app.run(function ($ionicPlatform,$rootScope, $state, $location,$ionicHistory) 
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
		  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
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
})



app.config(function($stateProvider, $urlRouterProvider) {
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
		controller:'bookingController'

        }
      }
    })
  
  .state('app.engage', {
      url: "/engageUser",
      views: {
        'menuContent': {
          templateUrl: "templates/engageUser.html",
		controller:'bookingController'

        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/start');
	

});
