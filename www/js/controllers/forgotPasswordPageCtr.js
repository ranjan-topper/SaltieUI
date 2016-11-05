app.controller('forgotPasswordPageCtr', function($scope, $location, $state, $localStorage, $ionicPopup, $ionicLoading, $http, loginService, serviceLink, $stateParams) {
    console.log($stateParams);
    $scope.user = $stateParams;
    $scope.enableVerCode = true;
    var isIPad = ionic.Platform.isIPad();
    var isIOS = ionic.Platform.isIOS();
    if (isIPad == true || isIOS == true) {
        document.getElementById("sendemail").style.marginTop = "20px";
    }

    if (typeof analytics !== 'undefined') { analytics.trackView("Forgot Password Controller"); }

    if ($localStorage.userName == "" || $localStorage.userName == null || $localStorage.userName == "Guest") {

        $scope.close = function() {
            $location.path('/startingPage');
        }
        $scope.back = function() {
            $location.path('/emailLoginPage');
        }
        $scope.Sendemail = function(form, user) {
            if (form.$valid) {
                //ionicloading is a busy cursor which display the template given below


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
                        $scope.enableVerCode = false;
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

                $http({
                    method: 'POST',
                    url: serviceLink.url + 'SaltieApp/rest/cruise/user/forgot/reset',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'

                    },
                    data: "email=" + $localStorage.emailver + "&password=" + user.password + "&code=" + user.otp
                }).success(function(data, status, headers, config) {
                    if (status == 200) {

                        $ionicPopup.show({
                            title: 'Success',
                            subTitle: 'Your Password has been reset',
                            buttons: [{
                                text: 'Ok'
                            }]
                        }).then(function(res) {});
                        $ionicLoading.hide();
                        delete $localStorage.emailver;
                        $location.path('/emailLoginPage');
                    }
                }).error(function(data, status, headers, config) {
                    $ionicLoading.hide();

                    if (status == 400) {
                        $ionicLoading.hide();
                        form.otp.$setValidity("optExp", false);
                    } else {
                        loginService.errors(form, status);
                    }

                });

            }


        }


    } else {
        $state.go('app.landingPage');
    }
});