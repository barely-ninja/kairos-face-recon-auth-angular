angular
  .module('authApp')
  .component('logout', {
    bindings: { $router: '<' },
    templateUrl: '/components/logout/logout.html',
    controller: LogoutController
  });

function LogoutController(authApiService) {
  authApiService.logout();
};
