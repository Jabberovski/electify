'use strict';
var angular = require('angular');
var angularRoute = require('angular-route');
var Election = require('./core/election');
var writeFile = require('./core/writeFile');

// Temp
// let fs = require('fs');
//
// var writeFile = function(data) {
//     var path = ("votes/" + Date.now().toString())
//     fs.writeFile(path, data, 'utf8', function() {
//         console.log("Stored.")
//     })
// }


var app = angular.module("electify",
[
    'ngRoute',
    'electify.launchScreen',
    'electify.settingsScreen',
    'electify.voteScreen',
    'electify.configScreen',
    'electify.finalScreen',
    'electify.resultScreen'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            title: "Home",
            templateUrl: "./launchScreen/index.html",
            controller: "launchScreenController"
        })
        .when('/launch', {
            title: "Home",
            templateUrl: "./launchScreen/index.html",
            controller: "launchScreenController"
        })
        .when('/settings', {
            title: "Settings",
            templateUrl: "./settingsScreen/index.html",
            controller: "settingsScreenController"
        })
        .when('/config', {
            title: "Configuration",
            templateUrl: "./configScreen/index.html",
            controller: "configScreenController"
        })
        .when('/vote', {
            title: "Vote",
            templateUrl: "./voteScreen/index.html",
            controller: "voteScreenController"
        })
        .when('/final', {
            title: "Final Screen",
            templateUrl: "./finalScreen/index.html",
            controller: "finalScreen"
        })
        .when('/result', {
            title: "Results",
            templateUrl: "./resultScreen/index.html",
            controller: "resultScreenController"
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

app.service('navService', function($location) {
    this.launchScreen = function() {
        $location.path("launch");
    };
    this.voteScreen = function() {
        $location.path("vote");
    };
    this.configScreen = function() {
        $location.path("config");
    };
    this.resultScreen = function() {
        $location.path("result");
    }
    this.settings = function() {
        $location.path("settings");
    };
})

app.factory('electionProvider', function() {
    var election = new Election();
    var dataDirectory = "test-data/";
    var vote = function(vote) {
        var newVote = [];
        for (let choice of vote) {
            newVote.push({
                time: choice.time,
                post: choice.post.name,
                candidate: choice.candidate.name
            });
        }
        writeFile.writeFile(dataDirectory + 'votes/', angular.toJson(newVote));
    };
    (function() {
        writeFile.createFolder(dataDirectory + 'votes/');
    })();
    var temporaryReadVotes = function() {
        var voteResult = {
            posts: {}
        };
        var voteArray = writeFile.readAllFilesInFolder(dataDirectory+ "votes/")
        // console.log(voteArray);
        var voterCount = 0;
        voteArray.forEach(function(choice) {
            voterCount++;
            choice.forEach(function(vote) {
                if(!voteResult.posts[vote.post]) voteResult.posts[vote.post] = {name:vote.post, candidates: {}};
                if(!voteResult.posts[vote.post].candidates[vote.candidate]) voteResult.posts[vote.post].candidates[vote.candidate] = {name: vote.candidate, count: 0};
                voteResult.posts[vote.post].candidates[vote.candidate].count +=1;
            });
        });
        voteResult.voterCount = voterCount;
        return voteResult;
    };
    return {election: election, electionClass: Election, vote: vote, temporaryReadVotes: temporaryReadVotes};
})

app.controller('homeController', function($scope, navService, electionProvider) {
    $scope.$on('$locationChangeStart', function(event) {

    });
    $scope.initialize = function() {
        Mousetrap.bind('ctrl+1', function() {
            // $location.path("launch");
            $scope.navService.launchScreen();
        });
    };
    $scope.navService = navService;
});
