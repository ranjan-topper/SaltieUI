app.controller('emailUsController', function($scope, $state, $rootScope, $state, $location, $http, $localStorage, $ionicLoading, $ionicPopup, engageService, serviceLink, getCountryService) {
    var id="";
    $scope.detail = angular.copy($rootScope.TempDetail);
	if($scope.detail != "")
	{
		id=$scope.detail.tripDetails.tripId;
		    $rootScope.engageData = $scope.detail.tripDetails.tripId;

	}
	$scope.pref = "email";
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
						   $scope.states =data[0].state;
                            $ionicLoading.hide();
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
				
                
                var url = serviceLink.url + 'SaltieApp/rest/cruise/requestQuote';
                
                var data = "firstName=" + user.firstName + "&lastName=" + user.lastName + "&email=" + user.email + "&phone=" + user.phone + "&tripId=" + id + "&country=" + country + "&state=" + user.state + "&roomType=" + user.roomType + "&preferedContact =" + $scope.pref + "&adults=" + adults + "&kids=" + kids + "&seniors=" + seniors + "&comments=" + user.comment;
                $scope.status = "";
                
                engageService.submit(url, data)
                    .then(
                        /* success function */
                        function(status) {
                            //alert(status);
                            $scope.status = status;
                            if ($scope.status == 204) {
                                $ionicPopup.show({
                                    title: 'Success',
                                    subTitle: 'Soon we will contact you !',
                                    buttons: [{
                                        text: 'Ok'
                                    }]
                                }).then(function(res) { 
									$location.path('/app/engageUser');  
									$rootScope.TempDetail = $scope.detail;
								
								});
                                $ionicLoading.hide();
                            } else {
                               $ionicPopup.show({
                                    title: 'Error',
                                    subTitle: status.message,
                                    buttons: [{
                                        text: 'Ok'
                                    }]
                                }).then(function(res) {  });
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