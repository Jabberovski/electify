const {dialog} = require('electron').remote;
var angular = require('angular');

var configScreen = angular.module("electify.configScreen", ['ngRoute', 'electify']);

//temp
// var Data = require('file:///./../../test-data/candidates.json');

configScreen.controller("configScreenController", function($scope, navService, electionProvider) {
    navService.launchScreen();
    $scope.showDialog = function() {
        var options = {
            title: "Select a config file.",
            filters: [
                {name: 'JSON file', extensions: ['json']}
            ],
            openDirectory: false,
            multiSelections: false
        }
        dialog.showOpenDialog(undefined, options, function(filepaths) {
            var Data = require(filepaths[0]);
            console.log(Data);
            console.log("asdf")
            electionProvider.election = electionProvider.electionClass.deserialize(Data.election);
            $scope.election = electionProvider.election;
            navService.launchScreen();
        });
    };
});
