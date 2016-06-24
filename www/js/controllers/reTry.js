app.controller('RetryController', function($rootScope) {
  $rootScope.retry = function() {
    $rootScope.retry.hide();
  };
  $rootScope.cancel = function() {
    $rootScope.retry.remove();
  };
});