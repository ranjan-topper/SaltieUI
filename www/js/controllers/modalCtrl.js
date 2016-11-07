app.controller('modalCtrl', function($scope, $anchorScroll, $location, $http, $rootScope, $ionicScrollDelegate, $localStorage, $ionicLoading, serviceLink, $ionicPopup, loginService, $ionicModal, $ionicSlideBoxDelegate, $timeout, profileSet, profileGet, $sce, $filter, termAndConditionSetService) {

    $rootScope.linkUrl = serviceLink.url;
    $scope.readyBookDisable = false;
    $rootScope.clickedFromMenu = true;


    /* ==========================================================================
    						All Modal declaration
     	========================================================================== */
    $ionicModal.fromTemplateUrl('templates/aboutModal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.aboutModal = modal;
    })

    $ionicModal.fromTemplateUrl('templates/profileSettingModal.html', {
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
        $scope.termAndCondition = modal;
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



    $ionicModal.fromTemplateUrl('templates/cabinSlideModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    })

    $ionicModal.fromTemplateUrl('templates/discountModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.discountModal = modal;
    })

    $ionicModal.fromTemplateUrl('templates/activityVideoModal.html', {
        scope: $scope,
        hardwareBackButtonClose: false
    }).then(function(modal) {
        $scope.showVideo = modal;
    })

    $ionicModal.fromTemplateUrl('templates/shipActivityModal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal2 = modal;
    });

    $ionicModal.fromTemplateUrl('templates/privacyPolicyModal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.privacyPolicyModal = modal;
    });
    /* ==========================================================================
    						Close LoginSignUp modal
     	========================================================================== */
    $rootScope.closeLoginSign = function() {
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
    $scope.video = function() {
        $rootScope.videoURL = $rootScope.detail.tripDetails.ship.videoUrl + '?autoplay=1&rel=0';
        $scope.showVideo.show();
    }

    $scope.closeVidio = function() {
        $scope.showVideo.remove();
        $ionicModal.fromTemplateUrl('templates/activityVideoModal.html', {
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
        }, 500);


        //			$timeout(function() {
        //								console.log(index);
        //								$ionicSlideBoxDelegate.$getByHandle('activity').update();
        //								$ionicSlideBoxDelegate.$getByHandle('detailSlide').stop();
        //    		$ionicSlideBoxDelegate.$getByHandle('activity').slide(index);
        //
        //			},   100);
    }

    $scope.closeModal = function() {
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

        if ($scope.price == "Sold Out") {
            $scope.readyBookDisable = true;
        }
        $scope.modal.show();
        $timeout(function() {
            console.log(index);
            $ionicSlideBoxDelegate.$getByHandle('cabinType').update();
            $ionicSlideBoxDelegate.$getByHandle('cabinType').slide(index);
        }, 300);
    };

    $scope.setPrice = function(prices, index, date) {
        if (index == 0) {
            $rootScope.pID = prices.pid;
            $rootScope.sailID = prices.sailingId.substring(4);
            $rootScope.priceList = prices.category;
            if ($rootScope.pID == 'NA') {
                $rootScope.pidVivaUrl = 'https://res.vivavoyage.com/Web/cruises/details.aspx?pid=874684';
            } else {
                $rootScope.pidVivaUrl = 'https://res.vivavoyage.com/Web/cruises/details.aspx?pid=' + $rootScope.pID;
            }
            $rootScope.date = date;
        }
    };



    $scope.cabinTypeClose = function() {
        $scope.modal.hide();
        $scope.readyBookDisable = false;
    }


    $scope.cabinSlideChanged = function(index) {
        $scope.readyBookDisable = false;
        var sample = $filter('orderByCategory')($rootScope.priceList);
        $scope.category = sample[index];
        $scope.price = $rootScope.priceList[$scope.category][0];
        if ($scope.price == "Sold Out") {
            $scope.readyBookDisable = true;
        }
    }

    /* ==========================================================================
    						about Modal functionality
     	========================================================================== */

    $scope.aboutClick = function() {
        $scope.aboutModal.show();
    }


    /* ==========================================================================
    						Phone and Faq Modal functionality
     	========================================================================== */
    $scope.phoneClick = function() {
        $scope.phoneModal.show();
    }

    $scope.faqClick = function() {
        $scope.faqModal.show();
    }
    $scope.scrollMe = function(anchor) {
        $location.hash(anchor);
        var handle = $ionicScrollDelegate.$getByHandle('content');
        console.log(anchor);

        handle.anchorScroll();
    };
    $scope.closeFAQ = function() {
        $scope.faqModal.remove();
        $ionicModal.fromTemplateUrl('templates/faqModal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.faqModal = modal;
        })
    }

    /* ==========================================================================
    						Privacy Policy Modal functionality
     	========================================================================== */
    $scope.privacyPolicyClick = function() {
        $scope.privacyPolicyModal.show();
    }
    $scope.closePrivacyPolicy = function() {
        $scope.privacyPolicyModal.remove();
        $ionicModal.fromTemplateUrl('templates/privacyPolicyModal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.privacyPolicyModal = modal;
        });
    }

    /* ==========================================================================
    						Term Modal functionality
     	========================================================================== */
    $scope.termClick = function() {
        $rootScope.clickedFromMenu = true;
        $scope.termAndCondition.show();
    }

    /* ==========================================================================
    						ProfileSetting Modal functionality
     	========================================================================== */
    $scope.profileSetting = function() {
        $scope.buttonName = "Change Password";
        $scope.changePasshide = true;
        $scope.passwordValidity = 0;
        profileGet.profile()
            .then(
                /* success function */
                function(data) {
                    $scope.user = data;
                },
                function(error) {
                    //If an error happened, handle it here
                })

        $scope.profileSet.show();
    }


    $scope.closeProfile = function() {
        $scope.profileSet.remove();
        $ionicModal.fromTemplateUrl('templates/profileSettingModal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.profileSet = modal;
        })

    }

    $scope.editProfile = function(form, user) {

        if (user.newPassword != user.passwordc) {
            form.passwordc.$setValidity("dontMatch", false);
        }
        if ($scope.passwordValidity == 0) {
            form.password.$setValidity("password", true);
            form.passwordc.$setValidity("dontMatch", true);
            form.newPassword.$setValidity("required", true);
            form.passwordc.$setValidity("required", true);
        }
        if (form.$valid) //checking form valid or not
        {

            if (user.newPassword == '' || user.newPassword == undefined) {
                user.newPassword = "";
            }
            var data = "userName=" + $localStorage.userName + "&firstName=" + user.firstName + "&lastName=" + user.lastName + "&oldPassword=" + user.oldPassword + "&newPassword=" + user.newPassword;
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
                            }).then(function(res) {});
                            $localStorage.Name = user.firstName;
                            $scope.closeProfile();
                        } else {
                            profileSet.errors(form, $scope.status);
                        }

                    },
                    function(error) {
                        //If an error happened, handle it here
                    })
        }
    }

    $scope.showPassfield = function(form, user) {
        if ($scope.passwordValidity == 0) {
            $scope.buttonName = "Back";
            $scope.changePasshide = false;
            form.newPassword.$setValidity("required", false);
            form.passwordc.$setValidity("required", false);
            form.$setPristine();
            $scope.passwordValidity = 1;
        } else {
            $scope.changePasshide = true;
            $scope.buttonName = "Change Password";
            $scope.passwordValidity = 0;
            user.newPassword = "";
            user.passwordc = "";
        }
    }



    /* ==========================================================================
    						Discount Modal functionality
     	========================================================================== */
    $scope.discountChanged = function(index) {
        $rootScope.slideIndex = index;
    }

    $scope.previous = function() {
        $ionicSlideBoxDelegate.$getByHandle('discountType').previous();
    };


    $scope.discountModalRemove = function() {

        $scope.discountModal.remove();
        $ionicModal.fromTemplateUrl('templates/discountModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.discountModal = modal;
        })

    }

    /* ==========================================================================
        						Terms and condition Modal functionality
         	========================================================================== */

    $scope.termCondAccept = function() {
        //terms and condition rest set api
        termAndConditionSetService.termAndConditionSet()
            .then(
                /* success function */
                function(status) {
                    if (status == 200) {
                        $rootScope.termCondAccepted = true;
                        $location.path('/app/iframeBookingPage');
                        $scope.termAndCondition.remove();
                        $ionicModal.fromTemplateUrl('templates/termModal.html', {
                            scope: $scope
                        }).then(function(modal) {
                            $scope.termAndCondition = modal;
                        })
                    } else {
                        $rootScope.termCondAccepted = false;
                    }

                },
                function(error) {
                    //If an error happened, handle it here
                })
    }
    $scope.termCondDecline = function() {
        $scope.termAndCondition.remove();
        $rootScope.clickedFromMenu = true;
        $ionicModal.fromTemplateUrl('templates/termModal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.termAndCondition = modal;
        })
        $location.path('/app/shopAndBookPage');
    }
});