app.controller('pasPageController', function($scope, $location, $rootScope, $http, $ionicLoading, $timeout, curatorList, $window, $ionicTabsDelegate, $localStorage,  $ionicScrollDelegate) {

	$scope.pasUrl = "http://104.236.50.241/";
//	$scope.pasUrl = "http://159.203.121.122:8080/";
	
	$rootScope.pasPageUrl = $scope.pasUrl +"CruisePAS/?hide-navigation=t";
	$rootScope.whoTravelUrl = $scope.pasUrl +"CruisePAS/#/whos-traveling?hide-navigation=t";
	$rootScope.categoryUrl = $scope.pasUrl +"CruisePAS/#/categories?hide-navigation=t";
	
	  $scope.flagDuplicateCall = false;
    $rootScope.closePASModal = function(selectedData) {
      var neutral = '';
      var liked = '';
      var disliked = '';
      if($scope.flagDuplicateCall == true)
      return;
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
      $localStorage.liked = liked;
      $localStorage.neutral = neutral;
      $localStorage.disliked = disliked;
      $rootScope.noMoreCuratorItemsAvailable = false;
      $rootScope.curatorListIteam = [];
      $rootScope.curatorListIteamTemp = [];
      $rootScope.startFromList = 0;
      $rootScope.curatorListServiceCall(liked, neutral, disliked);
      $timeout( function() {
            $ionicTabsDelegate.$getByHandle('listTab').select(1);
            $ionicScrollDelegate.$getByHandle('CuratorlistPage').scrollTop();
              },100);
      $location.path('/app/list');
      $scope.flagDuplicateCall = true;
      $ionicLoading.hide();
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
    }

    $window.addEventListener('message', function(e) {
      $scope.$broadcast('app.receiveMessageEvent', e);
    }) 

    $scope.$on('app.receiveMessageEvent', function(a, evt) {

		  if (evt.data.index == 0) {
			  $scope.categoryID=evt.data.category_id;
			  $rootScope.questionUrl= $scope.pasUrl+"CruisePAS/#questions?category_id="+evt.data.category_id+"&index=0&hide-navigation=t";
//			   $timeout(function() {
        $location.path('/app/pasQuestion');
//            }, 100);
		  } else if (evt.data == 'backArrow') {
       	$location.path('/app/pasWhoTravel');
		  } else if (evt.data == 'Question') {
			  $scope.pasBackbtShowFunc();
		  } else if (evt.data == 'whoTravel') {
			  $location.path('/app/pasCategory');
		  } else if(evt.data.index != 0 && evt.data != 'backArrow' && evt.data != 'Question' && evt.data != 'whoTravel' && evt.data != 'Answer' && evt.data != 'backArrow' && evt.data != 'nextArrow' && evt.data.action != "FB_LOG") {
					$scope.closePASModal(evt.data);
			}
      $scope.$apply();
    });
	
	
});
