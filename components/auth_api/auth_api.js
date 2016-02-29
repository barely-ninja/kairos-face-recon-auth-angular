angular
  .module('authApi', ['firebase'])
  .service('authApiService', ['$q', '$http', '$firebaseObject', authApiService]);

function authApiService($q, $http, $firebaseObject){
  var baseURL = 'https://boiling-fire-2915.firebaseio.com/';
  var ref = new Firebase(baseURL);

  this.createUser = function(user){
    ref.createUser({
      email: user.id.substr(0, 16)+'@testdomain.com',
      password: user.id.substr(16, 16)
    }, function(error, userData) {
      if (error) {
        switch (error.code) {
          case "EMAIL_TAKEN":
            console.log("The new user account cannot be created because the email is already in use.");
            break;
          case "INVALID_EMAIL":
            console.log("The specified email is not a valid email.");
            break;
          default:
            console.log("Error creating user:", error);
        }
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
  };

  this.authUser = function(user){
    return ref.authWithPassword({
      email: user.id.substr(0, 16)+'@testdomain.com',
      password: user.id.substr(16, 16)
    });
  };
}
