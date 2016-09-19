app.controller('engageController', function($scope, $location, $http, $rootScope, $localStorage){
    $scope.engageUser = function(){
    
        // $rootScope.TempDetail=angular.copy($rootScope.detail);
        $location.path('/app/emailUs');
    }

    //$scope.is_showBookingPopup = false;
    $scope.bookOnline = function(){
         $scope.detail = angular.copy($rootScope.TempDetail);
         $rootScope.TempDetail = "";

        $scope.name = $localStorage.Name.split(" ")[0];
        if($scope.detail == undefined || $scope.detail == "" || $scope.detail == null){
            $scope.is_showBookingPopup = true;
        }else{
            $scope.is_showBookingPopup = false;
            $location.path('/app/booking');
        }
        //$location.path('/app/emailUs');
    }
    $scope.back = function() {
        // $rootScope.engageData = "";
//        if($rootScope.TempDetail == "" || $rootScope.TempDetail == undefined){
//            $location.path('app/list');
//        }else{
            window.history.back();   
//        }
        console.log($rootScope.TempDetail);
    }
    $scope.goToList = function(){
        $scope.is_showBookingPopup = false;
        $location.path('/app/list');
    }
    $scope.closePopup = function(){
        $scope.is_showBookingPopup = false;
    }
	
	$scope.bookOnlineWeb = function()
	{
		 window.open('https://www.vivavoyage.com/', '_blank', 'closebuttoncaption=back');
	}
    
});