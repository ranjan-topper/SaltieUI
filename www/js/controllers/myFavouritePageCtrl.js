app.controller('myFavouritePageCtrl', function($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading, $localStorage, FavouriteService, $ionicHistory, serviceLink, detailData, $ionicSlideBoxDelegate, discountVal, $ionicPopup) {

    if (typeof analytics !== 'undefined') { analytics.trackView("My Favourite Controller"); }

    if ($localStorage.userName == "" || $localStorage.userName == null) {
        $location.path('/startingPage');
    } else {
        //        $rootScope.userFav = $rootScope.myFav;
        $scope.detail = function(tripId) {
            $rootScope.tripid = tripId;
            $scope.tripid = $rootScope.tripid;
            detailData.detail()
                .then(
                    /* success function */
                    function(data) {
                        $rootScope.TempDetail = data;
                        $rootScope.detail = data;
                        $location.path('/app/detailPage');
                        $ionicSlideBoxDelegate.update();
                    },
                    function(error) {
                        //If an error happened, handle it here
                    });

        }

        $scope.myFav = function(myfavtripID) {


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



        //discount Function
        $scope.discountCall = function(tripid) {
            var url = 'SaltieApp/rest/cruise/' + tripid + '/offers';
            discountVal.discount(url)
                .then(
                    /* success function */
                    function(data) {
                        $scope.showDiscountPopup(data);
                    },
                    function(error) {
                        //If an error happened, handle it here
                    });
        }


        $scope.showDiscountPopup = function(data) {
            // An elaborate, custom popup
            $scope.discountData = data;
            var discountPopup = $ionicPopup.show({
                templateUrl: './templates/listDiscount.html',
                title: 'Offers',
                scope: $scope,
                buttons: [{ // Array[Object] (optional). Buttons to place in the popup footer.
                    text: 'Ok',
                    onTap: function(e) {
                        // e.preventDefault() will stop the popup from closing when tapped.
                        discountPopup.close();
                    }
                }]
            });
        }


    }



});