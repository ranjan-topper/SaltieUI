app.controller('lifeStyleCtrl', function($scope, $location, $http, $rootScope, $filter, $localStorage, $ionicLoading, serviceLink, $ionicModal,themeFilter,$ionicPopup,advanceFilter,$ionicScrollDelegate,$ionicSlideBoxDelegate,$timeout, facebookService) {
	//initialise the rootscope details value
    $rootScope.TempDetail = "";
    $rootScope.engageData = "";
	$rootScope.buttonType = "Select Room Type";
	$rootScope.firstTimeSelected = 0;
	if($localStorage.userName=="Guest")
	{
		$rootScope.loginLogout="Login";
		$rootScope.showMyFav=true;
		$rootScope.showEngage=true;
		$rootScope.hidePhBook=false;
		$rootScope.showProfileSet=true;
	}
	else{
		$rootScope.showMyFav=false;
		$rootScope.showEngage=false;
        $rootScope.hidePhBook=true;
		$rootScope.loginLogout="Log Out";
        //default token header
       // $http.defaults.headers.common['X-Auth-Token']= $localStorage.auth_token;
	}

	
	if(typeof analytics !== 'undefined') { analytics.trackView("LifeStyle Controller"); }

//    HardwareBackButtonManager.disable();
    if ($localStorage.userName == "" || $localStorage.userName == null) {
        $location.path('/start');
    } else {
        $rootScope.is_engaged = "lifeStyle";
        
		$rootScope.clickFilterFlag=0;
		$rootScope.applyFilterFlag='';
		$rootScope.filterShipPort={style:"",duration:"",year:"",month:"",ports:"",ship:"",orderby:"asc",cruiseLine:"",flag:-1};
		$rootScope.filterShipPort1={style:"",duration:"",year:"",month:"",ports:"",ship:"",orderby:"asc",cruiseLine:"",flag:-1};
		$rootScope.shipPort={lifestyle:"",duration:"",cruiseLineName:"",ports:"",shipName:"",year:"",month:""};
		$rootScope.backArrow={ship:0,cruiseLine:0,port:0,month1:"",month2:"",month3:"",expType:"",duration:"",orderBy:"asc"}; 
//		$rootScope.month=[];
		$rootScope.preStyle="";
        $rootScope.page = "lifestyle"; //page remember form myfavourite page
		
		
       
        $http.get(serviceLink.url + 'SaltieApp/rest/cruise/count').success(function(data) {
            $rootScope.lifestylecount = data;
			$rootScope.countSailing= data.TotalSailing;
			$rootScope.count = $rootScope.lifestylecount[$localStorage.stylelife];
        });
		
		
				
        $scope.viewall = function() {
            $location.path('/app/list');
        }
		
	

		 
		 $rootScope.showFilter=function()
		 {
			
				 if($rootScope.applyFilterFlag==0)
			 {
				 $rootScope.clickFilterFlag=0;
			 }
			 if($rootScope.clickFilterFlag==0)
			 {
					$rootScope.filterModal.show();
					$rootScope.preStyle="";
				 $rootScope.preDuration="";
				 $rootScope.filterShipPort={style:"All",duration:"",year:"",month:"",ports:"",ship:"",orderby:"asc",cruiseLine:"",flag:-1};
				 document.getElementById("portName").selectedIndex= 0;
				 document.getElementById("cruiseLine").selectedIndex= 0;
				 document.getElementById("shipName").selectedIndex= 0;
			 for(i=0;i<$rootScope.month.length;i++)
			 {
				 for(j=0;j<12;j++){
					 $rootScope.month[i][j].value=false;
				 }
				 
			 }
				  $rootScope.filterLifstyle();
				 $rootScope.clickFilterFlag=1;
			 }
			 else{
				 $rootScope.shipPort=$rootScope.shipPort1;
                 $timeout(function() {
                     $rootScope.filterShipPort.style=$rootScope.backArrow.expType;
					 $rootScope.preStyle=$rootScope.backArrow.expType;
					 $rootScope.preDuration=$rootScope.backArrow.duration;
                     $rootScope.filterShipPort.duration=$rootScope.backArrow.duration;
					 $rootScope.filterShipPort.orderby= $rootScope.backArrow.orderBy;
                     $rootScope.resetDateMonth($rootScope.backArrow.month1,0);
					 $rootScope.resetDateMonth($rootScope.backArrow.month2,1);
                     $rootScope.resetDateMonth($rootScope.backArrow.month3,2);
                    document.getElementById("cruiseLine").selectedIndex=$rootScope.backArrow.cruiseLine;
                    document.getElementById("portName").selectedIndex=$rootScope.backArrow.port;
                    document.getElementById("shipName").selectedIndex=$rootScope.backArrow.ship;
                }, 100); 
				   $rootScope.filterModal.show();
			 }
		 }
		 
		  
		 $rootScope.filterLifstyle=function()
		 {
			 if($rootScope.filterShipPort.style=="All")
			{
				$rootScope.filterShipPort.style="";
			}
			 
			 
			 themeFilter.theme($rootScope.filterShipPort)
                    .then(
                        /* success function */
                        function(data) {
								$rootScope.shipPort=data;
                                $ionicLoading.hide();
                        },function(error) {
                alert("There was a problem");
                console.log(error);
            });
			 
			 
			  $rootScope.filterModal.show();
		 }
		 
		
    }
});