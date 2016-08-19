app.controller('filterController',function($scope, $location, $http, $rootScope, $filter, $localStorage, $ionicLoading, serviceLink, $ionicModal,themeFilter,$ionicPopup,advanceFilter,$ionicScrollDelegate,$timeout){
	/* ==========================================================================
  						declaring values
   ========================================================================== */
		$rootScope.orderBy="asc";
	$rootScope.month=[];
		$rootScope.month[0]=[{month:"Jan",value: false,number:1},{ month:"Feb",value: false,number:2}, {month:"Mar",value: false,number:3}, {month:"Apr",value: false,number:4}, {month:"May",value: false,number:5},{month:"Jun",value: false,number:6},{ month:"Jul",value: false,number:7},{ month:"Aug", value: false,number:8}, {month:"Sep",value: false,number:9}, {month:"Oct",value: false,number:10},{month:"Nov",value: false,number:11},{ month:"Dec",value: false,number:12}];
	
	 	$rootScope.month[1]=[{month:"Jan",value: false,number:1},{ month:"Feb",value: false,number:2}, {month:"Mar",value: false,number:3}, {month:"Apr",value: false,number:4}, {month:"May",value: false,number:5},{month:"Jun",value: false,number:6},{ month:"Jul",value: false,number:7},{ month:"Aug", value: false,number:8}, {month:"Sep",value: false,number:9}, {month:"Oct",value: false,number:10},{month:"Nov",value: false,number:11},{ month:"Dec",value: false,number:12}];
	
		$rootScope.month[2]=[{month:"Jan",value: false,number:1,id:"mon1"},{ month:"Feb",value: false,number:2,id:"mon2"}, {month:"Mar",value: false,number:3,id:"mon3"}, {month:"Apr",value: false,number:4,id:"mon4"}, {month:"May",value: false,number:5,id:"mon5"},{month:"Jun",value: false,number:6,id:"mon6"},{ month:"Jul",value: false,number:7,id:"mon7"},{ month:"Aug", value: false,number:8,id:"mon8"}, {month:"Sep",value: false,number:9,id:"mon9"}, {month:"Oct",value: false,number:10,id:"mon10"},{month:"Nov",value: false,number:11,id:"mon11"},{ month:"Dec",value: false,number:12,id:"mon12"}];
		$rootScope.yearColor="";
		$rootScope.selectedYear=[{year:"",value:[]},{year:"",value:[]},{year:"",value:[]}];
		$rootScope.year=[];
		$rootScope.year[0]=new Date().getFullYear();
		$rootScope.year[1]=new Date().getFullYear()+1;
		$rootScope.year[2]=new Date().getFullYear()+2;
	
	
	
	/* ==========================================================================
  						Experience Type Functionality
   ========================================================================== */

	$rootScope.lifestyle = function(style) 
		{
			if($rootScope.preStyle==style)
			{
					 $rootScope.filterShipPort.style = "All";	
				     $rootScope.preStyle="";
			}
			else
			{
				$rootScope.filterShipPort.style = style;
				$rootScope.preStyle=style;
			}
			
				$rootScope.filterShipPort.flag=0;
				$rootScope.filterLifstyle();
		}

        $rootScope.isLifestyleActive = function(style) {
            return $rootScope.filterShipPort.style == style;
        }
	
		 //disable lifesytle button 
		 $rootScope.disableLife=function(lifestyle)
		 {
			 for(i=0;i<$rootScope.shipPort.lifestyle.length;i++)
			 {
				 if($rootScope.shipPort.lifestyle[i] == lifestyle)
				 {
					 return false;
				 }
			 }
			 return true;
		 }
		 
	
	
	
	/* ==========================================================================
  						Duration Functionality
   ========================================================================== */
	
	$rootScope.duration=function(cruiseDur)
		{
			if($rootScope.preDuration==cruiseDur)
			{
				$rootScope.filterShipPort.duration=""
				$rootScope.preDuration="";
			}
			else{
			$rootScope.filterShipPort.duration = cruiseDur;
				$rootScope.preDuration=cruiseDur;
			}
			$rootScope.filterShipPort.flag=1;
			 $rootScope.filterLifstyle();
		}
		
		
		$rootScope.isDurationActive = function(cruiseDur) 
		{
            return $rootScope.filterShipPort.duration == cruiseDur;
        }
		 
		//disable duration button
		 	 $rootScope.disableDuration=function(duration)
		 {
			 for(i=0;i<$rootScope.shipPort.duration.length;i++)
			 {
				 if($rootScope.shipPort.duration[i] == duration)
				 {
					 return false;
				 }
			 }
			 return true;
		 }
			 
	
	/* ==========================================================================
  						CruiseLine Functionality
   	========================================================================== */
	$rootScope.filterCruiseLine=function()
		{
			var y=document.getElementById("cruiseLine");
			var cruiseLine = y.options[y.selectedIndex].value;
			$rootScope.filterShipPort.cruiseLine=cruiseLine;
			$rootScope.filterShipPort.flag=2;
			$rootScope.filterLifstyle();
		}
	/* ==========================================================================
  						SelectPort Functionality
   	========================================================================== */
		 
		 $rootScope.filterPortName=function()
		{
			var x=document.getElementById("portName");
			var port = x.options[x.selectedIndex].value;
			$rootScope.filterShipPort.ports=port;
			$rootScope.filterShipPort.flag=3;
			$rootScope.filterLifstyle();
		}

		
	/* ==========================================================================
  						SelectShip Functionality
   	========================================================================== */
		
		$rootScope.filterShipName=function()
		{
			var y=document.getElementById("shipName");
			var ship = y.options[y.selectedIndex].value;
			$rootScope.filterShipPort.ship=ship;
			$rootScope.filterShipPort.flag=4;
			$rootScope.filterLifstyle();
		}
	
	/* ==========================================================================
  						Month and Year Functionality
   	========================================================================== */
		$rootScope.disableCheck=function(number,year)
	{
		var d = new Date();
		var index1=0;
		if(year==d.getFullYear()+1)
			index1=1;
		if(year==d.getFullYear()+2)
			index1=2;
		
		if($rootScope.shipPort.month=="" || $rootScope.shipPort.month[year]=='' )
			return;
		else{
				if($rootScope.shipPort.year.indexOf(year.toString())>=0)
				{
					if($rootScope.shipPort.month[year].indexOf(parseInt(number)) < 0){
						$rootScope.month[index1][parseInt(number)-1].value=false;
						$rootScope.disableColor=true;
						return true;
					}
					else {
						
						$rootScope.disableColor=false;
						return false;
					}
				}
				else
				{
					$rootScope.month[index1][parseInt(number)-1].value=false;
					$rootScope.disableColor=true;
					return true;
				}
			}
	}
	
		$rootScope.commonMonthYear=function(monthArg){
			var monthArr='';
		 monthArg.forEach(function(month) {
				 

			 if (month.value) {
	      // If this is not the first item
        	if (monthArr) {
					monthArr += '-'
        	}
        	monthArr += month.number;
			 }
		 })
		 return monthArr;
	}
		
		
		//reset to previously selected month
	
$rootScope.resetDateMonth=function(months,index){
			if(months==null)
				return;
			for(j=0;j<12;j++){
					 $rootScope.month[index][j].value=false;
				}
             var str=months.split("-");
			if(str =='')
				return;
		   for(i=0;i<str.length;i++){
				 var a=str[i]-1;
				 $rootScope.month[index][a].value=true;
             }
         }


	$rootScope.monthSelect=function()
	{
			var yearArr='';
			var monthArr='';
			var month=$rootScope.commonMonthYear($rootScope.month[0]);
			if(month)
				yearArr=$rootScope.year[0];
			
			monthArr=month;
			 var month1=$rootScope.commonMonthYear($rootScope.month[1]);
			if(month1){
				if(yearArr){
					yearArr+="-";
					monthArr+="@";
				}
				monthArr+=month1;
				yearArr+=$rootScope.year[1];
				
			}
			 var month2=$rootScope.commonMonthYear($rootScope.month[2]);
			if(month2){
				if(yearArr){
					yearArr+="-";
					monthArr+="@";
				}
				monthArr+=month2;
				yearArr+=$rootScope.year[2];
			}
	
			$rootScope.filterShipPort.month=monthArr;
			$rootScope.filterShipPort.year=yearArr;
			$rootScope.filterLifstyle();
	}


		 $rootScope.isYearActive=function(year)
		 	{
			 return $rootScope.yearColor==year;
		 	}
		 $rootScope.nextClick=function(page)
			{
			$rootScope.myActiveSlide=page;
			}
		 $rootScope.perYear=function(year,index)
			{
			$rootScope.myActiveSlide=index;
			}
		 $rootScope.slideHasChanged=function(index)
		 {
			 $rootScope.myActiveSlide=index;
		 }
		 
		// set Color for month box 
		 	 
	 $rootScope.set_color=function(year,index)
	 {
		 if(index==0)
		 {
			  return {
                color: "#339fa6"
            }
		 }
		 else if(index==1)
		 {
			 return {
                color: "#9c867a"
            }
		 }
		 else if(index==2){
			 return {
                color: "#00232d"
            }
		 }
	 }
	 
	/* ==========================================================================
  						Apply Filter Functionality
   	========================================================================== */

	// function for clicking apply filter
		$rootScope.applyFilter=function()
		{
			$rootScope.applyFilterFlag=1; 
			  $rootScope.list = [];
			$rootScope.noMoreItemsAvailable=false;
			 $ionicScrollDelegate.scrollTop();
			
			var yearArr='';
			var monthArr='';
			var month=$rootScope.commonMonthYear($rootScope.month[0]);
			if(month)
				yearArr=$rootScope.year[0];
			
			monthArr=month;
			 var month1=$rootScope.commonMonthYear($rootScope.month[1]);
			if(month1){
				if(yearArr){
					yearArr+="-";
					monthArr+="@";
				}
				monthArr+=month1;
				yearArr+=$rootScope.year[1];
				
			}
			 var month2=$rootScope.commonMonthYear($rootScope.month[2]);
			if(month2){
				if(yearArr){
					yearArr+="-";
					monthArr+="@";
				}
				monthArr+=month2;
				yearArr+=$rootScope.year[2];
			}
	
			$rootScope.filterShipPort.month=monthArr;
			$rootScope.filterShipPort.year=yearArr;
			
			var po = document.getElementById("portName");
			var sh = document.getElementById("shipName");
			var cl = document.getElementById("cruiseLine");
			var cruiseline = cl.options[cl.selectedIndex].value;
			var port = po.options[po.selectedIndex].value;
			var ship = sh.options[sh.selectedIndex].value;
			$rootScope.filterShipPort.ship=ship;
			$rootScope.filterShipPort.ports=port;
			$rootScope.filterShipPort.cruiseLine=cruiseline;
			$rootScope.backArrow.expType=angular.copy($rootScope.filterShipPort.style);
            $rootScope.backArrow.duration=angular.copy($rootScope.filterShipPort.duration);
             $rootScope.backArrow.orderBy=angular.copy($rootScope.filterShipPort.orderby)
             $rootScope.shipPort1=angular.copy($rootScope.shipPort);
            $rootScope.backArrow.ship=sh.selectedIndex;
             $rootScope.backArrow.cruiseLine=cl.selectedIndex;
              $rootScope.backArrow.port=po.selectedIndex;
            $rootScope.backArrow.month1=angular.copy(month);
            $rootScope.backArrow.month2=angular.copy(month1);
            $rootScope.backArrow.month3=angular.copy(month2); 
			
			
				$rootScope.filterShipPort1=angular.copy($rootScope.filterShipPort); 			
		  $rootScope.list = [];	
		$rootScope.totalDisplayed=0;

				$rootScope.countCruise="";

				advanceFilter.filter($rootScope.filterShipPort1).then(
                        /* success function */
                        function(data) {
							$rootScope.countCruise=data.AllCount;
								if($rootScope.countCruise==0){
									$rootScope.count=0;
									// $rootScope.resetFilter();
											 $ionicPopup.show({
													title: 'For the selected month there is no cruise available',
													subTitle: 'Please try different months',
													buttons: [{
														text: 'Ok'
													}]
												}).then(function(res) {
													 });
												}
												else{
													$rootScope.filterModal.hide();
											$location.path('/app/list');
												}
                                $ionicLoading.hide();
                        },function(error) {
                alert("There was a problem");
                console.log(error);
            })
			}
	
	
		
	/* ==========================================================================
  						SortBY Functionality
   	========================================================================== */
		
		
		$rootScope.sortBy=function(orderBy)
		{
			$rootScope.filterShipPort.orderby=orderBy
			$rootScope.orderBy=orderBy;
		}
		 $rootScope.isSortByActive=function(orderBy)
		 {
			 return $rootScope.filterShipPort.orderby==orderBy;
		 }
		 
	/* ==========================================================================
  						Reset Functionality
   	========================================================================== */ 
		 
		 
		 $rootScope.resetFilterHome=function(){
			 $rootScope.clickFilterFlag=0;
			 $rootScope.preStyle="";
			 $rootScope.preDuration="";
			 $rootScope.filterShipPort={style:"All",duration:"",year:"",month:"",ports:"",ship:"",orderby:"asc",cruiseLine:"",flag:-1};
			 document.getElementById("portName").selectedIndex= 0;
			 document.getElementById("cruiseLine").selectedIndex= 0;
			 document.getElementById("shipName").selectedIndex= 0;
			 for(i=0;i<$rootScope.month.length;i++)
			 {
				 for(j=0;j<12;j++){
					 $rootScope.month[i][j].value=false;
				 }
				 
			 }
		
		 }
		 
		 $rootScope.resetFilter=function()
		 {
			 $rootScope.resetFilterHome();	
			 $rootScope.showFilter();
		 }
		
});