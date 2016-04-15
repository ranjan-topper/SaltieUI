function filterPortName()
{
	var scope;
	if(angular.element(document.getElementById("lifestyle")).length > 0)
	{
	
	 scope = angular.element(document.getElementById("lifestyle")).scope();
	}else{
		scope = angular.element(document.getElementById("list")).scope();
	}
    scope.$apply(function () {
    scope.filterPortName();
    });
}
function filterCruiseLine()
{
	
var scope;
	if(angular.element(document.getElementById("lifestyle")).length > 0)
	{
	 scope = angular.element(document.getElementById("lifestyle")).scope();
	}else{
		scope = angular.element(document.getElementById("list")).scope();
	}    scope.$apply(function () {
    scope.filterCruiseLine();
    });
}



function filterShipName()
{
	
var scope;
	if(angular.element(document.getElementById("lifestyle")).length > 0)
	{
	
	 scope = angular.element(document.getElementById("lifestyle")).scope();
	}else{
		scope = angular.element(document.getElementById("list")).scope();
	}    scope.$apply(function () {
    scope.filterShipName();
    });
}
var app = angular.module('starter.controllers', []);

//status
//status-200 for success
//status-400 bad request
//status-401 unauthorized
//status-404 username or password  not found
//status-500 server Erro
//Below controller is f3or the start.html

app.controller('startCtrl', function($scope, $location, $state, $localStorage, $timeout,$rootScope,serviceLink) {
//    HardwareBackButtonManager.disable(); //HardwareBackButtonManager is a directive used to block the back button functionality of the mobile
	$rootScope.linkUrl=serviceLink.url;
	
if(typeof analytics !== 'undefined') { analytics.trackView("Start Controller"); }
if ($localStorage.userName == "" || $localStorage.userName == null || $localStorage.userName == "Guest") {
	
        $localStorage.stylelife = "All"; //initializing Lifestyle as All at first
        //timeout for swipe automatically after 10 seconds
        var timer = $timeout(function() {
            $scope.swipetohome();
        }, 10000);
        $scope.swipetohome = function() {
		
			
            $timeout.cancel(timer); //cancel the timeout which is started before for 10 seconds
            $location.path('/app/lifeStyle');
        }

        $scope.signUp = function() {
            $timeout.cancel(timer); //cancel the timeout which is started before for 10 seconds
            $location.path('/signuphome');
        }

        $scope.login = function() {
            $timeout.cancel(timer); //cancel the timeout which is started before for 10 seconds
            $location.path('/login');
        }
		    				 $localStorage.userName = "Guest";
		$scope.welcomeBack=false;

    } else 
	{
		$scope.name=$localStorage.Name;
		$scope.welcomeBack=true;
        $location.path('/start');
		
		 //timeout for swipe automatically after 10 seconds
        var timer = $timeout(function() {
            $scope.swipetohome();
        }, 10000);
        $scope.swipetohome = function() {
			
            $timeout.cancel(timer); //cancel the timeout which is started before for 10 seconds
            $location.path('/app/lifeStyle');
        }
    }


})

//This is Login controller for login.html

app.controller('loginCtrl', function($scope, $state, $cordovaOauth, $localStorage, $location, $http, $ionicLoading, facebookService, loginService, $ionicPopup, serviceLink,$rootScope) {
	
	
	 var isIPad = ionic.Platform.isIPad();
  var isIOS = ionic.Platform.isIOS();
	  if(isIPad==true || isIOS==true)
	  {
 		document.getElementById("login").style.marginTop = "20px";
	  }
	  
	
	
	if(typeof analytics !== 'undefined') { analytics.trackView("Login Controller"); }
    if ($localStorage.userName == "" || $localStorage.userName == null || $localStorage.userName == "Guest") {
        $scope.email = function() //function to redirect the control to emaillogin.html
        {
            $location.path('/emaillogin');
        }

        $scope.close = function() //function to redirect the control to start.html
        {
            $location.path('/start');
        }
        $scope.login = function() //function to perform facebook login
        {

            facebookService.facebook().then(function(result) {
                $ionicLoading.show({
                    template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'
                });

                $scope.profileData = result.data; //assign facebook data to profiledata
                //post request to store the facebook user detail in our database such as(email,firstname,lastname,token a unique id given by the facebook)
                var url = serviceLink.url + 'SaltieApp/rest/cruise/user/registration/fb';
                var data = "userName=" + result.data.id + "&token=" + result.data.id + "&firstName=" + $scope.profileData.first_name + "&lastName=" + $scope.profileData.last_name;
                loginService.login(url, data)
                    .then(
                        /* success function */
                        function(status) {
                            if (status == 200) {
								$localStorage.Name=$scope.profileData.first_name+" "+$scope.profileData.last_name;
								$rootScope.loginLogout="Log out";
								$rootScope.showMyFav=false;
                                $rootScope.showEngage = false;
                                $rootScope.hidePhBook=true;
								$rootScope.showProfileSet=true;
                                $localStorage.userName = result.data.id;
                                $location.path('/app/lifeStyle');
								$ionicLoading.hide(); //hide the ionicloading template which is started before
                            } else {

                                $ionicPopup.show({
                                    title: 'Error',
                                    subTitle: 'Oops somthing went worng !',
                                    buttons: [{
                                        text: 'Ok'
                                    }]
                                }).then(function(res) {});
                                $ionicLoading.hide();

                            }
                        });
            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });
        }
    } else {
        $state.go('app.lifeStyle');
    }
})

//This is email Login controller for emaillogin.html
app.controller('emailloginCtrl', function($scope, $location, $state, $http, $localStorage, $state, loginService, serviceLink) {
	
	var isIPad = ionic.Platform.isIPad();
  var isIOS = ionic.Platform.isIOS();
	  if(isIPad==true || isIOS==true)
	  {
 		document.getElementById("emaillogin").style.marginTop = "20px";
	  }

	if(typeof analytics !== 'undefined') { analytics.trackView("Email Controller"); }
	
    if ($localStorage.userName == "" || $localStorage.userName == null || $localStorage.userName == "Guest") {
        
        $scope.close = function() {
            $location.path('/start');
        }
        $scope.back = function() {
            $location.path('/login');
        }
        $scope.Login = function(form, user) {
            if (form.$valid) //cheacking the form valid or not
            {
                var url = serviceLink.url + 'SaltieApp/rest/cruise/user/login';
                var obj = {
                    userName: user.email,
                    password: user.password
                };
                var data = "userName=" + obj.userName + "&password=" + obj.password;
                $scope.status = "";
                loginService.login(url, data)
                    .then(
                        /* success function */
                        function(status) {
                            $scope.status = status;
                            if ($scope.status == 200) {
                                $localStorage.userName = user.email;
                                $location.path('app/lifeStyle');
                            } else {
                                loginService.errors(form, $scope.status);
                            }


                        }, function(error) {
                            //If an error happened, handle it here
                        });



            }
        }
    } else {
        $state.go('app.lifeStyle');
    }
});

//This is for forgot password functionality
app.controller('sendemailCtrl', function($scope, $location, $state, $localStorage, $ionicPopup, $ionicLoading, $http, loginService, serviceLink,$stateParams) {
	console.log($stateParams);
	$scope.user=$stateParams;
	$scope.enableVerCode=true;
	var isIPad = ionic.Platform.isIPad();
  var isIOS = ionic.Platform.isIOS();
	  if(isIPad==true || isIOS==true)
	  {
 		document.getElementById("sendemail").style.marginTop = "20px";
	  }
	
	if(typeof analytics !== 'undefined') { analytics.trackView("Forgot Password Controller"); }
	
    if ($localStorage.userName == "" || $localStorage.userName == null || $localStorage.userName == "Guest") {
       
        $scope.close = function() {
            $location.path('/start');
        }
        $scope.back = function() {
            $location.path('/emaillogin');
        }
        $scope.Sendemail = function(form, user) {
            if (form.$valid) {
                //ionicloading is a busy cursor which display the template given below
                $ionicLoading.show({
                    template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'
                });

                $http.get(serviceLink.url + 'SaltieApp/rest/cruise/user/forgot/email?email=' + user.email, {

                }).success(function(data, status, headers, config) {
                    if (status == 204) {
//						 $ionicPopup.show({
//                                    title: 'Success',
//                                    subTitle: 'Please check your mail for OTP',
//                                    buttons: [{
//                                        text: 'Ok'
//                                    }]
//                                }).then(function(res) {});
                        $ionicLoading.hide();
                        $localStorage.emailver = user.email;
						$scope.enableVerCode=false;
                    }
                }).error(function(data, status, headers, config) {
                    $ionicLoading.hide();
                    loginService.errors(form, status);
                });


            }
        }

        $scope.Sendotp = function(form, user) {
            if (user.password != user.passwordc) {
                form.passwordc.$setValidity("dontMatch", false);
            }


            if (form.$valid) {

                $ionicLoading.show({
                    template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'
                });

                $http({
                    method: 'POST',
                    url: serviceLink.url + 'SaltieApp/rest/cruise/user/forgot/reset',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                         
                    },
                    data: "email=" + $localStorage.emailver + "&password=" + user.password + "&code=" + user.otp
                }).success(function(data, status, headers, config) {
                    if (status == 200) {
                        $ionicLoading.hide();
                        delete $localStorage.emailver;
                        $location.path('/emaillogin');
                    }
                }).error(function(data, status, headers, config) {
                    $ionicLoading.hide();
                    
                    if(status == 400)
                        {
                        $ionicLoading.hide();
                        form.otp.$setValidity("optExp", false);
                        }
                    else{
                    loginService.errors(form, status);
                    }

                });

            }


        }


    } else {
        $state.go('app.lifeStyle');
	}
});





