angular
  .module('authApp')
  .component('signup', {
    bindings: { $router: '<' },
    templateUrl: '/components/signup/signup.html',
    controller: SignupController
  });

function SignupController(extApiService, authApiService) {

  var ctrl = this;

  this.onImg = function(img){
    extApiService.purgeGallery();
    extApiService.addImgUrl(img).then(function(resp){
      console.log(resp);
      authApiService.createUser({id: resp});
    })
  }
};
