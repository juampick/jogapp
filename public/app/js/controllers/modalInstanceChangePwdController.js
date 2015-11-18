(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('ModalInstanceChangePwdController', ModalInstanceChangePwdController);

    ModalInstanceChangePwdController.$inject = ['$scope', '$uibModalInstance', 'title', 'authentication', 'toastr'];

    function ModalInstanceChangePwdController($scope, $uibModalInstance, title, authentication, toastr) {
        $scope.user = {};
        $scope.title = title;
        $scope.ok = function () {
            authentication.changePwd($scope.user)
                .then(function () {
                    $uibModalInstance.close();
                })
                .catch(function (error) {
                    toastr.error('There was an error processing. Please check again.')
                });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();