//signuphome page  controller start here
app.controller('signuphomeCtrl', function($scope, $state, $location, $http, $localStorage, $ionicLoading, $ionicPopup, loginService, serviceLink) {
	
	var isIPad = ionic.Platform.isIPad();
  var isIOS = ionic.Platform.isIOS();
	  if(isIPad==true || isIOS==true)
	  {
 		document.getElementById("signuphome").style.marginTop = "20px";
	  }
	
	if(typeof analytics !== 'undefined') { analytics.trackView("Sign Up Home Controller"); }
	
    if ($localStorage.userName == "" || $localStorage.userName == null || $localStorage.userName == "Guest") {
        $scope.close = function() {
            $location.path('/start');
        }
       
		

        $scope.signUp = function(form, user) {
            if (form.$valid) //checking form valid or not
            {
                var url = serviceLink.url + 'SaltieApp/rest/cruise/user/registration/app';

                var data = "userName=" + user.email + "&password=" + user.password + "&firstName=" + user.firstName + "&lastName=" + user.lastName;
                $scope.status = "";
                loginService.login(url, data)
                    .then(
                        /* success function */
                        function(status) {
                            $scope.status = status;
                            if ($scope.status == 200) {
                                $location.path('/emaillogin');
                                $ionicLoading.hide();
                            } else {
                                loginService.errors(form, $scope.status);
                            }

                        }, function(error) {
                            //If an error happened, handle it here
                        })
            }
        }
    } else {
        $state.go('app.lifeStyle');
    }

});

//Menu Page controller starts
app.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicHistory, $localStorage, $location, $ionicLoading, $http, $rootScope, $state, serviceLink, $window,profileGet,profileSet,$ionicPopup, TokenStorage) {

if(typeof analytics !== 'undefined') { analytics.trackView("App Main Controller"); } 
	
	$scope.screenWidth=screen.width;

	
    $scope.myFavourite = function() {
        //service part of myfavourite page start
        $ionicLoading.show({
            //template: 'loading'
            template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'
        });
        $http({
            method: 'GET',
            url: serviceLink.url + 'SaltieApp/rest/cruise/favourite/list'
        }).success(function(data) {
            /*
                $rootScope.myFav = data.tripList;//myfav success is assigned to rootscope so that it can be accessed by all the controller
*/
            $rootScope.userFav = data.tripList;
            $location.path('/app/myFavourite');
            $ionicLoading.hide()
        });

    }
	

    $scope.loginData = {};

    $scope.logout = function() {
		if($rootScope.clickFilterFlag!=0)
		{
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
        $state.go('start', {}, {reload: true}).then(function(){
        setTimeout(function() {
          $window.location.reload(true);
        }, 500);
      })
    }

    $scope.home = function() {
		$rootScope.applyFilterFlag=0;
        $rootScope.engageData = "";
		if($rootScope.clickFilterFlag!=0)
		{
			$rootScope.backArrow={ship:0,cruiseLine:0,port:0,month1:"",month2:"",month3:"",expType:"",duration:"",orderBy:"asc"}; 
			$rootScope.filterShipPort1={style:"All",duration:"",year:"",month:"",ports:"",ship:"",orderby:"asc",cruiseLine:"",flag:-1};
			$rootScope.resetFilterHome();
			
		}
		
        $location.path('/app/lifeStyle');
        $localStorage.stylelife = "All";
		
        $rootScope.count = $rootScope.lifestylecount['All'];

    }
	
	
	      /* ==========================================================================
  						engage User functionality
   	========================================================================== */
	
	 $scope.engageClick=function(type)
	 {
         if($localStorage.userName == "Guest"){
//             $rootScope.logSignClicked = "nextStep";
             $rootScope.logSignClicked = "engageUs";
             $rootScope.logsignModal.show();
         }else{
                             $rootScope.buttonType = "Select Room Type";

            //$rootScope.TempDetail = angular.copy($rootScope.engageData);
            $location.path('/app/engageUser');   
         }
	 }
	
	  

	 
	 

})

//engage Us controller
app.controller('engageController', function($scope, $location, $http, $rootScope, $filter, $localStorage, $ionicLoading, serviceLink, $ionicModal,themeFilter,$ionicPopup,advanceFilter,$ionicScrollDelegate,$ionicSlideBoxDelegate,$timeout, facebookService){
    $scope.engageUser = function(){
    
        // $rootScope.TempDetail=angular.copy($rootScope.detail);
        $location.path('/app/emailUs');
    }

    //$scope.is_showBookingPopup = false;
    $scope.bookOnline = function(){
         $scope.detail = angular.copy($rootScope.TempDetail);
         $rootScope.TempDetail = "";

        $scope.name = $localStorage.Name.split(" ")[0];
        if($scope.detail == undefined || $scope.detail == "" || $scope.detail == null){
            $scope.is_showBookingPopup = true;
        }else{
            $scope.is_showBookingPopup = false;
            $location.path('/app/booking');
        }
        //$location.path('/app/emailUs');
    }
    $scope.back = function() {
        // $rootScope.engageData = "";
        if($rootScope.TempDetail == "" || $rootScope.TempDetail == undefined){
            $location.path('app/list');
        }else{
            window.history.back();   
        }
        console.log($rootScope.TempDetail);
    }
    $scope.goToList = function(){
        $scope.is_showBookingPopup = false;
        $location.path('/app/list');
    }
    $scope.closePopup = function(){
        $scope.is_showBookingPopup = false;
    }
    
})

