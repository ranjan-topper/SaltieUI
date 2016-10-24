app.controller('engageController', function($scope, $location, $http, $rootScope, $localStorage, $ionicPopup, sendUrlEmailService, termAndConditionService) {

    $scope.engageUser = function() {
        // $rootScope.TempDetail=angular.copy($rootScope.detail);
        $location.path('/app/emailUs');
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
                $location.path('/app/booking');
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
        $location.path('/app/list');
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
            template: `<div id="emailBookUrl">
                        <h1 class="light">Welcome to Saltie<br> 
                        It's a match! The perfect cruise is waiting for you<br> 
                        If you want the link for website sent to you…</h1>
                        <h2 class="roman">Please Enter Email-Id</h2>
                        <form name="emailBookForm" novalidate="">
                            <label style="padding:0px;" class="item item-input color3" ng-class="{ 'has-errors' : emailBookForm.email.$invalid && emailBookForm.$submitted, 'no-errors' : emailBookForm.email.$valid  && emailBookForm.$submitted}">
                                <input type="email" id="emBook" name="email" ng-keyup="resetEmail(emailBookForm)" placeholder="Email" style="padding: 0 0 0 15px;" ng-model="emailBook" required>
                            </label>
                            <div class="error-container" ng-show="emailBookForm.email.$error && emailBookForm.$submitted" ng-messages="emailBookForm.email.$error">
                                <div  ng-messages-include="templates/error-list.html"></div> 
                            </div>
                            <div class="popup-buttons" style="padding-right: 0px;padding-left: 0px;">
                                <button ng-click="noThanks()" class="button ng-binding button-default">
                                No Thanks
                                </button>
                                <button type="submit" ng-click="okSendUrl(emailBookForm,emailBook)" class="button ng-binding button-default">
                                Ok
                                </button>
                            </div>
                        </form>
                        </div>`,
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