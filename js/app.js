var app = angular.module('myApp', []);
app.controller('playersLadder', function ($scope, $http) {
    $http.get("../data/players.json")
        .success(function (response) {$scope.ladder = response.players; });
});
app.controller('cardList', function ($scope, $http) {
    $http.get("../data/cards.json")
        .success(function (response) {$scope.cards = response.collection; });
});