angular
  .module('authApp')
  .component('profile', {
    bindings: { $router: '<' },
    templateUrl: '/components/profile/profile.html',
    controller: ProfileController,
    $routerCanActivate = function(){return false}
  });

function ProfileComponent() {
  var $ctrl = this;

  this.$routerOnActivate = function(next) {
    // Get the hero identified by the route parameter
    var $ctrl.id = next.params.id;
  };
