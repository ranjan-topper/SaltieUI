app.controller('pasPageController', function($scope, $location, $rootScope, $timeout, $ionicTabsDelegate, serviceLink) {

    $rootScope.pasPageUrl = serviceLink.pasUrl + "CruisePAS/?hide-navigation=t";
    $rootScope.whoTravelUrl = serviceLink.pasUrl + "CruisePAS/#/whos-traveling?hide-navigation=t";
    $rootScope.categoryUrl = serviceLink.pasUrl + "CruisePAS/#/categories?hide-navigation=t";


    $scope.pasWhoTravelBack = function() {
        $location.path('/app/pasPage');
    }

    $scope.pasQuestionBack = function() {
        $location.path('/app/pasCategory');
    }

    $scope.pasCategoryBack = function() {
        $location.path('/app/pasWhoTravel');
    }

    $scope.pasModalBackButton = function() {
        $timeout(function() {
            $ionicTabsDelegate.$getByHandle('listTab').select(0);
        }, 100);
        $location.path('/app/list');
    }



    // $scope.$on('app.receiveMessageEvent', function(a, evt) {

    // 		  if (evt.data.index == 0) {
    // 			  $scope.categoryID=evt.data.category_id;
    // 			  $rootScope.questionUrl= serviceLink.pasUrl+"CruisePAS/#questions?category_id="+evt.data.category_id+"&index=0&hide-navigation=t";
    // //			   $timeout(function() {
    //         $location.path('/app/pasQuestion');
    // //            }, 100);
    // 		  } else if (evt.data == 'backArrow') {
    //        	$location.path('/app/pasWhoTravel');
    // 		  } else if (evt.data == 'Question') {
    // 			  $scope.pasBackbtShowFunc();
    // 		  } else if (evt.data == 'whoTravel') {
    // 			  $location.path('/app/pasCategory');
    // 		  } else if(evt.data.index != 0 && evt.data != 'backArrow' && evt.data != 'Question' && evt.data != 'whoTravel' && evt.data != 'Answer' && evt.data != 'backArrow' && evt.data != 'nextArrow' && evt.data.action != "FB_LOG") {
    // 					$scope.closePASModal(evt.data);
    // 			}


    // });
});