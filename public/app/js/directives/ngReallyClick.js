(function () {
    'use strict';

    angular
        .module('jogApp')
        .directive('ngReallyClick', ['$uibModal',
            function ($uibModal) {

                var ModalInstanceCtrl = function ($scope, $uibModalInstance) {
                    $scope.ok = function () {
                        $uibModalInstance.close();
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                };

                return {
                    restrict: 'A',
                    scope: {
                        ngReallyClick: "&",
                        item: "="
                    },
                    link: function (scope, element, attrs) {
                        element.bind('click', function () {
                            var message = attrs.ngReallyMessage || "Are you sure ?";

                            var modalHtml = '<div class="modal-body">' + message + '</div>';
                            modalHtml += '<div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div>';

                            var modalInstance = $uibModal.open({
                                template: modalHtml,
                                controller: ModalInstanceCtrl
                            });

                            modalInstance.result.then(function () {
                                scope.ngReallyClick({item: scope.item}); //raise an error : $digest already in progress
                            }, function () {
                                //Modal dismissed
                            });
                            //*/

                        });
                    }
                }
            }]);

})();

