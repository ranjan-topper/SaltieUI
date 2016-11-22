app.controller('shopAndBookPageCtrl', function($scope, $location, $http, $rootScope, $localStorage, $ionicPopup, sendUrlEmailService, termAndConditionService) {

    if (typeof analytics !== 'undefined') { analytics.trackView("Shop And Book Page Controller"); }

    $scope.engageUser = function() {
        // $rootScope.TempDetail=angular.copy($rootScope.detail);
        $location.path('/app/emailUsPage');
    }


    //terms and condition rest get api
    termAndConditionService.termAndCondition()
        .then(
            /* success function */
            function(data) {
                if (data.termsAccepted) {
                    $rootScope.termCondAccepted = true;
                } else {
                    $rootScope.termCondAccepted = false;
                }

            },
            function(error) {
                //If an error happened, handle it here
            })

    //$scope.is_showBookingPopup = false;
    $scope.bookOnline = function() {
        $scope.detail = angular.copy($rootScope.TempDetail);
        $scope.name = $localStorage.Name.split(" ")[0];
        if ($scope.detail == undefined || $scope.detail == "" || $scope.detail == null) {
            $scope.is_showBookingPopup = true;
        } else {
            if (!$rootScope.termCondAccepted) {
                $rootScope.clickedFromMenu = false;
                $scope.termAndCondition.show();
                $scope.is_showBookingPopup = false;
            } else {
                $scope.is_showBookingPopup = false;
                $location.path('/app/iframeBookingPage');
            }

        }
        //$location.path('/app/emailUs');
    }
    $scope.back = function() {
        // $rootScope.engageData = "";
        //        if($rootScope.TempDetail == "" || $rootScope.TempDetail == undefined){
        //            $location.path('app/list');
        //        }else{
        window.history.back();
        //        }
        console.log($rootScope.TempDetail);
    }
    $scope.goToList = function() {
        $scope.is_showBookingPopup = false;
        $location.path('/app/listingPage');
    }
    $scope.closePopup = function() {
        $scope.is_showBookingPopup = false;
    }

    $scope.urlBookWeb = $rootScope.pidVivaUrl;
    //validating the email value
    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    var email = $localStorage.userName;
    if (regexEmail.test(email)) {
        $scope.emailBook = $localStorage.userName;
    } else {
        $scope.emailBook = '';
    }

    $scope.bookOnlineWeb = function() {
        var emailBookingUrlPopup = $ionicPopup.show({
            templateUrl: './templates/popupPage/sendEmailUrlPopUp.html',
            scope: $scope
        });

        $scope.noThanks = function() {
            // window.open('https://www.vivavoyage.com/', '_blank', 'closebuttoncaption=back');
            emailBookingUrlPopup.close();
        }
        $scope.okSendUrl = function(form, emailBook) {
            if (form.$valid) {
                if ($rootScope.tripid == undefined) {
                    $rootScope.tripid = '';
                }
                if ($rootScope.TempDetail == '') {
                    $rootScope.pidVivaUrl = 'https://res.vivavoyage.com/';
                }

                sendUrlEmailService.sendUrlEmail(emailBook, $rootScope.pidVivaUrl, $rootScope.tripid)
                    .then(
                        /* success function */
                        function(status) {
                            if (status == 204) {
                                emailBookingUrlPopup.close();
                                $ionicPopup.show({
                                    title: 'Success',
                                    subTitle: 'Please Check your mail for website Url',
                                    buttons: [{
                                        text: 'Ok'
                                    }]
                                }).then(function(res) {

                                });
                            } else {

                            }
                        },
                        function(error) {
                            alert("There was a problem");
                            console.log(error);
                        });
            }
        }
    }
});