var handleOpenURL = function(url) {
    console.log("RECEIVED URL: " + url);
};


var app = angular.module('starter', ['ionic', 'ngStorage', 'ngCordova', 'ngMessages', 'starter.controllers', 'ngIOS9UIWebViewPatch']);

app.run(function($ionicPlatform, $rootScope, $state, $location, $ionicHistory, $ionicLoading, $window, $localStorage, $timeout, $ionicTabsDelegate, $ionicScrollDelegate, serviceLink) {
    $ionicPlatform.registerBackButtonAction(function(event) {
        console.log(event);
        if (($state.$current.name == "app.lifeStyle") ||
            ($state.$current.name == "start")
        ) {
            // H/W BACK button is disabled for these states (these views)
            // Do not go to the previous state (or view) for these states. 
            navigator.app.exitApp();
        } else {
            event.preventDefault();
        }
    }, 100);

    $ionicPlatform.ready(function() {



        if (typeof analytics !== 'undefined') {
            analytics.startTrackerWithId("UA-70027379-1");
        } else {
            console.log("Google Analytics Unavailable");
        }
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        if (window.Connection) {
            if (navigator.connection.type == Connection.NONE) {
                alert("No Internet Connection");
            }
        }
    });




    $rootScope.$on('loading:show', function() {
        $ionicLoading.show({ template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>' })
    });

    $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide()
    });




    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
        window.fbq('track', toState.name);
    });

    //initalize list item
    $rootScope.list = [];
    $rootScope.firstTimeSelected = 0;
    $rootScope.pasPageReached = 'pasPage';

    //pas functionality
    $rootScope.closePASModal = function(selectedData) {
        var neutral = '';
        var liked = '';
        var disliked = '';
        $rootScope.pasBackbtShow = false;
        console.log(selectedData);
        if (selectedData[0].liked != undefined) {
            var likedData = JSON.parse(selectedData[0].liked);
            angular.forEach(likedData, function(value, key) {
                liked += value + ',';
            });
            liked = liked.substring(0, liked.length - 1);
            console.log(liked);
        }

        if (selectedData[1].disliked != undefined) {
            var dislikedData = JSON.parse(selectedData[1].disliked);
            angular.forEach(dislikedData, function(value, key) {
                disliked += value + ',';
            });
            disliked = disliked.substring(0, disliked.length - 1);
            console.log(disliked);
        }

        if (selectedData[2].neutral != undefined) {
            var neutralData = JSON.parse(selectedData[2].neutral);
            angular.forEach(neutralData, function(value, key) {
                neutral += value + ',';
            });
            neutral = neutral.substring(0, neutral.length - 1);
            console.log(neutral);
        }
        $localStorage.liked = liked;
        $localStorage.neutral = neutral;
        $localStorage.disliked = disliked;
        $rootScope.noMoreCuratorItemsAvailable = true;
        $rootScope.curatorListIteam = [];
        $rootScope.curatorListIteamTemp = [];
        $rootScope.noRecommendation = false;
        $rootScope.startFromList = 0;
        $rootScope.curatorListServiceCall(liked, neutral, disliked);
        $timeout(function() {
            $ionicTabsDelegate.$getByHandle('listTab').select(1);
            $ionicScrollDelegate.$getByHandle('CuratorlistPage').scrollTop();
        }, 100);
        $rootScope.flagClickedShowRecom = true;
        $location.path('/app/list');
    }


    $window.addEventListener('message', function(evt) {
        var task = evt.data.task; // task received in postMessage
        switch (task) { // postMessage tasks
            // begin button clicked
            case 'beginBt':
                $rootScope.pasPageReached = 'pasWhoTravel';
                $state.go('app.pasWhoTravel');
                break;
                // whoTravel next button clicked
            case 'whoTravel':
                $rootScope.pasPageReached = 'pasCategory';
                $state.go('app.pasCategory');
                break;
                // when back arrow in the slider clicked
            case 'slideBack':
                $state.go('app.pasCategory');
                break;
                //show recommendation clicked
            case 'recom':
                $rootScope.closePASModal(evt.data.selectedItem);
                break;
                //any category clicked
            case 'categoryId':
                $rootScope.categoryID = evt.data.category_id;
                $rootScope.questionUrl = serviceLink.pasUrl + "CruisePAS/#questions?category_id=" + evt.data.category_id + "&index=0&hide-navigation=t";
                //			   $timeout(function() {
                $state.go('app.pasQuestion');
                //            }, 100);
                break;
                //default:
        }
        $rootScope.$apply();
    }, true)

})





app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.style('standard').position('top');

    $httpProvider.interceptors.push('TokenAuthInterceptor');
    $httpProvider.defaults.headers["Content-Type"] = "application/json";
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
        controller: 'loginCtrl'
    })

    .state('emaillogin', {
        url: "/emaillogin",
        templateUrl: "templates/emaillogin.html",
        controller: 'emailloginCtrl'

    })

    .state('signuphome', {
        url: "/signuphome",
        templateUrl: "templates/signuphome.html",
        controller: 'signuphomeCtrl'
    })

    .state('sendemail', {
        url: "/sendemail/:email",
        templateUrl: "templates/sendemail.html",
        controller: 'sendemailCtrl'

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
                controller: 'myFavouriteController'
            }
        }
    })

    .state('app.pasPage', {
            url: "/pasPage",
            views: {
                'menuContent': {
                    templateUrl: "templates/pasPage.html",
                    controller: 'pasPageController'
                }
            }
        })
        .state('app.pasWhoTravel', {
            url: "/pasWhoTravel",
            views: {
                'menuContent': {
                    templateUrl: "templates/pasWhoTravel.html",
                    controller: 'pasPageController'
                }
            }
        })
        .state('app.pasCategory', {
            url: "/pasCategory",
            views: {
                'menuContent': {
                    templateUrl: "templates/pasCategory.html",
                    controller: 'pasPageController'
                }
            }
        })
        .state('app.pasQuestion', {
            url: "/pasQuestion",
            views: {
                'menuContent': {
                    templateUrl: "templates/pasQuestion.html",
                    controller: 'pasPageController'
                }
            }
        })

    .state('app.detail', {
        url: "/detail",
        views: {
            'menuContent': {
                templateUrl: "templates/detail.html",
                controller: 'detailController'
            }
        }
    })


    .state('app.booking', {
        url: "/booking",
        views: {
            'menuContent': {
                templateUrl: "templates/booking.html",
                controller: 'bookingController'

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
        store: function(token) {
            return localStorage.setItem(storageKey, token);
        },
        retrieve: function() {
            return localStorage.getItem(storageKey);
        },
        clear: function() {
            return localStorage.removeItem(storageKey);
        }
    };
});
app.factory('TokenAuthInterceptor', function($q, TokenStorage, $rootScope, $injector, $timeout) {
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
        responseError: function(error) {
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
                    if (res) {
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