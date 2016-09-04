app.controller('listController', function($scope, $location, $rootScope, $filter, $localStorage, $http, $ionicLoading, FavouriteService, $timeout, $ionicScrollDelegate, $ionicModal, loginService, facebookService, serviceLink, favService, $ionicPopup, $q, detailData, $ionicSlideBoxDelegate, curatorList, $window) {


  if (typeof analytics !== 'undefined') {
    analytics.trackView("List Controller");
  }

  //    HardwareBackButtonManager.enable();
  if ($localStorage.userName == "" || $localStorage.userName == null) {
    $location.path('/start');
  } else {

    $rootScope.is_engaged = "list";
    $rootScope.userFav = [];
    $rootScope.favourite = [];
    $rootScope.list = [];
    $scope.dayCount = [];
    $rootScope.totalDisplayed = 0;
    $rootScope.noMoreItemsAvailable = false;
    $rootScope.page = "list";
    $scope.favoriteId = 0;
    $scope.pasBackBtFlag = 0;


    $ionicModal.fromTemplateUrl('templates/pasModal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.pasModal = modal;
    });



    //function to determine the favourited cruise
    $rootScope.isFavourite = function(tripId) {
      for (i = 0; i < $rootScope.favourite.length; i++) {
        if ($rootScope.favourite[i] == tripId)
          return true;
      }
      return false;
    }


    //load 10 data in list page and loadmore functionality
    $rootScope.loadMore = function() {
      console.log($rootScope.filterShipPort1.style);
      var q = $q.defer();
      $http.get(
        serviceLink.url + 'SaltieApp/rest/cruise/search?lifestyle=' + $rootScope.filterShipPort1.style + '&duration=' + $rootScope.filterShipPort1.duration + '&year=' + $rootScope.filterShipPort1.year + '&month=' + $rootScope.filterShipPort1.month + '&sortBy=' + $rootScope.filterShipPort1.orderby + '&departPort=' + $rootScope.filterShipPort1.ports + '&userName=' + $localStorage.userName + '&shipName=' + $rootScope.filterShipPort1.ship + "&cruiseLineName=" + $rootScope.filterShipPort1.cruiseLine + "&page=" + $scope.totalDisplayed
      )
        .success(function(data) {
          var i = data.tripList.length; //get the total length
          $rootScope.countCruise = data.AllCount;
          $ionicLoading.hide(); //hide the loading screen
          if (i != 0) {
            if ($rootScope.totalDisplayed == 0) {
              $rootScope.count = data.AllCount;
              $rootScope.countSailing = data.TotalSailing;
            }
            $rootScope.list = $rootScope.list.concat(data.tripList); //concat 10-10 data for each call
            $rootScope.favourite = data.favourite;
            console.log($scope.totalDisplayed);
            console.log($rootScope.list.length);
            $rootScope.totalDisplayed += 10;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          } else {
            $rootScope.noMoreItemsAvailable = true; //cancel loadmore functionality when no data
          }
          q.resolve();
        });
      return q.promise;
    }



    //changing the icon for the favourite and unfavourite
    $rootScope.isFavorite = function(tripId) {
      $rootScope.URL = "./img/Unfavorite.png";
      for (i = 0; i < $rootScope.favourite.length; i++) {

        if ($rootScope.favourite[i] === tripId) {
          $rootScope.URL = "./img/Favorite.png";
          break;
        }
      }
      return $rootScope.URL;
    }

    //function to make the itinerary favourite
    $scope.favorite = function(tripId, index) {
      //if the user is not logged in show the logsignmodal
      if ($localStorage.userName == "Guest") {
        $rootScope.tripidfav = tripId;
        $rootScope.indexfav = index;
        $rootScope.logSignClicked = "Favourite";
        $rootScope.logsignModal.show();
      }
      //else call the favservice
      else {
        favService.favorite(tripId, index);
      }
    }

    //function which fecth the data for detail page when itinerary is clicked
    $scope.detail = function(tripId) {
      $rootScope.tripid = tripId;
      $scope.tripid = $rootScope.tripid;
      detailData.detail()
        .then(
          /* success function */
          function(data) {
            $rootScope.TempDetail = data;
            $rootScope.detail = data;
            $location.path('/app/detail');
            $ionicSlideBoxDelegate.update();
          }, function(error) {
            //If an error happened, handle it here
          });
    }


    //tab function

    $scope.onFilterTabSelected = function() {
			$scope.pasBackBtFlag = 0;
		  $scope.filterIconShow = true;
		  $scope.filterCount = true;

    }
    $scope.onFilterTabDeselected = function() {
      $scope.filterCount = false;
      $scope.filterIconShow = false;
    }



    $scope.onCuratorTabSelected = function() {
		$scope.pasBackBtFlag = 1;
		console.log($scope.curatorListIteam);

      $scope.curatorCount = true;
      $scope.CuratorIconShow = true;
      if ($rootScope.curatorListIteamTemp == undefined || $rootScope.curatorListIteamTemp == "") {
        $rootScope.noRecommendation = true;
        $scope.showPASFilter();
      } else {
        $rootScope.noRecommendation = false;
      }


    }
    $scope.onCuratorTabDeselected = function() {
      $scope.curatorCount = false;
      $scope.CuratorIconShow = false;
    }



    //back button function
    $scope.back = function() {
      $rootScope.page = "lifestyle";
		if($scope.pasBackBtFlag == 1 && $rootScope.noRecommendation == true)
		{
			 $location.path('/app/pasPage');
		}
		else if($scope.pasBackBtFlag == 1 && $rootScope.noRecommendation == false)
		{
			$location.path('/app/pasCategory');
		}
		else
		{
			$location.path('/app/lifeStyle');
		}
      
    }



    $scope.showPASFilter = function() {
       $location.path('/app/pasPage');
    }
  $scope.showCategoryPage = function()
  {
	         $location.path('/app/pasCategory');

  }




  }
});
