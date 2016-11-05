app.controller('iframeBookingPageCtrl', function($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading, $localStorage, $ionicNavBarDelegate) {

    if ($localStorage.userName == "" || $localStorage.userName == null) {
        $location.path('/startingPage');
    } else {
        $scope.back = function() {
            $rootScope.TempDetail = $scope.detail;
            window.history.back();
        }

    }
});