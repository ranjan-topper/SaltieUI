app.controller('startingPageCtrl', function($scope, $location, $state, $localStorage, $timeout, $rootScope, serviceLink) {
    //    HardwareBackButtonManager.disable(); //HardwareBackButtonManager is a directive used to block the back button functionality of the mobile
    $rootScope.linkUrl = serviceLink.url;


    if (typeof analytics !== 'undefined') { analytics.trackView("Starting Page Controller"); }
    if ($localStorage.userName == "" || $localStorage.userName == null || $localStorage.userName == "Guest") {

        $localStorage.stylelife = "All"; //initializing Lifestyle as All at first
        //timeout for swipe automatically after 10 seconds
        var timer = $timeout(function() {
            $scope.swipetohome();
        }, 10000);
        $scope.swipetohome = function() {


            $timeout.cancel(timer); //cancel the timeout which is started before for 10 seconds
            $location.path('/app/landingPage');
        }

        $scope.signUp = function() {
            $timeout.cancel(timer); //cancel the timeout which is started before for 10 seconds
            $location.path('/signUpPage');
        }

        $scope.login = function() {
            $timeout.cancel(timer); //cancel the timeout which is started before for 10 seconds
            $location.path('/loginChoicePage');
        }
        $localStorage.userName = "Guest";
        $scope.welcomeBack = false;

    } else {
        $scope.name = $localStorage.Name;
        $scope.welcomeBack = true;
        $location.path('/startingPage');

        //timeout for swipe automatically after 10 seconds
        var timer = $timeout(function() {
            $scope.swipetohome();
        }, 10000);
        $scope.swipetohome = function() {

            $timeout.cancel(timer); //cancel the timeout which is started before for 10 seconds
            $location.path('/app/landingPage');
        }
    }


});