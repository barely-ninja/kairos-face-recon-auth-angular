angular
  .module('authApp')
  .component('signup', {
    bindings: { $router: '<' },
    templateUrl: '/components/signup/signup.html',
    controller: SignupController
  });

function SignupController(extApiService, authApiService) {

  var ctrl = this;
  this.message = "Sign up by taking new picture";
  this.onImg = function(img){
    extApiService.purgeGallery()
      .then(function(){
        return extApiService.addImgUrl(img);
      })
      .then(function(resp){
        console.log(resp);
        return authApiService.createUser({id: resp});
      })
      .then(function(){
        ctrl.$router.navigate(['Login']);
      })
      .catch(function(){
        ctrl.message = "Error occured, please try again"
      })
  }
};
