var app = angular.module('projectile',['chart.js'])

app.controller('mainController',['$scope',function($scope) {
		
	$scope.xData = [];
	$scope.yData = [];
  $scope.series = ['Series A'];
  $scope.data = [
    [28, 48, 40, 19, 86, 27, 90]
  ];
	
	//Initial position
	$scope.x = 0;
	$scope.y = 0;

	//Time
	$scope.h = 0.001;
	
    //X Inteval
    $scope.interval = 0.5;

	//Mess
	$scope.m = 10;

	//initial speed
	$scope.v = 10;
	$scope.angle = 45;
	
	//Air resistance
	$scope.drag = false;
	$scope.a = 0.1;
	
	$scope.dragForce = function(a,v)
		{
		var c = 0.47; //smooth sphere
		var rho = 351.88; //35C 1 ATM
		
		if($scope.drag)
			{
			//console.log("c,rho,a,v= "+c+","+rho+","+a+","+v+" => "+c*rho*a*v*v/2);
			return -c*rho*a*v*v/2;
			}
		else
			{
			return 0;
			}
		}
	
	//Force function
	$scope.Fx = function(m, x, y, vx, vy, a)
		{
		return $scope.dragForce(a,vx);
		}
	$scope.Fy = function(m, x, y, vx, vy, a)
		{
		var g = 9.8;
		return -m*g + $scope.dragForce(a,vy);
		}

	//Calculation
	$scope.calculate = function(m,x,y,v,angle,h,interval,a)
		{
		var xData = [0];
		var yData = [0];
		var i = 0;
        var nextX = interval;
		
		var radient = angle*Math.PI/180;
		var vx = v*Math.cos(radient);
		var vy = v*Math.sin(radient);
		
		console.log("Vx= "+vx+" Vy= "+vy);
		console.log("Drag force: "+$scope.drag+" a = "+a);
		
		while(y >= 0) 
			{
			x = x + vx*h + 0.5*($scope.Fx(m, x, y, vx, vy, a)/m)*h*h;
			y = y + vy*h + 0.5*($scope.Fy(m, x, y, vx, vy, a)/m)*h*h;
			vx = vx + ($scope.Fx(m, x, y, vx, vy, a)/m)*h;
			vy = vy + ($scope.Fy(m, x, y, vx, vy, a)/m)*h;

			if(x.toFixed(2) >= nextX)
				{
				//console.log(x+' '+y);
				yData.push(parseFloat(y.toFixed(2)));
				xData.push(x.toFixed(2));
                
                nextX += interval;
				}

			i++;
			}
		
		$scope.xData = xData;
		$scope.yData = [yData];
		console.log($scope.xData);
		console.log($scope.yData);
		}
	$scope.calculate($scope.m,$scope.x,$scope.y,$scope.v,$scope.angle,$scope.h,$scope.interval,$scope.a);
	
}]);