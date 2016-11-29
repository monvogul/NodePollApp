
var app = angular.module("app", []);
app.controller("myctrl", function($scope,socket) {
    $scope.users = [];
    $scope.nameset = false;
    $scope.username= "" ;
    $scope.errors = {"USER_IN_USE": "Username in use"} ;
    $scope.error = null;
    $scope.comments = [] ;

    socket.on('getStatsAtStart',function(data){
        $scope.users= data.slice(0) ;
    })

    socket.on('getAllComments',function(data){
        $scope.comments = data.slice(0) ;
    })

    $scope.setUserName = function() {
        if($scope.users && $scope.users.indexOf($scope.username) === -1) {
            $scope.nameset = true;
            socket.emit('userAdd', $scope.username);
            $scope.error = null ;
        }else{
            $scope.error = $scope.errors.USER_IN_USE ;
        }
    }

    socket.on('userCountChanged',function(data){
        $scope.users= data.slice(0) ;
    })

});


app.factory('socket', function($rootScope) {
    var socket = io.connect();

    return {
        on: function (eventName, func) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    func.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, func) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (func) {
                        func.apply(socket, args);
                    }
                });
            })
        }
    };
});
