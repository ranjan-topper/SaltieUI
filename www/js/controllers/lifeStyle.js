app.controller('lifeStyleCtrl', function($scope, $location, $http, $rootScope, $filter, $localStorage, $ionicLoading, serviceLink, $ionicModal, $ionicScrollDelegate, $ionicSlideBoxDelegate, $timeout, facebookService, $ionicTabsDelegate) {
    //initialise the rootscope details value
    $rootScope.TempDetail = "";
    $rootScope.engageData = "";
    $rootScope.list = [];
    $rootScope.buttonType = "Select Room Type";
    $rootScope.firstTimeSelected = 0;
    $rootScope.pidVivaUrl = 'https://res.vivavoyage.com';

    if ($localStorage.userName == "Guest") {
        $rootScope.loginLogout = "Login";
        $rootScope.showMyFav = true;
        $rootScope.showEngage = true;
        $rootScope.hidePhBook = false;
        $rootScope.showProfileSet = true;
    } else {
        $rootScope.showMyFav = false;
        $rootScope.showEngage = false;
        $rootScope.hidePhBook = true;
        $rootScope.loginLogout = "Log Out";
        //default token header
        // $http.defaults.headers.common['X-Auth-Token']= $localStorage.auth_token;
    }





    if (typeof analytics !== 'undefined') { analytics.trackView("LifeStyle Controller"); }

    //    HardwareBackButtonManager.disable();
    if ($localStorage.userName == "" || $localStorage.userName == null) {
        $location.path('/start');
    } else {


        $rootScope.is_engaged = "lifeStyle";
        $rootScope.page = "lifestyle"; //page remember form myfavourite page



        $http.get(serviceLink.url + 'SaltieApp/rest/cruise/count').success(function(data) {
            $rootScope.lifestylecount = data;
            $rootScope.countSailing = data.TotalSailing;
            $rootScope.count = $rootScope.lifestylecount[$localStorage.stylelife];
        });



        $scope.viewall = function() {

            $location.path('/app/list');
            $timeout(function() {
                $ionicTabsDelegate.$getByHandle('listTab').select(0);
            }, 100);
        }


        //floating button action
        $rootScope.floatButtonClicked = false;
        $rootScope.onfloatingButton = function(floatButtonClicked) {
            console.log(floatButtonClicked);
            $rootScope.floatButtonClicked = !floatButtonClicked;
        };
        $rootScope.phonecallTab = function(phonenumber) {
            var call = "tel:" + phonenumber;
            document.location.href = call;
        }


    }
});