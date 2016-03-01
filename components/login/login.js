angular
  .module('authApp')
  .component('login', {
    bindings: { $router: '<' },
    templateUrl: '/components/login/login.html',
    controller: LoginController
  });

function LoginController(extApiService, authApiService) {
  var ctrl = this;
  this.message = "Login by taking new picture";
  this.onImg = function(img){

    extApiService.checkImgUrl(img)
      .then(function(user){
        return authApiService.authUser(user);
      })
      .then(function(authData){
        console.log("Authenticated successfully with payload:", authData);
        ctrl.$router.navigate(['Profile', {id: authData.uid}]);
      })
      .catch(function(err){
        console.log(err.Message);
        ctrl.message = err.Message+", please try again";
      });
  }
};
