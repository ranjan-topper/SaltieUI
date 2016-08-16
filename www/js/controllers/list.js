app.controller('listController', function($scope, $location, $rootScope, $filter, $localStorage, $http, $ionicLoading, FavouriteService, $timeout, $ionicScrollDelegate, $ionicModal, loginService, facebookService, serviceLink, favService,$ionicPopup,$q,detailData,$ionicSlideBoxDelegate,curatorList) {
	

	if(typeof analytics !== 'undefined') { analytics.trackView("List Controller"); }
	
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
		$scope.flagForError = '';
		
		
		
		
		
      	$ionicModal.fromTemplateUrl('templates/pasModal.html', {
				            	scope: $scope
				        		}).then(function(modal) {
				            	$scope.pasModal = modal;
				        		});
 
		
		
		//function to determine the favourited cruise
		$rootScope.isFavourite=function(tripId)
		{
    		for(i=0;i<$rootScope.favourite.length;i++){
        	if($rootScope.favourite[i]==tripId)
            return true;
    		}
    		return false;
		}


        //load 10 data in list page and loadmore functionality
        $rootScope.loadMore = function() {
						console.log($rootScope.filterShipPort1.style);
						var q = $q.defer();
            $http.get(
                serviceLink.url + 'SaltieApp/rest/cruise/search?lifestyle='+$rootScope.filterShipPort1.style+'&duration='+$rootScope.filterShipPort1.duration+'&year='+$rootScope.filterShipPort1.year+'&month='+$rootScope.filterShipPort1.month+'&sortBy='+$rootScope.filterShipPort1.orderby+'&departPort='+$rootScope.filterShipPort1.ports+'&userName='+$localStorage.userName+'&shipName='+$rootScope.filterShipPort1.ship + "&cruiseLineName="+$rootScope.filterShipPort1.cruiseLine+"&page=" + $scope.totalDisplayed
            )
            .success(function(data) {
                var i = data.tripList.length;//get the total length
				$rootScope.countCruise=data.AllCount;
				$ionicLoading.hide();//hide the loading screen
                if (i != 0) {
                    if ($rootScope.totalDisplayed == 0) {
                       $rootScope.count=data.AllCount;
                       $rootScope.countSailing=data.TotalSailing;
                    }
                    $rootScope.list = $rootScope.list.concat(data.tripList);//concat 10-10 data for each call
                    $rootScope.favourite = data.favourite;
                    console.log($scope.totalDisplayed);
                    console.log($rootScope.list.length);
                    $rootScope.totalDisplayed += 10;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                } 
				else {
                    $rootScope.noMoreItemsAvailable = true;//cancel loadmore functionality when no data
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
				$rootScope.logSignClicked="Favourite";
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
		
		
		//tab function
		
		$scope.onFilterTabSelected=function()
		{
			
			$scope.filterIconShow=true;
			$scope.filterCount=true;

		}
		$scope.onFilterTabDeselected=function()
		{
			$scope.filterCount=false;
			$scope.filterIconShow=false;
		}
		
		
		
		$scope.onCuratorTabSelected=function()
		{
						console.log($scope.curatorListIteam);

			$scope.curatorCount=true;
			$scope.CuratorIconShow=true;
			 if($rootScope.curatorListIteamTemp == undefined || $rootScope.curatorListIteamTemp == "")
			 {
			 	$scope.noRecommendation=true;
				$scope.showPASFilter();
			 }
			 else
			 {
			 	$scope.noRecommendation=false;
			 }

			
		}
		$scope.onCuratorTabDeselected=function()
		{
			$scope.curatorCount=false;
			$scope.CuratorIconShow=false;
		}
		
		

		//back button function
        	$scope.back = function() {
			$rootScope.page="lifestyle";
            $location.path('/app/lifeStyle');
        }
			
			
			
			$scope.showPASFilter=function()
			{
				 $scope.pasModal.show();
//				var webFrame = angular.element(document.getElementById('PASframe'));
//				console.log(webFrame);
		
				
			}
			 $scope.clickOnIframe=function()
			 {
				 		var x = document.getElementById("PASframe");
 				x.contentWindow.document.onclick = function() {
        	console.log("frame contents clicked");
    };
			 }
			



			$rootScope.closePASModal=function(selectedData)
            {
					var neutral ='';
					var liked ='';
					var disliked ='';

				$scope.pasBackbtShow = false;
						
            	console.log(selectedData);
				if(selectedData[0].liked != undefined)
				{
					var likedData = JSON.parse(selectedData[0].liked);

					angular.forEach(likedData , function(value, key) {
  					liked += value + ',';
					});
					liked = liked.substring(0, liked.length - 1);

						console.log(liked);
				}
				if(selectedData[1].disliked != undefined)
				{
					var dislikedData = JSON.parse(selectedData[1].disliked);
					angular.forEach(dislikedData, function(value, key) {
  					disliked += value + ',';
					});
					disliked = disliked.substring(0, disliked.length - 1);

						console.log(disliked);
				}

				if(selectedData[2].neutral != undefined)
				{
					var neutralData = JSON.parse(selectedData[2].neutral);
					angular.forEach(neutralData, function(value, key) {
  					neutral += value + ',';
					});
					neutral = neutral.substring(0, neutral.length - 1);

						console.log(neutral);
				}
 				curatorList.curator(liked,neutral,disliked)
                    .then(
                        /* success function */
                        function(data) {
								$rootScope.curatorListIteamTemp=data.tripList;
								$rootScope.curatorListIteam=angular.copy($rootScope.curatorListIteamTemp);
								 if($rootScope.curatorListIteamTemp == undefined || $rootScope.curatorListIteamTemp == "")
								 {
								 	$scope.noRecommendation=true;
								 }
								 else
								 {
								 	$scope.noRecommendation=false;
								 }


								$scope.pasModal.remove(); 
								$scope.pasBackBtFlag = 0;
								$scope.flagForError = 'twice';
								$ionicModal.fromTemplateUrl('templates/pasModal.html', {
				            	scope: $scope
				        		}).then(function(modal) {
				            	$scope.pasModal = modal;
				        		});                               
								$ionicLoading.hide();

                        },function(error) {
                alert("There was a problem");
                console.log(error);
            });



            }

            $scope.pasModalBackButton=function()
			{
				if($scope.flagForError == 'twice')
				{
					$scope.pasBackBtFlag = $scope.pasBackBtFlag - 2;
				}
				else
				{
					$scope.pasBackBtFlag = $scope.pasBackBtFlag - 1;
				}
				
				parent.history.back();
				$scope.flagCheck();

			}
			$rootScope.pasBackbtShowFunc = function()
			{
				$scope.pasBackBtFlag = $scope.pasBackBtFlag + 1;
				$scope.pasBackbtShow = true;
			}
			
			$scope.flagCheck = function()
			{
				if($scope.pasBackBtFlag == 0)
				{
					$scope.pasBackbtShow = false;
				}
				else
				{
					$scope.pasBackbtShow = true;
				}
			}
			
          
		
      }
});