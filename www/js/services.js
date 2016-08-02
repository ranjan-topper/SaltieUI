//FavouriteService
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

//loginService
app.factory('loginService', function($http, $q, $ionicLoading, $ionicPopup,$localStorage,$rootScope, TokenStorage) {

    //    Create a class that represents our name service.
    function loginService() {
        var self = this;
        //    getName returns a promise which when fulfilled returns the name.
        self.login = function(url, data) {
            //    Create a deferred operation.
            var deferred = $q.defer();
         
            //    Get the name from the server.
            $http({
                method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'                     
                },
                data: encodeURI(data)
            })
                .success(function(data, status) {
                    if(status == 200)
					{
				    $localStorage.Name=data.user;
                    TokenStorage.store(data.token);
				    $rootScope.favourite1=data.favourite;
					}
                    deferred.resolve(status);
                })
                .error(function(data, status) {
                    
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
                
                alert();
            } else if (status == 401) {
                
                form.password.$setValidity("password", false);
//                $ionicPopup.show({
//                    title: 'Error',
//                    subTitle: 'Password is wrong',
//                    buttons: [{
//                        text: 'Ok'
//                    }]
//                }).then(function(res) {});
            } else if (status == 400) {
                
                $ionicPopup.show({
                    title: 'Field Missing',
                    subTitle: 'Bad Request',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {

                });
            } else if (status == 302) {
                
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
});

//getCountryService
app.factory('getCountryService', function($http, $q, $ionicLoading, $ionicPopup,$localStorage,$rootScope) {

    //    Create a class that represents our name service.
    function getCountryService() {
        var self = this;
        //    getName returns a promise which when fulfilled returns the name.
        self.getCountry = function(url) {
            //    Create a deferred operation.
            var deferred = $q.defer();
         
            //    Get the name from the server.
            $http({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .success(function(data, status) {
//                    
//                    console.log(data);
                    deferred.resolve(data);
                })
                .error(function(data, status) {
//                    
//                    alert(status);
                });

            //    Now return the promise.
            return deferred.promise;
        };
    };
        return new getCountryService();

});

//engageService
app.factory('engageService', function($http, $q, $ionicLoading, $ionicPopup,$localStorage,$rootScope) {

    //    Create a class that represents our name service.
    function engageService() {
        var self = this;
        //    getName returns a promise which when fulfilled returns the name.
        self.submit = function(url, data) {
            //    Create a deferred operation.
            var deferred = $q.defer();
          
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
                    
                    console.log(data);
					console.log(status);
                    deferred.resolve(status);
                })
                .error(function(data, status) {
                    
                    deferred.resolve(data);
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
                
                form.password.$setValidity("password", false);
//                $ionicPopup.show({
//                    title: 'Error',
//                    subTitle: 'Password is wrong',
//                    buttons: [{
//                        text: 'Ok'
//                    }]
//                }).then(function(res) {});
            } else if (status == 400) {
                
                $ionicPopup.show({
                    title: 'Field Missing',
                    subTitle: 'Bad Request',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {

                });
            } else if (status == 302) {
                
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
});

//facebookService
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
          
			//post request for favourite starts here
            $http({
                method: 'POST',
                url: serviceLink.url + 'SaltieApp/rest/cruise/favourite/set',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'           
                },
                data: "tripId=" + tripId
            }).success(function(data, status) {
                
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

});

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
         
			//post request for favourite starts here
            $http({
                method: 'GET',
                url: serviceLink.url + 'SaltieApp/rest/cruise/search?lifestyle='+data.style+'&duration='+data.duration+'&year='+data.year+'&month='+data.month+'&sortBy='+data.orderby+'&departPort='+data.ports+'&userName='+$localStorage.userName+'&shipName='+data.ship+'&cruiseLineName='+data.cruiseLine
            })
           .success(function(data) {
                
                // console.log(data);
					                        deferred.resolve(data);
            });

return deferred.promise;
        }

    }
    return new advanceFilter();
});

//Theme filter service starts here
app.factory('themeFilter', function($http, $q, $ionicLoading, $ionicPopup, $localStorage, FavouriteService, serviceLink) {
    function themeFilter() {
        var self = this;
        self.theme = function(data) {
			 var deferred = $q.defer();
//loader spinner
           
           $http.get(serviceLink.url + 'SaltieApp/rest/cruise/theme5?lifestyle='+data.style+'&duration='+data.duration+'&year='+data.year+'&month='+data.month+'&port='+data.ports+'&shipName='+data.ship+'&cruiseLineName='+data.cruiseLine).success(function(data) {
                
                // console.log(data);
			   deferred.resolve(data);

            });
return deferred.promise;
        }

    }
    return new themeFilter();

});

//profileGet
app.factory('profileGet',function($http, $q, $ionicLoading, $ionicPopup, $localStorage, serviceLink,$rootScope){
 function profileGet() {
        var self = this;
        self.profile = function() {
			var deferred = $q.defer();
      
        $http({
            method: 'GET',
            url: serviceLink.url + 'SaltieApp/rest/cruise/user/detail'
        }).success(function(data) {
            
			
			deferred.resolve(data);
         }).error(function(data){
			deferred.resolve("error value");
		});
			return deferred.promise;
		}
		}

    return new profileGet();
});

//profileSet
app.factory('profileSet', function($http, $q, $ionicLoading, $ionicPopup, $localStorage, serviceLink) {
    function profileSet() {
        var self = this;
        self.profileS = function(data) {
			//loader spinner
			  var deferred = $q.defer();
           
            $http({
                method: 'POST',
                url: serviceLink.url + 'SaltieApp/rest/cruise/user/editProfile ',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: encodeURI(data)
            }).success(function(data, status) {
                    
                    deferred.resolve(status);
                })
                .error(function(data, status) {
                    
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
                
                $ionicPopup.show({
                    title: 'Field Missing',
                    subTitle: 'Bad Request',
                    buttons: [{
                        text: 'Ok'
                    }]
                }).then(function(res) {

                });
            } else if (status == 412) {
                
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
});

//detailData
app.factory('detailData',function($http, $q, $ionicLoading, $ionicPopup, $localStorage, serviceLink,$rootScope){
 function detailData() {
        var self = this;
        self.detail = function() {
			var deferred = $q.defer();
        var tripID = $rootScope.tripid;
       
        $http.get(serviceLink.url + 'SaltieApp/rest/cruise/details/' + tripID + '/tripId').success(function(data) {
			
			deferred.resolve(data);
         }).error(function(data){
			deferred.resolve("error value");
		});
			return deferred.promise;
		}
		}

    return new detailData();
})




//curator list
app.factory('curatorList',function($http, $q, $ionicLoading, $ionicPopup, $localStorage, serviceLink,$rootScope){
 function curatorList() {
        var self = this;
        self.curator = function(liked,neutral,disliked) {
			var deferred = $q.defer();
       
        $http.get(serviceLink.url + 'SaltiePAS/api/explore/cruises?questions_liked='+liked+'&questions_disliked='+disliked+'&questions_neutral='+neutral+'&score=40').success(function(data) {
			
			deferred.resolve(data);
         }).error(function(data){
			deferred.resolve("error value");
		});
			return deferred.promise;
		}
		}

    return new curatorList();
})



