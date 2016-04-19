app.controller('shareController', function($scope, $location, $ionicLoading, $localStorage, $ionicNavBarDelegate) {

    if ($localStorage.userName == "" || $localStorage.userName == null) {
        $location.path('/start');
    } else {
        $scope.back = function() {
            $ionicNavBarDelegate.back();
        }

        $scope.OtherShare = function() {
            window.plugins.socialsharing.share('Saltie', 'https://www.google.nl/images/srpr/logo4w.png', null, 'https://play.google.com/store/apps/details?id=com.prantikv.digitalsignaturemaker');
        }

    }

});