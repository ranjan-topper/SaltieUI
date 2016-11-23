app.controller('loginChoicePageCtrl', function($scope, $state, $localStorage, $location, $ionicLoading, facebookService, loginService, $ionicPopup, serviceLink, $rootScope) {


    var isIPad = ionic.Platform.isIPad();
    var isIOS = ionic.Platform.isIOS();
    if (isIPad == true || isIOS == true) {
        document.getElementById("login").style.marginTop = "20px";
    }

    if (typeof analytics !== 'undefined') { analytics.trackView("Login choice page Controller"); }
    if ($localStorage.userName == "" || $localStorage.userName == null || $localStorage.userName == "Guest") {
        $scope.email = function() //function to redirect the control to emaillogin.html
            {
                $location.path('/emailLoginPage');
            }

        $scope.close = function() //function to redirect the control to start.html
            {
                $location.path('/startingPage');
            }
        $scope.login = function() //function to perform facebook login
            {

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
                                    $localStorage.Name = $scope.profileData.first_name + " " + $scope.profileData.last_name;
                                    $rootScope.loginLogout = "Log out";
                                    $rootScope.showMyFav = false;
                                    $rootScope.showEngage = false;
                                    $rootScope.hidePhBook = true;
                                    $rootScope.showProfileSet = true;
                                    $localStorage.userName = result.data.id;
                                    $location.path('/app/landingPage');
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
        $state.go('app.landingPage');
    }
})