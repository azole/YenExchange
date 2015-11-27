
var exchangeApp = angular.module('exchangeApp', []);

exchangeApp.controller('calcCtrl', ['$scope', function ($scope) {
  
  var permanentStorage = window.localStorage;

  $scope.defaultRate = 0.2652;
  $scope.fromCurrency = 'JPY';
  $scope.toCurrency = 'TWD';
  $scope.fromSign = '¥';
  $scope.toSign = 'NT';
  $scope.rate = parseFloat(permanentStorage.getItem('rate'),10) || $scope.defaultRate;
  $scope.from = 0;
  $scope.taxRate = 0.08;
  $scope.op = '';
  $scope.div = 0;

  $scope.reset = function(){
    $scope.from = 0;
    $scope.op = '';
    $scope.div = 0;
  };

  $scope.delete = function(){
    $scope.from = Math.floor($scope.from/10);
  };

  $scope.addNum = function(n){
    if($scope.op == '*' || $scope.op == '/') {
      $scope.div = $scope.div * 10 + n;
    } else {
      $scope.from = $scope.from * 10 + n;
    }
  };

  $scope.setRate = function(){
    permanentStorage.setItem('rate', $scope.rate);
  };

  $scope.setDefault = function(){
    $scope.rate = $scope.defaultRate;
    $scipe.setRate();
    $scope.op = '';
    $scope.div = 0;
  };

  $scope.advNum = function(op) {
    $scope.op = op;
  };

  $scope.calculate = function(){
    if($scope.op === '*') {
      $scope.from = $scope.from * $scope.div;
    } else if($scope.op === '/') {
      $scope.from = $scope.from / $scope.div;  
    }
    $scope.op = '';
    $scope.div = 0;
  };
}]);

exchangeApp.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);