//Lifestyle page controller start
app.controller('lifeStyleCtrl', function($scope, $location, $http, $rootScope, $filter, $localStorage, $ionicLoading, serviceLink, $ionicModal,themeFilter,$ionicPopup,advanceFilter,$ionicScrollDelegate,$ionicSlideBoxDelegate,$timeout, facebookService) {
	//initialise the rootscope details value
    $rootScope.TempDetail = "";
    $rootScope.engageData = "";
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
		$rootScope.month=[];
        $rootScope.userFav = [];
        $rootScope.favourite = [];
		$rootScope.preStyle="";
        $rootScope.page = "lifestyle"; //page remember form myfavourite page
		
		
        $ionicLoading.show({
            template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'
        });
        $http.get(serviceLink.url + 'SaltieApp/rest/cruise/count').success(function(data) {
            $rootScope.lifestylecount = data;
			$rootScope.count = $rootScope.lifestylecount[$localStorage.stylelife];
            $ionicLoading.hide()
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
})



//list page controlled start
app.controller('listController', function($scope, $location, $rootScope, $filter, $localStorage, $http, $ionicLoading, FavouriteService, $timeout, $ionicScrollDelegate, $ionicModal, loginService, facebookService, serviceLink, favService,$ionicPopup,$q,detailData,$ionicSlideBoxDelegate) {
	

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

		//back button function
        	$scope.back = function() {
			$rootScope.page="lifestyle";
            $location.path('/app/lifeStyle');
        }
			
		
      }
})



app.controller('detailController', function($scope, $state, $location, $ionicModal, $rootScope, $http, $ionicLoading, $localStorage, $ionicSlideBoxDelegate, $ionicScrollDelegate, $timeout, $ionicHistory, serviceLink, favService,$sce) {

	if(typeof analytics !== 'undefined') { analytics.trackView("Detail Controller"); }

    if ($localStorage.userName == "" || $localStorage.userName == null) {
        $location.path('/start');
    } else {
        $rootScope.is_engaged = "detail";
		$rootScope.load=false;
	
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
				$rootScope.logSignClicked="Favourite";
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

        $scope.enable1 = function() 
		{
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

        $rootScope.page = "detail";

        $scope.browserwindow = function() {

            window.open('https://ui.odysol.com/web/cruises/details.aspx?pid=677392', '_blank', 'closebuttoncaption=back');
            return false;

        }
$rootScope.moreLoad=false;
        $scope.tripID = $rootScope.tripid;

        

        $scope.back = function() {
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
            $rootScope.priceList = prices;
            $scope.index1 = index;
        };
       


        $rootScope.book1 = function(modal) {
            $scope.useragent = navigator.userAgent;
            $location.path('/app/booking');
        }
		
		
				
		$scope.getEncryptedString=function(sWord)
{
var sToEncrypt = sWord;
var sXorKey= sToEncrypt.length;
var sResult="";//the result will be here

for(i=0;i<sToEncrypt.length;++i)
{
sResult+=String.fromCharCode(sXorKey^sToEncrypt.charCodeAt(i));
}
return sResult;
}

	
		
		
        $rootScope.share = function() {
			if ($localStorage.userName == "Guest") {
				$rootScope.logSignClicked="share";
                $rootScope.logsignModal.show();
            } else {
//				var url="http://104.236.50.241:8080/Saltie-site/index.html?trip="+btoa($scope.tripID).split('=')[0]+"&user="+btoa($localStorage.Name).split('=')[0];
				
				var url= serviceLink.url+"Saltie-site/index.html?trip="+btoa($scope.tripID).split('=')[0]+"&user="+btoa($localStorage.Name).split('=')[0];
				console.log(url);
				
            window.plugins.socialsharing.share("This exciting cruise is brought to you by Saltie, the right app for cruise shopping!.",$rootScope.detail.tripDetails.tripDesc,null,url);

				
			}
        }

     
		
			
		$scope.showVideo=function()
		{
            window.open($rootScope.detail.tripDetails.ship.videoUrl+'?autoplay=1', '_blank', 'closebuttoncaption=back');
            return false;
		}
		
		
		
		$scope.showVideoCheck=function()
		{
			if($rootScope.detail.tripDetails.ship.videoImage == "" || $rootScope.detail.tripDetails.ship.videoImage == null || $rootScope.detail.tripDetails.ship.videoImage == "NA")
			{
				return false;
			}
			else
			{
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
        $rootScope.emailUs = function(type){
            $rootScope.buttonType = type;
            if(type == "detail"){
                $rootScope.buttonType = "Select Room Type";
            }
            // alert(type);
            $rootScope.logSignClicked = "nextStep";
            if($localStorage.userName == "Guest"){
                $rootScope.logsignModal.show();
            }else{
//                $scope.engageUser($rootScope.logSignClicked);
                $location.path('/app/engageUser');    
            }
        }
    }
});




app.controller('myFavouriteController', function($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading, $localStorage, FavouriteService, $ionicHistory, serviceLink,detailData,$ionicSlideBoxDelegate) {
	
	if(typeof analytics !== 'undefined') { analytics.trackView("MyFavourite Controller"); }

    if ($localStorage.userName == "" || $localStorage.userName == null) {
        $location.path('/start');
    } else {
        //        $rootScope.userFav = $rootScope.myFav;
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

        $scope.myFav = function(myfavtripID) {

            $ionicLoading.show({
                template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'
            });
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

    }



});

app.service('FavouriteService', function($rootScope) {

    this.addNew = function(tripId) {


        for (i = 0; i < $rootScope.userFav.length; i++) {
            if ($rootScope.userFav[i].tripId === tripId)
                $rootScope.userFav.splice(i, 1);
        }

        for (i = 0; i < $rootScope.favourite.length; i++) {
            if ($rootScope.favourite[i] === tripId) {
                $rootScope.favourite.splice(i, 1);
                return;
            }
        }
        $rootScope.favourite.push(tripId);
    }

});

app.controller('bookingController', function($scope, $location, $ionicModal, $rootScope, $http, $ionicLoading, $localStorage, $ionicNavBarDelegate) {

    if ($localStorage.userName == "" || $localStorage.userName == null) {
        $location.path('/start');
    } else {
        $scope.back = function() {
            $rootScope.TempDetail = $scope.detail;
            window.history.back();
        }

    }
});


app.controller('shareController', function($scope, $location, $ionicLoading, $localStorage, $ionicNavBarDelegate) {

    if ($localStorage.userName == "" || $localStorage.userName == null) {
        $location.path('/start');
    } else {
        $scope.back = function() {
            $ionicNavBarDelegate.back();
        }

        $scope.OtherShare = function() {
            window.plugins.socialsharing.share('Saltie', 'https://www.google.nl/images/srpr/logo4w.png', null, 'https://play.google.com/store/apps/details?id=com.prantikv.digitalsignaturemaker');
        }

    }

});



app.filter('capitalize', function() {
    return function(input, all) {
        return ( !! input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    }
});





app.factory('loginService', function($http, $q, $ionicLoading, $ionicPopup,$localStorage,$rootScope, TokenStorage) {

    //    Create a class that represents our name service.
    function loginService() {
        var self = this;
        //    getName returns a promise which when fulfilled returns the name.
        self.login = function(url, data) {
            //    Create a deferred operation.
            var deferred = $q.defer();
            $ionicLoading.show({
                template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'
            });
            //    Get the name from the server.
            $http({
                method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'                     
                },
                data: data
            })
                .success(function(data, status) {
                    $ionicLoading.hide();
				    $localStorage.Name=data.user;
                    TokenStorage.store(data.token);
				    $rootScope.favourite1=data.favourite;
                    deferred.resolve(status);
                })
                .error(function(data, status) {
                    $ionicLoading.hide();
                    deferred.resolve(status);

                });

            //    Now return the promise.
            return deferred.promise;
        };

        self.errors = function(form, status) {
            if (status == 400)
			{
				$ionicPopup.show({
                    title: 'Error',
                    subTitle: 'Bad Request',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {});
			}
            else if (status == 500)
			{
				$ionicPopup.show({
                    title: 'Error',
                    subTitle: 'Server Error',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {});
			}
            else if (status == 404) {
                $ionicLoading.hide();
                form.email.$setValidity("emailNot", false);
//                $ionicPopup.show({
//                    title: 'Error',
//                    subTitle: 'User not found',
//                    buttons: [{
//                        text: 'Ok'
//                    }]
//                }).then(function(res) {
//
//                });
            } else if (status == 403) {
                $ionicLoading.hide();
                alert();
            } else if (status == 401) {
                $ionicLoading.hide();
                form.password.$setValidity("password", false);
//                $ionicPopup.show({
//                    title: 'Error',
//                    subTitle: 'Password is wrong',
//                    buttons: [{
//                        text: 'Ok'
//                    }]
//                }).then(function(res) {});
            } else if (status == 400) {
                $ionicLoading.hide();
                $ionicPopup.show({
                    title: 'Field Missing',
                    subTitle: 'Bad Request',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {

                });
            } else if (status == 302) {
                $ionicLoading.hide();
                form.email.$setValidity("emailExist", false);
//                $ionicPopup.show({
//                    title: 'User name already exist',
//                    subTitle: 'Exist',
//                    buttons: [{
//                        text: 'Ok'
//                    }]
//                }).then(function(res) {
//                });
            } else if (status == 412) {
                $ionicLoading.hide();
                form.otp.$setValidity("otpMiss", false);
//                $ionicPopup.show({
//                    title: 'Error',
//                    subTitle: 'OTP Miss Matched',
//                    buttons: [{
//                        text: 'Ok'
//                    }]
//                }).then(function(res) {});
            }
			
			else if(status == 498)
			{
				$ionicLoading.hide();
                form.otp.$setValidity("optExp", false);
			}
			else if(status == 423)
			{
				$ionicPopup.show({
                    title: 'Account Locked',
                    subTitle: 'Your account is locked, due to password reset. Please use forgot password and reset your password with Verification Code',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {});
			}
			else if(status == 503)
			{
				$ionicPopup.show({
                    title: 'Error',
                    subTitle: 'Service Down Try Later',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {});
			}
			
			
			else {
                $ionicPopup.show({
                    title: 'Error',
                    subTitle: 'Oops somthing went worng !',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {});

            }
        };
    }
    return new loginService();
})





app.factory('getCountryService', function($http, $q, $ionicLoading, $ionicPopup,$localStorage,$rootScope) {

    //    Create a class that represents our name service.
    function getCountryService() {
        var self = this;
        //    getName returns a promise which when fulfilled returns the name.
        self.getCountry = function(url) {
            //    Create a deferred operation.
            var deferred = $q.defer();
            $ionicLoading.show({
                template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'
            });
            //    Get the name from the server.
            $http({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .success(function(data, status) {
//                    $ionicLoading.hide();
//                    console.log(data);
                    deferred.resolve(data);
                })
                .error(function(data, status) {
//                    $ionicLoading.hide();
//                    alert(status);
                });

            //    Now return the promise.
            return deferred.promise;
        };
    };
        return new getCountryService();

});










app.factory('engageService', function($http, $q, $ionicLoading, $ionicPopup,$localStorage,$rootScope) {

    //    Create a class that represents our name service.
    function engageService() {
        var self = this;
        //    getName returns a promise which when fulfilled returns the name.
        self.submit = function(url, data) {
            //    Create a deferred operation.
            var deferred = $q.defer();
            $ionicLoading.show({
                template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'
            });
            //    Get the name from the server.
            $http({
                method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            })
                .success(function(data, status) {
                    $ionicLoading.hide();
                    console.log(data);
                    deferred.resolve(status);
                })
                .error(function(data, status) {
                    $ionicLoading.hide();
                    //deferred.resolve(status);
                });

            //    Now return the promise.
            return deferred.promise;
        };

        self.errors = function(form, status) {
            if (status == 400)
			{
				$ionicPopup.show({
                    title: 'Error',
                    subTitle: 'Bad Request',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {});
			}
            else if (status == 500)
			{
				$ionicPopup.show({
                    title: 'Error',
                    subTitle: 'Server Error',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {});
			}
            else if (status == 404) {
                $ionicLoading.hide();
                form.email.$setValidity("emailNot", false);
//                $ionicPopup.show({
//                    title: 'Error',
//                    subTitle: 'User not found',
//                    buttons: [{
//                        text: 'Ok'
//                    }]
//                }).then(function(res) {
//
//                });
            } else if (status == 401) {
                $ionicLoading.hide();
                form.password.$setValidity("password", false);
//                $ionicPopup.show({
//                    title: 'Error',
//                    subTitle: 'Password is wrong',
//                    buttons: [{
//                        text: 'Ok'
//                    }]
//                }).then(function(res) {});
            } else if (status == 400) {
                $ionicLoading.hide();
                $ionicPopup.show({
                    title: 'Field Missing',
                    subTitle: 'Bad Request',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {

                });
            } else if (status == 302) {
                $ionicLoading.hide();
                form.email.$setValidity("emailExist", false);
//                $ionicPopup.show({
//                    title: 'User name already exist',
//                    subTitle: 'Exist',
//                    buttons: [{
//                        text: 'Ok'
//                    }]
//                }).then(function(res) {
//                });
            } else if (status == 412) {
                $ionicLoading.hide();
                form.otp.$setValidity("otpMiss", false);
//                $ionicPopup.show({
//                    title: 'Error',
//                    subTitle: 'OTP Miss Matched',
//                    buttons: [{
//                        text: 'Ok'
//                    }]
//                }).then(function(res) {});
            }
			
			else if(status == 498)
			{
				$ionicLoading.hide();
                form.otp.$setValidity("optExp", false);
			}
			else if(status == 423)
			{
				$ionicPopup.show({
                    title: 'Account Locked',
                    subTitle: 'Your account is locked, due to password reset. Please use forgot password and reset your password with Verification Code',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {});
			}
			else if(status == 503)
			{
				$ionicPopup.show({
                    title: 'Error',
                    subTitle: 'Service Down Try Later',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {});
			}
			
			
			else {
                $ionicPopup.show({
                    title: 'Error',
                    subTitle: 'Oops somthing went worng !',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {});

            }
        };
    }
    return new engageService();
})


app.factory('facebookService', function($http, $q, $ionicLoading, $ionicPopup, $cordovaOauth, $localStorage,$rootScope) {

    //    Create a class that represents our name service.
    function facebookService() {
        var self = this;
        //    getName returns a promise which when fulfilled returns the name.
        self.facebook = function(url, data) {
            //    Create a deferred operation.
            var deferred = $q.defer();
            $cordovaOauth.facebook("809674865765712", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {
                $localStorage.accessToken = result.access_token; //accesstoken from facebook 
                if ($localStorage.hasOwnProperty("accessToken") === true) {
                    //ionicloading is a busy cursor which display the template given below
                    $ionicLoading.show({
                        template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'
                    });

                    $http.get("https://graph.facebook.com/v2.2/me", {
                        params: {
                            access_token: $localStorage.accessToken,
                            fields: "id,name,gender,location,website,picture,relationship_status,email,first_name,last_name",
                            format: "json"
                        }
                    }).then(function(result) {
                        deferred.resolve(result);
                    }, function(error) {
                        $ionicPopup.show({
                            title: 'Error',
                            subTitle: 'There was a problem getting your profile.  Check the logs for details.',
                            buttons: [{
                                text: 'Ok'
                            }]
                        }).then(function(res) {});

                    });
                }
            }, function(error) {
                $ionicPopup.show({
                    title: 'Error',
                    subTitle: 'There was a problem signing in!',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {});
                console.log(error);
            })
            //    Now return the promise.
            return deferred.promise;
        }
    }
    return new facebookService();
})


app.filter('orderByCategory', function() {
    return function(obj) {
        var array = [];
        if (obj == null)
            return;
        Object.keys(obj).forEach(function(key) {

            if (key == "Interior")
                array[0] = key;
            else if (key == "Oceanview")
                array[1] = key;
            else if (key == "Balcony")
                array[2] = key;
            else if (key == "Suite")
                array[3] = key;
            else
                array[4] = key;

        });
		var filteredArray = [];
			angular.forEach(array,function(item) {
				if (item) filteredArray.push(item);
				});
			return filteredArray;
        //return array;
    }
});



app.filter('orderByCabin', function() {
    return function(obj) {
        var array = [];
        if (obj == null)
            return;
      obj.forEach(function(value) {

            if (value.roomType == "Interior")
                array[0] = value;
            else if (value.roomType == "Oceanview")
                array[1] = value;
            else if (value.roomType == "Balcony")
                array[2] = value;
            else if (value.roomType == "Suite")
                array[3] = value;
            else
                array[4] = value;

        });
		var filteredArray = [];
			angular.forEach(array,function(item) {
				if (item) filteredArray.push(item);
				});
			return filteredArray;
       // return array;
    }
});




  

//dollor filter for price
app.filter('dollorCheck', function() {

    return function(obj) {

        if (obj.match(/[a-zA-Z]/))
            return obj;
        else
            return "$" + obj
    }

});

//server link declaration

app.factory('serviceLink', function() {
    return {
        url: 'http://104.236.50.241:8080/'
//		  url: 'http://159.203.121.122:8080/'
    };
});




//favourite service start here
app.factory('favService', function($http, $q, $ionicLoading, $ionicPopup, $localStorage, FavouriteService, serviceLink) {
    function favService() {
        var self = this;
        self.favorite = function(tripId, index) {
//loader spinner
            $ionicLoading.show({
                template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'
            });
			//post request for favourite starts here
            $http({
                method: 'POST',
                url: serviceLink.url + 'SaltieApp/rest/cruise/favourite/set',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'           
                },
                data: "tripId=" + tripId
            }).success(function(data, status) {
                $ionicLoading.hide();
                // console.log(data);
                if (status == 200) {
                    FavouriteService.addNew(tripId);//calling FavouriteService Service were tripId is added and removed

                    if (document.getElementById(index).src.indexOf("/img/Unfavorite.png") >= 0)
                        document.getElementById(index).src = "./img/Favorite.png";
                    else
                        document.getElementById(index).src = "./img/Unfavorite.png";
                } else {
                    alert("Error, Try again !");
                }
            });
        }
    }
    return new favService();

})

// Advance filter servcie starts here
app.factory('advanceFilter', function($http, $q, $ionicLoading, $ionicPopup, $localStorage, FavouriteService, serviceLink) {
    function advanceFilter() {
        var self = this;
        self.filter = function(data) {
			 var deferred = $q.defer();
			if(data.duration=="")
			{
				data.duration="";
			}
//loader spinner
            $ionicLoading.show({
                template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'
            });
			//post request for favourite starts here
            $http({
                method: 'GET',
                url: serviceLink.url + 'SaltieApp/rest/cruise/search?lifestyle='+data.style+'&duration='+data.duration+'&year='+data.year+'&month='+data.month+'&sortBy='+data.orderby+'&departPort='+data.ports+'&userName='+$localStorage.userName+'&shipName='+data.ship+'&cruiseLineName='+data.cruiseLine
            })
           .success(function(data) {
                $ionicLoading.hide();
                // console.log(data);
					                        deferred.resolve(data);
            });

return deferred.promise;
        }

    }
    return new advanceFilter();
})

//Theme filter service starts here
app.factory('themeFilter', function($http, $q, $ionicLoading, $ionicPopup, $localStorage, FavouriteService, serviceLink) {
    function themeFilter() {
        var self = this;
        self.theme = function(data) {
			 var deferred = $q.defer();
//loader spinner
            $ionicLoading.show({
                template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'
            });
           $http.get(serviceLink.url + 'SaltieApp/rest/cruise/theme5?lifestyle='+data.style+'&duration='+data.duration+'&year='+data.year+'&month='+data.month+'&port='+data.ports+'&shipName='+data.ship+'&cruiseLineName='+data.cruiseLine).success(function(data) {
                $ionicLoading.hide();
                // console.log(data);
			   deferred.resolve(data);

            });
return deferred.promise;
        }

    }
    return new themeFilter();

})


app.factory('profileGet',function($http, $q, $ionicLoading, $ionicPopup, $localStorage, serviceLink,$rootScope){
 function profileGet() {
        var self = this;
        self.profile = function() {
			var deferred = $q.defer();
        $ionicLoading.show({
            //template: 'loading'
            template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'
        });
        $http({
            method: 'GET',
            url: serviceLink.url + 'SaltieApp/rest/cruise/user/detail'
        }).success(function(data) {
            
			$ionicLoading.hide();
			deferred.resolve(data);
         }).error(function(data){
			deferred.resolve("error value");
		});
			return deferred.promise;
		}
		}

    return new profileGet();
})


app.factory('profileSet', function($http, $q, $ionicLoading, $ionicPopup, $localStorage, serviceLink) {
    function profileSet() {
        var self = this;
        self.profileS = function(data) {
			//loader spinner
			  var deferred = $q.defer();
            $ionicLoading.show({
                template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'
            });
            $http({
                method: 'POST',
                url: serviceLink.url + 'SaltieApp/rest/cruise/user/editProfile ',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            }).success(function(data, status) {
                    $ionicLoading.hide();
                    deferred.resolve(status);
                })
                .error(function(data, status) {
                    $ionicLoading.hide();
                    deferred.resolve(status);

                });
			return deferred.promise;
        }   
		
		
		self.errors = function(form, status) {
            if (status == 400)
			{
				$ionicPopup.show({
                    title: 'Error',
                    subTitle: 'Bad Request',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {});
			}
            else if (status == 500)
			{
				$ionicPopup.show({
                    title: 'Error',
                    subTitle: 'Server Error',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {});
			}
          else if (status == 400) {
                $ionicLoading.hide();
                $ionicPopup.show({
                    title: 'Field Missing',
                    subTitle: 'Bad Request',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {

                });
            } else if (status == 412) {
                $ionicLoading.hide();
                form.password.$setValidity("password", false);
            } 
			
			
			else {
                $ionicPopup.show({
                    title: 'Error',
                    subTitle: 'Oops something went worng !',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {});

            }
        };
    }
    return new profileSet();
})


app.factory('detailData',function($http, $q, $ionicLoading, $ionicPopup, $localStorage, serviceLink,$rootScope){
 function detailData() {
        var self = this;
        self.detail = function() {
			var deferred = $q.defer();
        var tripID = $rootScope.tripid;
        $ionicLoading.show({
            //template: 'loading'
            template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'
        });
        $http.get(serviceLink.url + 'SaltieApp/rest/cruise/details/' + tripID + '/tripId').success(function(data) {
			$ionicLoading.hide();
			deferred.resolve(data);
         }).error(function(data){
			deferred.resolve("error value");
		});
			return deferred.promise;
		}
		}

    return new detailData();
})



app.controller('formValidation',function($scope, $location, $state, $http, $localStorage, $state, loginService, serviceLink,themeFilter){
	
		$scope.setpassword = function(form,user) 
		{
            form.password.$setValidity("password", true);
			form.$setPristine();
        }
		$scope.resetEmail=function(form)
		{
			form.email.$setValidity("emailNot", true);
			form.email.$setValidity("emailExist", true);
			form.$setPristine();
		}

 		$scope.setpasswordc = function(form) {
            form.passwordc.$setValidity("dontMatch", true);
			form.$setPristine();
        }
		
		$scope.setOTP=function(form)
		{
			form.otp.$setValidity("otpMiss", true);
			form.otp.$setValidity("otpExp", true);
			form.$setPristine();
		}
		$scope.resetEmail=function(form)
		{
			form.email.$setValidity("emailNot", true);
			form.email.$setValidity("emailExist", true);
			form.$setPristine();
		}
		$scope.resetFrom=function(form)
		{
			form.$setPristine();
		}
	  	$scope.setConpassword = function(form) {
            form.passwordc.$setValidity("dontMatch", true);
			form.$setPristine();
        }
})




function AvoidSpace(event) {
    var k = event ? event.which : window.event.keyCode;
    if (k == 32) return false;
}




app.controller('filterController',function($scope, $location, $http, $rootScope, $filter, $localStorage, $ionicLoading, serviceLink, $ionicModal,themeFilter,$ionicPopup,advanceFilter,$ionicScrollDelegate,$timeout){
	/* ==========================================================================
  						declaring values
   ========================================================================== */
		$rootScope.orderBy="asc";
		$rootScope.month[0]=[{month:"Jan",value: false,number:1},{ month:"Feb",value: false,number:2}, {month:"Mar",value: false,number:3}, {month:"Apr",value: false,number:4}, {month:"May",value: false,number:5},{month:"Jun",value: false,number:6},{ month:"Jul",value: false,number:7},{ month:"Aug", value: false,number:8}, {month:"Sep",value: false,number:9}, {month:"Oct",value: false,number:10},{month:"Nov",value: false,number:11},{ month:"Dec",value: false,number:12}];
	
	 	$rootScope.month[1]=[{month:"Jan",value: false,number:1},{ month:"Feb",value: false,number:2}, {month:"Mar",value: false,number:3}, {month:"Apr",value: false,number:4}, {month:"May",value: false,number:5},{month:"Jun",value: false,number:6},{ month:"Jul",value: false,number:7},{ month:"Aug", value: false,number:8}, {month:"Sep",value: false,number:9}, {month:"Oct",value: false,number:10},{month:"Nov",value: false,number:11},{ month:"Dec",value: false,number:12}];
	
		$rootScope.month[2]=[{month:"Jan",value: false,number:1,id:"mon1"},{ month:"Feb",value: false,number:2,id:"mon2"}, {month:"Mar",value: false,number:3,id:"mon3"}, {month:"Apr",value: false,number:4,id:"mon4"}, {month:"May",value: false,number:5,id:"mon5"},{month:"Jun",value: false,number:6,id:"mon6"},{ month:"Jul",value: false,number:7,id:"mon7"},{ month:"Aug", value: false,number:8,id:"mon8"}, {month:"Sep",value: false,number:9,id:"mon9"}, {month:"Oct",value: false,number:10,id:"mon10"},{month:"Nov",value: false,number:11,id:"mon11"},{ month:"Dec",value: false,number:12,id:"mon12"}];
		$rootScope.yearColor="";
		$rootScope.selectedYear=[{year:"",value:[]},{year:"",value:[]},{year:"",value:[]}];
		$rootScope.year=[];
		$rootScope.year[0]=new Date().getFullYear();
		$rootScope.year[1]=new Date().getFullYear()+1;
		$rootScope.year[2]=new Date().getFullYear()+2;
	
	
	
	/* ==========================================================================
  						Experience Type Functionality
   ========================================================================== */

	$rootScope.lifestyle = function(style) 
		{
			if($rootScope.preStyle==style)
			{
					 $rootScope.filterShipPort.style = "All";	
				     $rootScope.preStyle="";
			}
			else
			{
				$rootScope.filterShipPort.style = style;
				$rootScope.preStyle=style;
			}
			
				$rootScope.filterShipPort.flag=0;
				$rootScope.filterLifstyle();
		}

        $rootScope.isLifestyleActive = function(style) {
            return $rootScope.filterShipPort.style == style;
        }
	
		 //disable lifesytle button 
		 $rootScope.disableLife=function(lifestyle)
		 {
			 for(i=0;i<$rootScope.shipPort.lifestyle.length;i++)
			 {
				 if($rootScope.shipPort.lifestyle[i] == lifestyle)
				 {
					 return false;
				 }
			 }
			 return true;
		 }
		 
	
	
	
	/* ==========================================================================
  						Duration Functionality
   ========================================================================== */
	
	$rootScope.duration=function(cruiseDur)
		{
			if($rootScope.preDuration==cruiseDur)
			{
				$rootScope.filterShipPort.duration=""
				$rootScope.preDuration="";
			}
			else{
			$rootScope.filterShipPort.duration = cruiseDur;
				$rootScope.preDuration=cruiseDur;
			}
			$rootScope.filterShipPort.flag=1;
			 $rootScope.filterLifstyle();
		}
		
		
		$rootScope.isDurationActive = function(cruiseDur) 
		{
            return $rootScope.filterShipPort.duration == cruiseDur;
        }
		 
		//disable duration button
		 	 $rootScope.disableDuration=function(duration)
		 {
			 for(i=0;i<$rootScope.shipPort.duration.length;i++)
			 {
				 if($rootScope.shipPort.duration[i] == duration)
				 {
					 return false;
				 }
			 }
			 return true;
		 }
			 
	
	/* ==========================================================================
  						CruiseLine Functionality
   	========================================================================== */
	$rootScope.filterCruiseLine=function()
		{
			var y=document.getElementById("cruiseLine");
			var cruiseLine = y.options[y.selectedIndex].value;
			$rootScope.filterShipPort.cruiseLine=cruiseLine;
			$rootScope.filterShipPort.flag=2;
			$rootScope.filterLifstyle();
		}
	/* ==========================================================================
  						SelectPort Functionality
   	========================================================================== */
		 
		 $rootScope.filterPortName=function()
		{
			var x=document.getElementById("portName");
			var port = x.options[x.selectedIndex].value;
			$rootScope.filterShipPort.ports=port;
			$rootScope.filterShipPort.flag=3;
			$rootScope.filterLifstyle();
		}

		
	/* ==========================================================================
  						SelectShip Functionality
   	========================================================================== */
		
		$rootScope.filterShipName=function()
		{
			var y=document.getElementById("shipName");
			var ship = y.options[y.selectedIndex].value;
			$rootScope.filterShipPort.ship=ship;
			$rootScope.filterShipPort.flag=4;
			$rootScope.filterLifstyle();
		}
	
	/* ==========================================================================
  						Month and Year Functionality
   	========================================================================== */
		$rootScope.disableCheck=function(number,year)
	{
		var d = new Date();
		var index1=0;
		if(year==d.getFullYear()+1)
			index1=1;
		if(year==d.getFullYear()+2)
			index1=2;
		
		if($rootScope.shipPort.month=="" || $rootScope.shipPort.month[year]=='' )
			return;
		else{
				if($rootScope.shipPort.year.indexOf(year.toString())>=0)
				{
					if($rootScope.shipPort.month[year].indexOf(parseInt(number)) < 0){
						$rootScope.month[index1][parseInt(number)-1].value=false;
						$rootScope.disableColor=true;
						return true;
					}
					else {
						
						$rootScope.disableColor=false;
						return false;
					}
				}
				else
				{
					$rootScope.month[index1][parseInt(number)-1].value=false;
					$rootScope.disableColor=true;
					return true;
				}
			}
	}
	
		$rootScope.commonMonthYear=function(monthArg){
			var monthArr='';
		 monthArg.forEach(function(month) {
				 

			 if (month.value) {
	      // If this is not the first item
        	if (monthArr) {
					monthArr += '-'
        	}
        	monthArr += month.number;
			 }
		 })
		 return monthArr;
	}
		
		
		//reset to previously selected month
	
$rootScope.resetDateMonth=function(months,index){
			if(months==null)
				return;
			for(j=0;j<12;j++){
					 $rootScope.month[index][j].value=false;
				}
             var str=months.split("-");
			if(str =='')
				return;
		   for(i=0;i<str.length;i++){
				 var a=str[i]-1;
				 $rootScope.month[index][a].value=true;
             }
         }


	$rootScope.monthSelect=function()
	{
			var yearArr='';
			var monthArr='';
			var month=$rootScope.commonMonthYear($rootScope.month[0]);
			if(month)
				yearArr=$rootScope.year[0];
			
			monthArr=month;
			 var month1=$rootScope.commonMonthYear($rootScope.month[1]);
			if(month1){
				if(yearArr){
					yearArr+="-";
					monthArr+="@";
				}
				monthArr+=month1;
				yearArr+=$rootScope.year[1];
				
			}
			 var month2=$rootScope.commonMonthYear($rootScope.month[2]);
			if(month2){
				if(yearArr){
					yearArr+="-";
					monthArr+="@";
				}
				monthArr+=month2;
				yearArr+=$rootScope.year[2];
			}
	
			$rootScope.filterShipPort.month=monthArr;
			$rootScope.filterShipPort.year=yearArr;
			$rootScope.filterLifstyle();
	}


		 $rootScope.isYearActive=function(year)
		 	{
			 return $rootScope.yearColor==year;
		 	}
		 $rootScope.nextClick=function(page)
			{
			$rootScope.myActiveSlide=page;
			}
		 $rootScope.perYear=function(year,index)
			{
			$rootScope.myActiveSlide=index;
			}
		 $rootScope.slideHasChanged=function(index)
		 {
			 $rootScope.myActiveSlide=index;
		 }
		 
		// set Color for month box 
		 	 
	 $rootScope.set_color=function(year,index)
	 {
		 if(index==0)
		 {
			  return {
                color: "#339fa6"
            }
		 }
		 else if(index==1)
		 {
			 return {
                color: "#9c867a"
            }
		 }
		 else if(index==2){
			 return {
                color: "#00232d"
            }
		 }
	 }
	 
	/* ==========================================================================
  						Apply Filter Functionality
   	========================================================================== */

	// function for clicking apply filter
		$rootScope.applyFilter=function()
		{
			$rootScope.applyFilterFlag=1; 
			  $rootScope.list = [];
			$rootScope.noMoreItemsAvailable=false;
			 $ionicScrollDelegate.scrollTop();
			
			var yearArr='';
			var monthArr='';
			var month=$rootScope.commonMonthYear($rootScope.month[0]);
			if(month)
				yearArr=$rootScope.year[0];
			
			monthArr=month;
			 var month1=$rootScope.commonMonthYear($rootScope.month[1]);
			if(month1){
				if(yearArr){
					yearArr+="-";
					monthArr+="@";
				}
				monthArr+=month1;
				yearArr+=$rootScope.year[1];
				
			}
			 var month2=$rootScope.commonMonthYear($rootScope.month[2]);
			if(month2){
				if(yearArr){
					yearArr+="-";
					monthArr+="@";
				}
				monthArr+=month2;
				yearArr+=$rootScope.year[2];
			}
	
			$rootScope.filterShipPort.month=monthArr;
			$rootScope.filterShipPort.year=yearArr;
			
			var po = document.getElementById("portName");
			var sh = document.getElementById("shipName");
			var cl = document.getElementById("cruiseLine");
			var cruiseline = cl.options[cl.selectedIndex].value;
			var port = po.options[po.selectedIndex].value;
			var ship = sh.options[sh.selectedIndex].value;
			$rootScope.filterShipPort.ship=ship;
			$rootScope.filterShipPort.ports=port;
			$rootScope.filterShipPort.cruiseLine=cruiseline;
			$rootScope.backArrow.expType=angular.copy($rootScope.filterShipPort.style);
            $rootScope.backArrow.duration=angular.copy($rootScope.filterShipPort.duration);
             $rootScope.backArrow.orderBy=angular.copy($rootScope.filterShipPort.orderby)
             $rootScope.shipPort1=angular.copy($rootScope.shipPort);
            $rootScope.backArrow.ship=sh.selectedIndex;
             $rootScope.backArrow.cruiseLine=cl.selectedIndex;
              $rootScope.backArrow.port=po.selectedIndex;
            $rootScope.backArrow.month1=angular.copy(month);
            $rootScope.backArrow.month2=angular.copy(month1);
            $rootScope.backArrow.month3=angular.copy(month2); 
			
			
				$rootScope.filterShipPort1=angular.copy($rootScope.filterShipPort); 			
		  $rootScope.list = [];	
		$rootScope.totalDisplayed=0;

				$rootScope.countCruise="";

				advanceFilter.filter($rootScope.filterShipPort1).then(
                        /* success function */
                        function(data) {
							$rootScope.countCruise=data.AllCount;
								if($rootScope.countCruise==0){
									$rootScope.count=0;
									// $rootScope.resetFilter();
											 $ionicPopup.show({
													title: 'For the selected month there is no cruise available',
													subTitle: 'Please try different months',
													buttons: [{
														text: 'Ok'
													}]
												}).then(function(res) {
													 });
												}
												else{
													$rootScope.filterModal.hide();
											$location.path('/app/list');
												}
                                $ionicLoading.hide();
                        },function(error) {
                alert("There was a problem");
                console.log(error);
            })
			}
	
	
		
	/* ==========================================================================
  						SortBY Functionality
   	========================================================================== */
		
		
		$rootScope.sortBy=function(orderBy)
		{
			$rootScope.filterShipPort.orderby=orderBy
			$rootScope.orderBy=orderBy;
		}
		 $rootScope.isSortByActive=function(orderBy)
		 {
			 return $rootScope.filterShipPort.orderby==orderBy;
		 }
		 
	/* ==========================================================================
  						Reset Functionality
   	========================================================================== */ 
		 
		 
		 $rootScope.resetFilterHome=function(){
			 $rootScope.clickFilterFlag=0;
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
		
		 }
		 
		 $rootScope.resetFilter=function()
		 {
			 $rootScope.resetFilterHome();	
			 $rootScope.showFilter();
		 }
		
});



app.controller('loginSignUpController',function($scope, $location, $http, $rootScope, $filter, $localStorage, $ionicLoading, serviceLink,$ionicPopup,loginService,favService,facebookService){

	  //toggle the email login field function
        $rootScope.hideForm = true;
        $rootScope.toggle = function() {
		$rootScope.hideForm = $scope.hideForm === false ? true : false;
        }
				 
	/* ==========================================================================
  						login through facebook
   	========================================================================== */ 
        
        $rootScope.facebookLogin = function() {
            facebookService.facebook().then(function(result) {
                $ionicLoading.show({
                    template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'
                });

                $scope.profileData = result.data; //assign facebook data to profiledata
                //post request to store the facebook user detail in our database such as(email,firstname,lastname,token a unique id given by the facebook)
                var url = serviceLink.url + 'SaltieApp/rest/cruise/user/registration/fb';
                var data = "userName=" + result.data.id + "&token=" + result.data.id + "&firstName=" + $scope.profileData.first_name + "&lastName=" + $scope.profileData.last_name;
                loginService.login(url, data)
                    .then(
                        /* success function */
                        function(status) {
                            if (status == 200) {
								
								$localStorage.Name=$scope.profileData.first_name+" "+$scope.profileData.last_name;
                                $localStorage.userName = result.data.id;
								//menu item do be displayed when facebook login
								$rootScope.loginLogout="Log out";
								$rootScope.showMyFav=false;
								$rootScope.showEngage=false;
                                $rootScope.hidePhBook=true;
								$rootScope.showProfileSet=true;

								if($rootScope.logSignClicked=="Favourite")
								{
                                $rootScope.logsignModal.hide();
									if($rootScope.isFavourite($rootScope.tripidfav)==false) 
                                favService.favorite($rootScope.tripidfav, $rootScope.indexfav);
								}
                                else if($rootScope.logSignClicked == "nextStep"){
                                    $rootScope.logsignModal.hide();
                                    $location.path('/app/emailUs');
                                }
                                else if($rootScope.logSignClicked == "engageUs"){
                                    $rootScope.logsignModal.hide();
                                    $location.path('/app/engageUser');
                                }
								else
								{
									$rootScope.logsignModal.hide();
									$rootScope.share();
								}
								
                            } else {

                                $ionicPopup.show({
                                    title: 'Error',
                                    subTitle: 'Oops somthing went worng !',
                                    buttons: [{
                                        text: 'Ok'
                                    }]
                                }).then(function(res) {});
                                $ionicLoading.hide();

                            }
                        });
            }, function(error) {
                alert("There was a problem signing in!  See the console for logs");
                console.log(error);
            });
        }
		
		
/* ==========================================================================
  						signup functionality 
   	========================================================================== */ 
        
        $rootScope.signUp = function(form, user) {
            if (form.$valid) //checking form valid or not
            {
                var url = serviceLink.url + 'SaltieApp/rest/cruise/user/registration/app';

                var data = "userName=" + user.email + "&password=" + user.password + "&firstName=" + user.firstName + "&lastName=" + user.lastName;
                $scope.status = "";
                loginService.login(url, data)
                    .then(
                        /* success function */
                        function(status) {
                            $scope.status = status;
                            if ($scope.status == 200) {
								//menu item do be displayed when signup
								$rootScope.loginLogout="Log out";
								$rootScope.showMyFav=false;
                                $rootScope.showEngage=false;
                                $rootScope.hidePhBook=true;
								$rootScope.showProfileSet=false;
                                $localStorage.userName = user.email;
                                // $localStorage.authToken = data.token;
								if($rootScope.logSignClicked=="Favourite")
								{
                                $rootScope.logsignModal.hide();
                                favService.favorite($rootScope.tripidfav, $rootScope.indexfav);
								}
                                else if($rootScope.logSignClicked == "nextStep"){
                                    $rootScope.logsignModal.hide();
                                    $location.path('/app/emailUs');
                                }
                                else if($rootScope.logSignClicked == "engageUs"){
                                    $rootScope.logsignModal.hide();
                                    $location.path('/app/engageUser');
                                }
								else
								{
									$rootScope.logsignModal.hide();
									$rootScope.share();
								}
                                
                            } else {
                                loginService.errors(form, $scope.status);
                            }

                        }, function(error) {
                            //If an error happened, handle it here
                        })
            }
        }
		
				
/* ==========================================================================
  						Login  functionality 
   	========================================================================== */ 
        $rootScope.Login = function(form, user) {
            if (form.$valid) //cheacking the form valid or not
            {
                var url = serviceLink.url + 'SaltieApp/rest/cruise/user/login';
                var obj = {
                    userName: user.email1,
                    password: user.password1
                };
                var data = "userName=" + obj.userName + "&password=" + obj.password;
                $scope.status = "";
                loginService.login(url, data)
                    .then(
                        /* success function */
                        function(status) {
                            $scope.status = status;
                            if ($scope.status == 200) {
								//menu item do be displayed when login
								$rootScope.loginLogout="Log out";
								$rootScope.showMyFav=false;
                                $rootScope.showEngage = false;
                                $rootScope.hidePhBook=true;
								$rootScope.showProfileSet=false;
								$localStorage.userName = user.email1;
								//favourite the cruise while login is finished
								if($rootScope.logSignClicked=="Favourite")
								{
                                $rootScope.logsignModal.hide();
									if($rootScope.favourite1!=null || $rootScope.favourite1!='')
										$rootScope.favourite=angular.copy($rootScope.favourite1);
									if($rootScope.isFavourite($rootScope.tripidfav)==false) 
                                favService.favorite($rootScope.tripidfav, $rootScope.indexfav);
								}
                                else if($rootScope.logSignClicked == "nextStep"){
                                    $rootScope.logsignModal.hide();
                                    $location.path('/app/emailUs');
                                }
                                else if($rootScope.logSignClicked == "engageUs"){
                                    $rootScope.logsignModal.hide();
                                    $location.path('/app/engageUser');
                                }
								else
								{
									$rootScope.logsignModal.hide();
									$rootScope.share();
								}
                            } else {
                                loginService.errors(form, $scope.status);
                            }


                        }, function(error) {
                            //If an error happened, handle it here
                        });
            }
        }
	
});


app.controller('emailUsController', function($scope, $state, $rootScope, $state, $location, $http, $localStorage, $ionicLoading, $ionicPopup, engageService, serviceLink, getCountryService) {
    
    $scope.detail = angular.copy($rootScope.TempDetail);
    
    $rootScope.engageData = $scope.detail;
    
    $rootScope.TempDetail = "";
    
    $scope.personCount = [];
    $scope.personCount = [0,1,2,3,4,5];
    
    $scope.filterCondition={
        room: 'Oceanview'
    }
    
    $scope.roomCat = {   
        "type": "select", 
        "name": "roomType",
        "value": $rootScope.buttonType,
        "values": [ "Select Room Type", "Interior", "Oceanview", "Balcony", "Suite"] 
    };
    
    /* ==========================================================================
  						get country
   	========================================================================== */
  
        var url = serviceLink.url+"SaltieApp/rest/cruise/countryAndState/all";
        getCountryService.getCountry(url)
                    .then(
                        /* success function */
                       function(data) {
                            $scope.countryState = data;
                            //$scope.states = data[0].state;
                            $ionicLoading.hide();
                            /*$scope.status = status;
                            if ($scope.status == 204) {
                                //alert(2);
                                //$location.path('/emaillogin');
                                $ionicLoading.hide();
                            } else {
                                //engageService.errors(form, $scope.status);
                                //alert(01);
                            }*/

                        }, function(error) {
                            //error handling goes here...
                        })
    /* ==========================================================================
  						get Selected State
   	========================================================================== */
        
//        $scope.getState = function(){
//            var selectedCountry = document.getElementById("country").value;
//            $scope.index = $scope.countryState[0].countryName.indexOf(selectedCountry);
//            alert($scope.index);
//            $scope.states = $scope.countryState[$scope.index].state;
//        }
        
    /* ==========================================================================
  						toggle pref contact
   	========================================================================== */
		
    $scope.toggle = "email";
    $scope.prefContact=function(toggle)
    {
        $scope.toggle=toggle;
    }
     $rootScope.activePrefContact=function(toggle)
     {
         return $scope.toggle==toggle;
     }
    
    
    $scope.gePrefContact = function(type){
        
       $scope.pref = type;
    }
    //alert($rootScope.logSignClicked);
    $scope.user = {};
    $scope.user.firstName = $localStorage.Name.split(" ")[0];
    $scope.user.lastName = $localStorage.Name.substr($localStorage.Name.indexOf(' ')+1);
    
    if($localStorage.userName.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        $scope.user.email = $localStorage.userName;   
    }
    
	
	if(typeof analytics !== 'undefined') { analytics.trackView("Email Us Controller"); }
	
    if ($localStorage.userName != "" || $localStorage.userName != null || $localStorage.userName != "Guest") {
        $scope.close = function() {
            $location.path('/start');
        }
       
		

        $scope.submitEmailUs = function(form, user) {
                var kid = document.getElementById("kid");
                var adult = document.getElementById("adult");
                var senior = document.getElementById("senior");
                var kids = kid.options[kid.selectedIndex].value;
                var adults = adult.options[adult.selectedIndex].value;
                var seniors = senior.options[senior.selectedIndex].value;
                var roomType = document.getElementById("roomType").value;
                var country = document.getElementById("country").value;
               
            if (form.$valid) //checking form valid or not
            {
                if($scope.pref == undefined){
                    $scope.pref = "email";
                }
                
                var url = serviceLink.url + 'SaltieApp/rest/cruise/requestQuote';
                
                var data = "firstName=" + user.firstName + "&lastName=" + user.lastName + "&email=" + user.email + "&phone=" + user.phone + "&tripId=" + $rootScope.detail.tripDetails.tripId + "&country=" + country + "&state=" + user.state + "&roomType=" + user.roomType + "&preferedContact =" + $scope.pref + "&adults=" + adults + "&kids=" + kids + "&seniors=" + seniors + "&comments=" + user.comment;
                $scope.status = "";
                
                engageService.submit(url, data)
                    .then(
                        /* success function */
                        function(status) {
                            //alert(status);
                            $scope.status = status;
                            if ($scope.status == 204) {
                                //alert(2);
                                //$location.path('/emaillogin');
                                $ionicLoading.hide();
                            } else {
                                //engageService.errors(form, $scope.status);
                                //alert(01);
                            }

                        }, function(error) {
                            
                        })
            }
        }
    } else {
        $state.go('app.lifeStyle');
    }
    //go back to listing from emailUs
    $scope.goToListing = function(){
        $location.path('/app/list');
    }
    
    $scope.back = function() {
            window.history.back();
            $rootScope.TempDetail = $scope.detail;
        console.log($rootScope.TempDetail);

        }
    
});


app.controller('modalCtrl',function($scope, $location, $http, $rootScope, $filter, $localStorage, $ionicLoading, serviceLink,$ionicPopup,loginService,$ionicModal,$ionicSlideBoxDelegate,$timeout,profileSet,profileGet,$sce,$filter){
		
	$rootScope.linkUrl=serviceLink.url;
	$scope.readyBookDisable = false;
	
	
	/* ==========================================================================
  						All Modal declaration
   	========================================================================== */ 
	 $ionicModal.fromTemplateUrl('templates/aboutModal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.aboutModal = modal;
        })
	 
	  $ionicModal.fromTemplateUrl('templates/profileSetting.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.profileSet = modal;
        })
	 
	  $ionicModal.fromTemplateUrl('templates/phoneModal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.phoneModal = modal;
        })
	  $ionicModal.fromTemplateUrl('templates/faqModal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.faqModal = modal;
        })
	  
	    $ionicModal.fromTemplateUrl('templates/termModal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.termModal = modal;
        })
	
		//filter modal start's here
		 $ionicModal.fromTemplateUrl('templates/filterLifestyleModal.html', {
            scope: $rootScope
        }).then(function(modal) {
            $rootScope.filterModal = modal;
        })
		 
	
			//modal declaration	
		$ionicModal.fromTemplateUrl('templates/loginSignup.html', {
            scope: $rootScope
        }).then(function(modal) {
            $rootScope.logsignModal = modal;
        })


	
		$ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope,
			animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        })

        $ionicModal.fromTemplateUrl('templates/video.html', {
            scope: $scope,
			hardwareBackButtonClose: false
        }).then(function(modal) {
            $scope.showVideo = modal;
        })

        $ionicModal.fromTemplateUrl('templates/shipActivity.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal2 = modal;
        });
	
	
	/* ==========================================================================
  						Close LoginSignUp modal
   	========================================================================== */
    $rootScope.closeLoginSign=function()
		{
            
			$rootScope.logsignModal.remove();
			$rootScope.hideForm = true;
			$ionicModal.fromTemplateUrl('templates/loginSignup.html', {
            scope: $rootScope
        }).then(function(modal) {
            $rootScope.logsignModal = modal;
        })
    }
    /*==========================================================================
  						Video Modal functionality
   	========================================================================== */
	  $scope.video = function() 
		{
		  	$rootScope.videoURL=$rootScope.detail.tripDetails.ship.videoUrl+'?autoplay=1&rel=0';
            $scope.showVideo.show();
        }
		
	  $scope.closeVidio=function()
		{
			$scope.showVideo.remove();
			$ionicModal.fromTemplateUrl('templates/video.html', {
            scope: $scope,
				hardwareBackButtonClose: false
        }).then(function(modal) {
            $scope.showVideo = modal;
        })
		}
	  
	   
		 $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
		
	  
	  
	/* ==========================================================================
  						Activity Modal functionality
   	========================================================================== */
        $scope.activityModal = function(index) {
			$ionicSlideBoxDelegate.$getByHandle('detailSlide').stop();
//			$ionicSlideBoxDelegate.$getByHandle('activity').slide(index,200);
			
			 $ionicLoading.show({
                    template: '<img src="./img/logo1.png" width="20%"/><br><ion-spinner icon="dots" class="spinner-balanced"/>'
                });
						

			$scope.modal2.show();
			$timeout(function() {
							console.log(index);
								$ionicSlideBoxDelegate.$getByHandle('activity').update();
    							$ionicSlideBoxDelegate.$getByHandle('activity').slide(index);
											$ionicLoading.hide();
				},500);

//			$timeout(function() {
//								console.log(index);
//								$ionicSlideBoxDelegate.$getByHandle('activity').update();
//								$ionicSlideBoxDelegate.$getByHandle('detailSlide').stop();
//    		$ionicSlideBoxDelegate.$getByHandle('activity').slide(index);
//				
//			},   100);
        }
		
		$scope.closeModal = function()
		{
			$scope.modal2.hide();

			$ionicSlideBoxDelegate.$getByHandle('detailSlide').start();
		}
		
		
	/* ==========================================================================
  						Cabintype Modal functionality
   	========================================================================== */
 		$scope.displayCabin = function(cat, index, price) {
            $rootScope.CabinIndex = index;
            $scope.category = cat;
            $scope.cabinInfo = $scope.detail.tripDetails.ship.cabinType;
            $scope.price = price;
			
			if($scope.price == "Sold Out")
			{
				$scope.readyBookDisable = true;
			}
            $scope.modal.show();
				$timeout(function() {
				console.log(index);
					$ionicSlideBoxDelegate.$getByHandle('cabinType').update();
				$ionicSlideBoxDelegate.$getByHandle('cabinType').slide(index);
			},   300);
        };
	
        $scope.setPrice = function(prices, index, date) {
            if (index == 0) {
                $rootScope.priceList = prices;
                $rootScope.date = date;
            }
        };
	
	$scope.cabinTypeClose = function()
	{
		$scope.modal.hide();
		$scope.readyBookDisable = false;
	}
	
	
	$scope.cabinSlideChanged = function(index)
	{
		$scope.readyBookDisable = false;
		var sample = $filter('orderByCategory')($rootScope.priceList);
		$scope.category= sample[index];
		$scope.price = $rootScope.priceList[$scope.category][0];
		if($scope.price == "Sold Out")
			{
				$scope.readyBookDisable = true;
			}
	}
	
	/* ==========================================================================
  						about Modal functionality
   	========================================================================== */
	
	 $scope.aboutClick=function()
	 {
		 $scope.aboutModal.show();
	 }

	 
	/* ==========================================================================
  						Phone and Faq Modal functionality
   	========================================================================== */
	 $scope.phoneClick=function()
	 {
		 $scope.phoneModal.show();
	 }
	 
	 $scope.faqClick=function()
	 {
		 $scope.faqModal.show();
	 }
	 
	/* ==========================================================================
  						Term Modal functionality
   	========================================================================== */
	  $scope.termClick=function()
	 {
		 $scope.termModal.show();
	 }
	  
	/* ==========================================================================
  						ProfileSetting Modal functionality
   	========================================================================== */
	  $scope.profileSetting=function()
	  {
		  	$scope.buttonName="Change Password";
		  	$scope.changePasshide=true;
			$scope.passwordValidity=0;
		    profileGet.profile()
                    .then(
                        /* success function */
                        function(data) {
							$scope.user=data;
                        }, function(error) {
                            //If an error happened, handle it here
                        })
		  
		  $scope.profileSet.show();
	  }
	  
	  
	  $scope.closeProfile=function()
	  {
		    $scope.profileSet.remove();
		  $ionicModal.fromTemplateUrl('templates/profileSetting.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.profileSet = modal;
        })
		  
	  }
	  
	   
	  $scope.editProfile=function(form,user)
	  {
		  
		  if (user.newPassword != user.passwordc) {
                form.passwordc.$setValidity("dontMatch", false);
		  }
		  if($scope.passwordValidity==0)
		  {
			  	form.password.$setValidity("password", true);
			  	form.passwordc.$setValidity("dontMatch", true);
			  	form.newPassword.$setValidity("required", true);
		  		form.passwordc.$setValidity("required", true);
		  }
		      if (form.$valid) //checking form valid or not
            {
				
				if(user.newPassword == '' || user.newPassword == undefined )
				{
					user.newPassword ="";
				}
                var data = "userName=" + $localStorage.userName +"&firstName=" + user.firstName + "&lastName=" + user.lastName+"&oldPassword=" + user.oldPassword +"&newPassword=" + user.newPassword ;
				 $scope.status = "";
                profileSet.profileS(data)
                    .then(
                        /* success function */
                       function(status) {
                            $scope.status = status;
                            if ($scope.status == 200) {
										$ionicPopup.show({
													title: 'Success',
													subTitle: 'Your Profile is Updated',
													buttons: [{
														text: 'Ok'
													}]
												}).then(function(res) {
													 });   
								$localStorage.Name=user.firstName;
								$scope.closeProfile();
							} else {
                                profileSet.errors(form, $scope.status);
                            }

                        }, function(error) {
                            //If an error happened, handle it here
                        })
            }
	  }
	  
	  
	  	  $scope.showPassfield=function(form,user)
	  {
		  if($scope.passwordValidity==0)
		  {
			  $scope.buttonName="Back";
			  $scope.changePasshide=false;
			  form.newPassword.$setValidity("required", false);
			  form.passwordc.$setValidity("required", false);
			  form.$setPristine();
			  $scope.passwordValidity=1;
		  }
		  else
		  {
			  $scope.changePasshide=true;
			  $scope.buttonName="Change Password";
			  $scope.passwordValidity=0;
			  user.newPassword="";
			  user.passwordc="";
		  }
	  }
});