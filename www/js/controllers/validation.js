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
		
		

		
});