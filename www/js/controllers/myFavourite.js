app.controller('myFavouriteController', function($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading, $localStorage, FavouriteService, $ionicHistory, serviceLink,detailData,$ionicSlideBoxDelegate) {
	
	if(typeof analytics !== 'undefined') { analytics.trackView("MyFavourite Controller"); }

    if ($localStorage.userName == "" || $localStorage.userName == null) {
        $location.path('/start');
    } else {
        //        $rootScope.userFav = $rootScope.myFav;
           $scope.detail = function(tripId) {
            $rootScope.tripid = tripId;
			$scope.tripid=$rootScope.tripid;
			 detailData.detail()
                    .then(
                        /* success function */
                        function(data) {
                            $rootScope.TempDetail = data;
							$rootScope.detail=data;							 
                            $location.path('/app/detail');
							$ionicSlideBoxDelegate.update();
                        }, function(error) {
                            //If an error happened, handle it here
                        });
           
        }

        $scope.myFav = function(myfavtripID) {

            $ionicLoading.show({
                template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'
            });
            $http({
                method: 'POST',
                url: serviceLink.url + 'SaltieApp/rest/cruise/favourite/set',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: "tripId=" + myfavtripID
            }).success(function(data, status) {


                // console.log(data);
                if (status == 200) {


                    FavouriteService.addNew(myfavtripID);
                    //                    for (i = 0; i < $rootScope.userFav.length; i++) {
                    //                        if ($rootScope.userFav[i].tripId === myfavtripID)
                    //                            $rootScope.userFav.splice(i, 1);
                    //                    }

                    $ionicLoading.hide();
                } else {
                    alert("error");
                }
            }); //			var index=$rootScope.myFav.indexOf(myfavtripID);
            //			alert(index);
        }

        $scope.back = function() {
            window.history.back();
        }

    }



});