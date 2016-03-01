angular
  .module('authApp')
  .component('profile', {
    bindings: { $router: '<' },
    templateUrl: '/components/profile/profile.html',
    controller: ProfileController
  });

function ProfileController(authApiService) {
  this.$routerOnActivate = function(next) {
    // Get the hero identified by the route parameter
    //this.id = next.params.id;
    this.id = authApiService.id;
    if (!this.id) this.$router.navigate(['Login']);
    this.message = "Welcome, "+this.id;
  };
}
