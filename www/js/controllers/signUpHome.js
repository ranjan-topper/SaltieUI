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