app.controller('detailController', function($scope, $state, $location, $ionicModal, $rootScope, $http, $ionicLoading, $localStorage, $ionicSlideBoxDelegate, $ionicScrollDelegate, $timeout, $ionicHistory, serviceLink, favService, $sce, discountVal) {

    if (typeof analytics !== 'undefined') { analytics.trackView("Detail Controller"); }

    if ($localStorage.userName == "" || $localStorage.userName == null) {
        $location.path('/start');
    } else {


        //		$rootScope.discountValue = [{"cruiseLine":"Royal Caribean","color":"orange","shortDesc":"offer 1","longDesc":"up $1000 cashback","bookStartDate":"Feb 12, 2016","bookEndDate":"Feb 28, 2016","sailStartDate":null,"sailEndDate":null,"active":true},{"cruiseLine":"Royal Caribean","color":"red","shortDesc":"offer 1","longDesc":"up $1000 cashback","bookStartDate":"Feb 12, 2016","bookEndDate":"Feb 28, 2016","sailStartDate":null,"sailEndDate":null,"active":true}];

        $rootScope.is_engaged = "detail";
        $rootScope.load = false;
        $rootScope.page = "detail";


        $scope.openDiscountModal = function() {
            $scope.discountModal.show();
            $rootScope.slideIndex = 0;
        }
        $rootScope.discountCall = function() {
            var url = 'SaltieApp/rest/cruise/' + $rootScope.tripid + '/offers/' + $rootScope.date + '/date';
            discountVal.discount(url)
                .then(
                    /* success function */
                    function(data) {
                        $rootScope.discountValue = data;

                    },
                    function(error) {
                        //If an error happened, handle it here
                    });
        }
        $scope.discountCall = function(date, first) {
            if (first) {
                console.log(date);
                $rootScope.discountCall();
            }
        }

        $rootScope.isFavorite = function(tripId) {
            $rootScope.URL = "./img/Unfavorite.png";
            if ($rootScope.favourite == null || $rootScope.favourite == undefined || $rootScope.favourite == "") {

                for (i = 0; i < $rootScope.userFav.length; i++) {
                    if ($rootScope.userFav[i].tripId === tripId) {
                        $rootScope.URL = "./img/Favorite.png";
                        break;
                    }
                }
            } else {

                for (i = 0; i < $scope.favourite.length; i++) {

                    if ($rootScope.favourite[i] === tripId) {
                        $rootScope.URL = "./img/Favorite.png";
                        break;
                    }
                }
            }
            return $rootScope.URL;

        }


        $scope.favorite = function(tripId, index) {
                if ($localStorage.userName == "Guest") {
                    $rootScope.tripidfav = tripId;
                    $rootScope.indexfav = index;
                    $rootScope.logSignClicked = "Favourite";
                    $rootScope.logsignModal.show();

                } else {
                    favService.favorite(tripId, index);
                }
            }
            //for hiding the more arrow button when it reach the end position
        $rootScope.show = false;
        $rootScope.show1 = false;

        $scope.scrollend = function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $rootScope.show = true;
        }

        $scope.enable = function() {
            $rootScope.show = false;
        }

        $scope.scrollend1 = function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $rootScope.show1 = true;
        }

        $scope.enable1 = function() {
                $rootScope.show1 = false;
            }
            //arrow button hide end here



        $scope.notSorted = function(obj) {
            if (!obj) {
                return [];
            }
            return Object.keys(obj);
        }
        $scope.scrollleft = function() {
            $timeout(function() {
                $ionicScrollDelegate.$getByHandle('calendarScroll1').scrollBy(87, 0, true);
            }, 100);
        }

        $scope.scrollleft1 = function() {
            $timeout(function() {
                $ionicScrollDelegate.$getByHandle('calendarScroll').scrollBy(87, 0, true);
            }, 100);
        }


        $scope.browserwindow = function() {

            window.open('https://ui.odysol.com/web/cruises/details.aspx?pid=677392', '_blank', 'closebuttoncaption=back');
            return false;

        }
        $rootScope.moreLoad = false;
        $scope.tripID = $rootScope.tripid;



        $scope.back = function() {
            $rootScope.tripid = '';
            $rootScope.TempDetail = "";
            window.history.back();
            console.log($rootScope.TempDetail);
            $rootScope.engageData = $rootScope.TempDetail;
        }

        $rootScope.CabinIndex = 0;
        $scope.index1 = 0;
        $scope.isActive = function(index2) {
            //alert($scope.index1==index2);
            return $scope.index1 == index2;
        }

        $scope.isCabinActive = function(index) {
            return $rootScope.CabinIndex == index;
        }

        $scope.displayPrice = function(prices, index, date) {
            $rootScope.date = date;
            $rootScope.sailID = prices.sailingId;
            $rootScope.pID = prices.pid;
            $rootScope.priceList = prices.category;
            $scope.index1 = index;
            if ($rootScope.pID == "NA") {
                $rootScope.pidVivaUrl = 'https://res.vivavoyage.com/Web/cruises/details.aspx?pid=874684';
            } else {
                $rootScope.pidVivaUrl = 'https://res.vivavoyage.com/Web/cruises/details.aspx?pid=' + $rootScope.pID;
            }

            $rootScope.discountCall();
        };

        $rootScope.book1 = function(modal) {
            $scope.useragent = navigator.userAgent;
            $location.path('/app/booking');
        }



        $scope.getEncryptedString = function(sWord) {
            var sToEncrypt = sWord;
            var sXorKey = sToEncrypt.length;
            var sResult = ""; //the result will be here

            for (i = 0; i < sToEncrypt.length; ++i) {
                sResult += String.fromCharCode(sXorKey ^ sToEncrypt.charCodeAt(i));
            }
            return sResult;
        }




        $rootScope.share = function() {
            if ($localStorage.userName == "Guest") {
                $rootScope.logSignClicked = "share";
                $rootScope.logsignModal.show();
            } else {
                //				var url="http://104.236.50.241:8080/Saltie-site/index.html?trip="+btoa($scope.tripID).split('=')[0]+"&user="+btoa($localStorage.Name).split('=')[0];

                var url = "http://stage-share.saltie.cruises/Saltie-site/index.html?trip=" + btoa($scope.tripID).split('=')[0] + "&user=" + btoa($localStorage.Name).split('=')[0];
                console.log(url);
                window.plugins.socialsharing.share("This exciting cruise is brought to you by Saltie.", $rootScope.detail.tripDetails.tripDesc, null, url);
            }
        }




        $scope.showVideo = function() {
            window.open($rootScope.detail.tripDetails.ship.videoUrl + '?autoplay=1', '_blank', 'closebuttoncaption=back');
            return false;
        }



        $scope.showVideoCheck = function() {
            if ($rootScope.detail.tripDetails.ship.videoImage == "" || $rootScope.detail.tripDetails.ship.videoImage == null || $rootScope.detail.tripDetails.ship.videoImage == "NA") {
                return false;
            } else {
                return true;
            }
        }


        $scope.dateFormat = function(date1, index) {

                var date2 = new Date(date1);
                date2.setDate(date2.getDate() + index);
                //alert(date2);
                return date2;

            }
            //Next Step functionality
        $rootScope.emailUs = function(type) {
            $rootScope.buttonType = type;
            if (type == "detail") {
                $rootScope.buttonType = "Select Room Type";
            }
            // alert(type);
            $rootScope.logSignClicked = "nextStep";
            if ($localStorage.userName == "Guest") {
                $rootScope.logsignModal.show();
            } else {
                //                $scope.engageUser($rootScope.logSignClicked);
                $location.path('/app/engageUser');
            }
        }
    }
});