app.controller('iframeBookingPageCtrl', function($scope, $location, $rootScope, $localStorage) {

    if ($localStorage.userName == "" || $localStorage.userName == null) {
        $location.path('/startingPage');
    } else {
        $scope.back = function() {
            $rootScope.TempDetail = $scope.detail;
            window.history.back();
        }

    }
});