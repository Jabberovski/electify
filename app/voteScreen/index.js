var angular = require('angular');
var voteScreen = angular.module("electify.voteScreen", ['ngRoute', 'electify']);

voteScreen.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/vote', {
        templateUrl: "./voteScreen/index.html",
        controller: "voteScreenController"
    })
}]);

voteScreen.controller("voteScreenController", function($scope, electionProvider) {
    var postIndex = function(post) {
        return $scope.election.posts.indexOf(post);
    };
    $scope.location = {
        active: function(post) {
            if($scope.showSubmitScreen) return false;
            return postIndex(post) == postIndex($scope.currentPost);
        },
        visited: function(post) {
            if($scope.showSubmitScreen) return true;
            return postIndex(post) < postIndex($scope.currentPost);
        },
        next: function(post) {
            if($scope.showSubmitScreen) return false;
            return postIndex(post) > postIndex($scope.currentPost);
        }
    };

    $scope.initialize = function() {
        $scope.loadElection();
        $scope.loadPost($scope.election.posts[0]);
        $scope.showFinalScreen = false;
        $scope.showSubmitScreen = false;
        $scope.currentVote = [];

        Mousetrap.bind('shift+r', function() {
            if($scope.showFinalScreen) return;
            $scope.reset();
            $scope.$digest();
        });
        Mousetrap.bind('shift+enter', function() {
            if(!$scope.showFinalScreen) return;
            $scope.reset();
            $scope.$digest();
        });

    };
    $scope.loadElection = function() {
        $scope.election = electionProvider.election;
    };
    $scope.loadPost = function(post) {
        $scope.currentPost = post;
    };

    $scope.pickCandidate = function(candidate) {
        // This selects a candidate
        console.log('Voting for', candidate);
        $scope.currentVote.push({
            time: Date.now(),
            post: $scope.currentPost,
            candidate: candidate
        });
        $scope.loadNext();
    };
    $scope.loadNext = function() {
        if((postIndex($scope.currentPost) + 1)==$scope.election.posts.length) {
            $scope.submitScreen();
        }
        else {
            $scope.loadPost($scope.election.posts[postIndex($scope.currentPost) + 1]);
        }
    };
    $scope.submit = function() {
        // This submits ALL selected candidates at once
        console.log($scope.currentVote);
        electionProvider.vote($scope.currentVote);
        $scope.finalScreen();
        // $scope.reset();
    };
    $scope.finalScreen = function() {
        $scope.showFinalScreen = true;
    }
    $scope.submitScreen = function() {
        $scope.showSubmitScreen = true;
        // $scope.submit();
    };
    $scope.reset = function() {
        $scope.initialize();
    };

    $scope.initialize();
});
