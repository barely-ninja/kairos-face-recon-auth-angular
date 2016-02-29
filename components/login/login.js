angular
  .module('authApp')
  .component('login', {
    bindings: { $router: '<' },
    templateUrl: '/components/login/login.html',
    controller: LoginController
  });

function LoginController(extApiService, authApiService) {
  var ctrl = this;

  this.onImg = function(img){
    extApiService.checkImgUrl(img)
      .then(function(user){
        authApiService.authUser(user);
      })
      .then(function(authData){
        console.log("Authenticated successfully with payload:", authData);
        ctrl.$router.navigate(['Profile', {id: authData.uid}]);
      })
      .catch(function(err){console.log(err.Message)});
  }


};
