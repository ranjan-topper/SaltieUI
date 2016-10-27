app.controller('listController', function($scope, $location, $rootScope, $localStorage, $http, $ionicLoading, $timeout, $ionicModal, serviceLink, favService, $ionicPopup, $q, detailData, $ionicSlideBoxDelegate, curatorList, themeFilter, discountVal, $ionicTabsDelegate, $ionicScrollDelegate, $window, $state) {


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
        $scope.dayCount = [];
        $rootScope.totalDisplayed = 0;
        $rootScope.noMoreItemsAvailable = false;
        $rootScope.page = "list";
        $scope.favoriteId = 0;
        $scope.pasBackBtFlag = 0;
        $rootScope.reachedPASCategory = false;
        if ($rootScope.curatorListIteamTemp == undefined || $rootScope.curatorListIteamTemp == "") {
            $rootScope.noRecommendation = true;
            $rootScope.curatorListIteamTemp = [];
            $rootScope.noMoreCuratorItemsAvailable = true;
        } else {
            $rootScope.noRecommendation = false;
            $rootScope.noMoreCuratorItemsAvailable = false;
        }

        //function to determine the favourited cruise
        $rootScope.isFavourite = function(tripId) {
            for (i = 0; i < $rootScope.favourite.length; i++) {
                if ($rootScope.favourite[i] == tripId)
                    return true;
            }
            return false;
        }

        //filter functionality
        $rootScope.showFilter = function() {
            if ($rootScope.applyFilterFlag == 0) {
                $rootScope.clickFilterFlag = 0;
            }
            if ($rootScope.clickFilterFlag == 0) {
                $rootScope.filterModal.show();
                $rootScope.preStyle = "";
                $rootScope.preDuration = "";
                $rootScope.filterShipPort = {
                    style: "All",
                    duration: "",
                    year: "",
                    month: "",
                    ports: "",
                    ship: "",
                    orderby: "asc",
                    cruiseLine: "",
                    flag: -1
                };
                document.getElementById("portName").selectedIndex = 0;
                document.getElementById("cruiseLine").selectedIndex = 0;
                document.getElementById("shipName").selectedIndex = 0;
                for (i = 0; i < $rootScope.month.length; i++) {
                    for (j = 0; j < 12; j++) {
                        $rootScope.month[i][j].value = false;
                    }
                }
                $rootScope.filterLifstyle();
                $rootScope.clickFilterFlag = 1;
            } else {
                $rootScope.shipPort = $rootScope.shipPort1;
                $timeout(function() {
                    $rootScope.filterShipPort.style = $rootScope.backArrow.expType;
                    $rootScope.preStyle = $rootScope.backArrow.expType;
                    $rootScope.preDuration = $rootScope.backArrow.duration;
                    $rootScope.filterShipPort.duration = $rootScope.backArrow.duration;
                    $rootScope.filterShipPort.orderby = $rootScope.backArrow.orderBy;
                    $rootScope.resetDateMonth($rootScope.backArrow.month1, 0);
                    $rootScope.resetDateMonth($rootScope.backArrow.month2, 1);
                    $rootScope.resetDateMonth($rootScope.backArrow.month3, 2);
                    document.getElementById("cruiseLine").selectedIndex = $rootScope.backArrow.cruiseLine;
                    document.getElementById("portName").selectedIndex = $rootScope.backArrow.port;
                    document.getElementById("shipName").selectedIndex = $rootScope.backArrow.ship;
                }, 100);
                $rootScope.filterModal.show();
            }
        }

        $rootScope.filterLifstyle = function() {
            if ($rootScope.filterShipPort.style == "All") {
                $rootScope.filterShipPort.style = "";
            }
            themeFilter.theme($rootScope.filterShipPort)
                .then(
                    /* success function */
                    function(data) {
                        $rootScope.shipPort = data;
                        $ionicLoading.hide();
                    },
                    function(error) {
                        alert("There was a problem");
                        console.log(error);
                    });
            $rootScope.filterModal.show();
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
                            $rootScope.listCount = data.AllCount;
                            $rootScope.listCountSailing = data.TotalSailing;
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

        //load 10 data in curator listing page
        $scope.loadMoreCurator = function() {
            $scope.curatorListServiceCall($localStorage.liked, $localStorage.neutral, $localStorage.disliked);
        }
        $scope.curatorListServiceCall = function(liked, neutral, disliked) {

            curatorList.curator(liked, neutral, disliked, $rootScope.startFromList)
                .then(
                    /* success function */
                    function(data) {
                        var i = data.tripList.length; //get the total length
                        if (i != 0) {
                            $rootScope.startFromList = $rootScope.startFromList + 10;
                            $rootScope.totalCuratorList = data.totalCount;
                            $rootScope.curatorListIteamTemp = $rootScope.curatorListIteamTemp.concat(data.tripList);
                            $rootScope.curatorListIteam = angular.copy($rootScope.curatorListIteamTemp);
                            $timeout(function() {
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                            }, 500);
                            $scope.$broadcast('scroll.resize');
                            if ($rootScope.curatorListIteamTemp == undefined || $rootScope.curatorListIteamTemp == "") {
                                $rootScope.noRecommendation = true;
                            } else {
                                $rootScope.noRecommendation = false;
                                $rootScope.noMoreCuratorItemsAvailable = false;
                            }
                        } else {
                            if ($rootScope.curatorListIteamTemp.length == 0) {
                                $rootScope.noRecommendation = true;
                            }
                            $rootScope.noMoreCuratorItemsAvailable = true;
                        }
                    },
                    function(error) {
                        alert("There was a problem");
                        console.log(error);
                    });
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
                    },
                    function(error) {
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
            $scope.curatorCount = true;
            $scope.CuratorIconShow = true;
            if ($rootScope.curatorListIteamTemp == undefined || $rootScope.curatorListIteamTemp == "") {
                $rootScope.noRecommendation = true;
                if ($rootScope.firstTimeSelected == 0) {
                    $scope.showPASFilter();
                    $rootScope.firstTimeSelected = 1;
                } else if (!$rootScope.reachedPASCategory) {
                    if (!$rootScope.flagClickedShowRecom) {
                        $location.path('/app/pasWhoTravel');
                    }
                } else {
                    if (!$rootScope.flagClickedShowRecom) {
                        $location.path('/app/pasCategory');
                    }
                }

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
            if ($scope.pasBackBtFlag == 1 && $rootScope.noRecommendation == true) {
                $location.path('/app/pasCategory');
            } else if ($scope.pasBackBtFlag == 1 && $rootScope.noRecommendation == false) {
                $location.path('/app/pasCategory');
            } else {
                $rootScope.page = "lifestyle";
                $location.path('/app/lifeStyle');
            }

        }

        $scope.showPASFilter = function() {
            if ($rootScope.firstTimeSelected == 0) {
                $location.path('/app/pasPage');
            } else {
                $scope.showCategoryPage();
            }
        }
        $scope.showCategoryPage = function() {
            $location.path('/app/pasCategory');
        }

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


        $scope.closePASModal = function(selectedData) {
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
            $localStorage.liked = liked;
            $localStorage.neutral = neutral;
            $localStorage.disliked = disliked;
            $rootScope.noMoreCuratorItemsAvailable = true;
            $rootScope.curatorListIteam = [];
            $rootScope.curatorListIteamTemp = [];
            $rootScope.noRecommendation = false;
            $rootScope.startFromList = 0;
            $scope.curatorListServiceCall(liked, neutral, disliked);
            $timeout(function() {
                $ionicTabsDelegate.$getByHandle('listTab').select(1);
                $ionicScrollDelegate.$getByHandle('CuratorlistPage').scrollTop();
            }, 100);
            $rootScope.flagClickedShowRecom = true;
            $location.path('/app/list');
        }


        $window.addEventListener('message', function(evt) {
            var task = evt.data.task; // task received in postMessage
            switch (task) { // postMessage tasks
                // begin button clicked
                case 'beginBt':
                    $state.go('app.pasWhoTravel');
                    break;

                    // whoTravel next button clicked
                case 'whoTravel':
                    $state.go('app.pasCategory');
                    $rootScope.reachedPASCategory = true;
                    break;

                    // when back arrow in the slider clicked
                case 'slideBack':
                    $state.go('app.pasCategory');
                    break;
                    //show recommendation clicked
                case 'recom':
                    $scope.closePASModal(evt.data.selectedItem);
                    break;
                    //any category clicked
                case 'categoryId':
                    $scope.categoryID = evt.data.category_id;
                    $rootScope.questionUrl = serviceLink.pasUrl + "CruisePAS/#questions?category_id=" + evt.data.category_id + "&index=0&hide-navigation=t";
                    //			   $timeout(function() {
                    $state.go('app.pasQuestion');
                    //            }, 100);
                    break;

                    //default:
            }
            $scope.$apply();
        }, true)

    }
});