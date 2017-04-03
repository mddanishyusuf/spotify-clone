angular.module('spotify',[])

.controller('mainCtrl',['$scope','$http',function($scope, $http){
	$scope.result_box = true
	var data = []
	$scope.get_result = function(value, type){
	$scope.result_box = true
		if(type && value){				
			$http.get('https://api.spotify.com/v1/search?q='+value+'&type='+type).success(function(response){
				// $scope.result = response.artists
				if(type == 'album'){
					$scope.total_item = response.albums.total
					$scope.next_url = response.albums.next
					angular.forEach(response.albums.items, function(value) {
			            data.push(value)
			        })
				}
				if(type == 'artist'){
					$scope.total_item = response.artists.total
					$scope.next_url = response.artists.next
					angular.forEach(response.artists.items, function(value) {
			            data.push(value)
			        })
				}
			}).finally(function(){
				$scope.result_box = false
			})
		}else{
			if(type == ''){
				alert('Please select checkbox')
			}else if(value == ''){
				alert('Please enter you search query')
			}else{
				alert('Please select checkbox and enter you search query')
			}
		}
	$scope.result = data
	}

	$scope.loadMore = function(next, type){
		console.log(next)
		$http.get(next).success(function(response){
			if(type == 'album'){
					$scope.total_item = response.albums.total
					$scope.next_url = response.albums.next
					angular.forEach(response.albums.items, function(value) {
			            data.push(value)
			        })
				}
				if(type == 'artist'){
					$scope.total_item = response.artists.total
					$scope.next_url = response.artists.next
					angular.forEach(response.artists.items, function(value) {
			            data.push(value)
			        })
				}
			}).finally(function(){
				$scope.result_box = false
			})
		$scope.result = data
	}
}])

.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
              //Also remove . and , so its gives a cleaner result.
              if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
                lastspace = lastspace - 1;
              }
              value = value.substr(0, lastspace);
            }
        }
        return value + (tail || ' …');
    };
})