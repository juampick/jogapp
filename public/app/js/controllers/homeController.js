angular
    .module('jogApp')
    .controller('HomeController', HomeController);

function HomeController($scope){
    $scope.title = 'Welcome';
    $scope.subtitle = 'track your jogging';
}