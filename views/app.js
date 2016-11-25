
var app = angular.module("test", []);
app.controller("myctrl", function($scope,socket) {
    $scope.users = [];
    $scope.nameset = false;
    $scope.username= "" ;


    socket.on('getStatsAtStart',function(data){
        $scope.users= data.slice(0) ;
    })

    $scope.setUserName = function() {
        $scope.nameset = true;
        socket.emit('userAdd', $scope.username);
    }

    socket.on('userCountChanged',function(data){
        $scope.users= data.slice(0) ;
    })

});


app.factory('socket', function($rootScope) {
    var socket = io.connect();
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});
