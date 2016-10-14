app.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicHistory, $localStorage, $location, $ionicLoading, $http, $rootScope, $state, serviceLink, $window, profileGet, profileSet, $ionicPopup, TokenStorage) {

    if (typeof analytics !== 'undefined') {
        analytics.trackView("App Main Controller");
    }
    $scope.screenWidth = screen.width;
    $rootScope.clickFilterFlag = 0;
    $rootScope.applyFilterFlag = '';
    $rootScope.filterShipPort = {
        style: "",
        duration: "",
        year: "",
        month: "",
        ports: "",
        ship: "",
        orderby: "asc",
        cruiseLine: "",
        flag: -1
    };
    $rootScope.filterShipPort1 = {
        style: "",
        duration: "",
        year: "",
        month: "",
        ports: "",
        ship: "",
        orderby: "asc",
        cruiseLine: "",
        flag: -1
    };
    $rootScope.shipPort = {
        lifestyle: "",
        duration: "",
        cruiseLineName: "",
        ports: "",
        shipName: "",
        year: "",
        month: ""
    };
    $rootScope.backArrow = {
        ship: 0,
        cruiseLine: 0,
        port: 0,
        month1: "",
        month2: "",
        month3: "",
        expType: "",
        duration: "",
        orderBy: "asc"
    };
    //		$rootScope.month=[];
    $rootScope.preStyle = "";

    $scope.myFavourite = function () {
        //service part of myfavourite page start
        $http({
            method: 'GET',
            url: serviceLink.url + 'SaltieApp/rest/cruise/favourite/list'
        }).success(function (data) {
            /*
                $rootScope.myFav = data.tripList;//myfav success is assigned to rootscope so that it can be accessed by all the controller
*/
            $rootScope.userFav = data.tripList;
            $location.path('/app/myFavourite');
        });

    }


    $scope.loginData = {};

    $scope.logout = function () {
        if ($rootScope.clickFilterFlag != 0) {
            $rootScope.resetFilterHome();
        }
        delete $localStorage.stylelife;
        delete $localStorage.userName;
        delete $localStorage.Name;
        TokenStorage.clear();
        // $localStorage.Name = "Guest";
        //delete $localStorage.auth_token;
        delete $localStorage.accessToken;
        delete $localStorage.emailver;
        $state.go('start', {}, {
            reload: true
        }).then(function () {
            setTimeout(function () {
                $window.location.reload(true);
            }, 500);
        })
    }

    $scope.home = function () {
        //		$rootScope.applyFilterFlag=0;
        $rootScope.engageData = "";
        //		if($rootScope.clickFilterFlag!=0)
        //		{
        //			$rootScope.backArrow={ship:0,cruiseLine:0,port:0,month1:"",month2:"",month3:"",expType:"",duration:"",orderBy:"asc"}; 
        //			$rootScope.filterShipPort1={style:"All",duration:"",year:"",month:"",ports:"",ship:"",orderby:"asc",cruiseLine:"",flag:-1};
        //			$rootScope.resetFilterHome();
        //			
        //		}
        $localStorage.stylelife = "All";
        $rootScope.count = $rootScope.lifestylecount['All'];
        $location.path('/app/lifeStyle');


    }


    /* ==========================================================================
  						engage User functionality
   	========================================================================== */

    $scope.engageClick = function (type) {
        if ($localStorage.userName == "Guest") {
            //             $rootScope.logSignClicked = "nextStep";
            $rootScope.logSignClicked = "engageUs";
            $rootScope.logsignModal.show();
        } else {
            $rootScope.buttonType = "Select Room Type";

            //$rootScope.TempDetail = angular.copy($rootScope.engageData);
            $location.path('/app/engageUser');
        }
    }

});