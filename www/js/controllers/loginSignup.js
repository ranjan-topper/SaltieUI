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
                                    $location.path('/app/engageUser');
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
                                    $location.path('/app/engageUser');
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
                                    $location.path('/app/engageUser');
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