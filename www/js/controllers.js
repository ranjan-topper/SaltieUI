function iframeclick() {
//	console.log(document.getElementById("PASframe").contentWindow.document.body);
//	console.log();
//
//	console.log(document.getElementById("PASframe").contentWindow.document.querySelectorAll('_ngcontent-dse-3'));
    	var scope;
			console.log('hi');

    window.addEventListener('message',receiveMessage, false);
    
   function receiveMessage(evt)
    {
		console.log(evt.origin);
		scope = angular.element(document.getElementById("PASModal")).scope();
        console.log(evt.data);
        if (evt.data && evt.data != 'backArrow' && evt.data != 'Question' && evt.data != 'whoTravel' && evt.data != 'Answer')
            {
                 scope.$apply(function () {
                    
                    scope.closePASModal(evt.data);
                    });
            }
		
		else if (evt.data == 'backArrow')
		{
			scope.$apply(function () {
                    
				scope.pasBackbtShowFunc();
			});
		}
		else if (evt.data == 'Question')
		{
			scope.$apply(function () {
                    
				scope.pasBackbtShowFunc();
			});
		}
		else if (evt.data == 'whoTravel')
		{
			scope.$apply(function () {
                    
				scope.pasBackbtShowFunc();
			});
		}
		else if (evt.data == 'Answer')
		{
			scope.$apply(function () {
                    
				scope.pasBackbtShowFunc();
			});
		}
		else{
		}
    }
	
	
	
}


function filterPortName()
{
	var scope;
	if(angular.element(document.getElementById("lifestyle")).length > 0)
	{
	
	 scope = angular.element(document.getElementById("lifestyle")).scope();
	}else{
		scope = angular.element(document.getElementById("list")).scope();
	}
    scope.$apply(function () {
    scope.filterPortName();
    });
}
function filterCruiseLine()
{
	
var scope;
	if(angular.element(document.getElementById("lifestyle")).length > 0)
	{
	 scope = angular.element(document.getElementById("lifestyle")).scope();
	}else{
		scope = angular.element(document.getElementById("list")).scope();
	}    scope.$apply(function () {
    scope.filterCruiseLine();
    });
}



function filterShipName()
{
	
var scope;
	if(angular.element(document.getElementById("lifestyle")).length > 0)
	{
	
	 scope = angular.element(document.getElementById("lifestyle")).scope();
	}else{
		scope = angular.element(document.getElementById("list")).scope();
	}    scope.$apply(function () {
    scope.filterShipName();
    });
}
var app = angular.module('starter.controllers', []);


app.filter('capitalize', function() {
    return function(input, all) {
        return ( !! input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    }
});

app.filter('orderByCategory', function() {
    return function(obj) {
        var array = [];
        if (obj == null)
            return;
        Object.keys(obj).forEach(function(key) {

            if (key == "Interior")
                array[0] = key;
            else if (key == "Oceanview")
                array[1] = key;
            else if (key == "Balcony")
                array[2] = key;
            else if (key == "Suite")
                array[3] = key;
            else
                array[4] = key;

        });
		var filteredArray = [];
			angular.forEach(array,function(item) {
				if (item) filteredArray.push(item);
				});
			return filteredArray;
        //return array;
    }
});



app.filter('orderByCabin', function() {
    return function(obj) {
        var array = [];
        if (obj == null)
            return;
      obj.forEach(function(value) {

            if (value.roomType == "Interior")
                array[0] = value;
            else if (value.roomType == "Oceanview")
                array[1] = value;
            else if (value.roomType == "Balcony")
                array[2] = value;
            else if (value.roomType == "Suite")
                array[3] = value;
            else
                array[4] = value;

        });
		var filteredArray = [];
			angular.forEach(array,function(item) {
				if (item) filteredArray.push(item);
				});
			return filteredArray;
       // return array;
    }
});


//dollor filter for price
app.filter('dollorCheck', function() {

    return function(obj) {

        if (obj.match(/[a-zA-Z]/))
            return obj;
        else
            return "$" + obj
    }

});


function AvoidSpace(t){
  if(t.value.match(/\s/g)){
    t.value=t.value.replace(/\s/g,'');
  }
}

//
//app.directive('clickicon', function ($timeout) {
//    return {
//        restrict: 'EAC',
//        scope: true,
//        link: function (scope, element, attrs) {
//      console.log(element[0].querySelector('.tab-item .ion-ios-arrow-down'));
//			console.log(element);
//	
//    }
//}
//});

app.directive('clickicon', [
  '$document',
  function($document) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        var x = angular.element(document.querySelector('.ion-ios-arrow-down'));
        x.bind('click', function() {
          console.log('clicked');
        });
      }
    };
  }
]);