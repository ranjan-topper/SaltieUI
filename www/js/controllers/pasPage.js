app.controller('pasPageController', function($scope, $location, $rootScope, $filter, $localStorage, $http, $ionicLoading, FavouriteService, $timeout, curatorList, $window, $ionicViewService, $ionicTabsDelegate) {

    $rootScope.closePASModal = function(selectedData) {
      var neutral = '';
      var liked = '';
      var disliked = '';

      $scope.pasBackbtShow = false;

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
      curatorList.curator(liked, neutral, disliked)
        .then(
          /* success function */
          function(data) {
            $rootScope.curatorListIteamTemp = data.tripList;
            $rootScope.curatorListIteam = angular.copy($rootScope.curatorListIteamTemp);
            if ($rootScope.curatorListIteamTemp == undefined || $rootScope.curatorListIteamTemp == "") {
              $rootScope.noRecommendation = true;
            } else {
              $rootScope.noRecommendation = false;
            }
			$timeout( function() {
			$ionicTabsDelegate.$getByHandle('listTab').select(1);
		  	},100);
			 $location.path('/app/list');
            $ionicLoading.hide();

          }, function(error) {
            alert("There was a problem");
            console.log(error);
          });
    }

	$scope.pasWhoTravelBack = function()
	{
		$location.path('/app/pasPage');
	}
	
	$scope.pasQuestionBack = function()
	{
		$location.path('/app/pasCategory');
	}
	
	$scope.pasCategoryBack = function()
	{
		$location.path('/app/pasWhoTravel');
	}
	
	
	
    $scope.pasModalBackButton = function() {
		  $timeout( function() {
		$ionicTabsDelegate.$getByHandle('listTab').select(1);
		  },100);
		$location.path('/app/list');

//      $scope.pasBackBtFlag = $scope.pasBackBtFlag - 1;
//		if($scope.pasBackbtShow == false)
//		{
//			window.location.history.go(-2);
//		}
//		else
//		{
//			      window.history.back();
//
//		}

    }
//    $rootScope.pasBackbtShowFunc = function() {
//      $scope.pasBackBtFlag = $scope.pasBackBtFlag + 1;
//     $scope.pasBackbtShow = true;
//    }

//    $scope.flagCheck = function() {
//      if ($scope.pasBackBtFlag <= 0) {
//        $scope.pasBackbtShow = false;
//      } else {
//        $scope.pasBackbtShow = true;
//      }
//    }

	
	
  $window.addEventListener('message', function(e) {
      $scope.$broadcast('app.receiveMessageEvent', e);
    })


   
    $scope.$on('app.receiveMessageEvent', function(a, evt) {

		  if (evt.data.index == 0) {
			  $scope.categoryID=evt.data.category_id;
			  $rootScope.questionUrl= "http://159.203.121.122:8080/TestPAS/#questions?category_id="+evt.data.category_id+"&index=0&hide-navigation=t";
//			   $timeout(function() {
                 $location.path('/app/pasQuestion');
//            }, 100);
			

		  } else if (evt.data == 'backArrow') {

       			$location.path('/app/pasWhoTravel');

		  } else if (evt.data == 'Question') {

			$scope.pasBackbtShowFunc();
		  } else if (evt.data == 'whoTravel') {

			$location.path('/app/pasCategory');
		  }

		else if(evt.data.index != 0 && evt.data != 'backArrow' && evt.data != 'Question' && evt.data != 'whoTravel' && evt.data != 'Answer' && evt.data != 'backArrow' && evt.data != 'nextArrow') {
		
					$scope.closePASModal(evt.data);
			}
      $scope.$apply();
    });
	
	
});
