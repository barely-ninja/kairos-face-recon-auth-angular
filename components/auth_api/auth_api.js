angular
  .module('authApi', ['firebase'])
  .service('authApiService', ['$q', '$http', '$firebaseObject', authApiService]);

function authApiService($q, $http, $firebaseObject){
  var baseURL = 'https://boiling-fire-2915.firebaseio.com/';
  var ref = new Firebase(baseURL);
  auth = this;
  this.id = undefined;

  this.createUser = function(user){
    var deferred = $q.defer();
    ref.createUser({
      email: user.id.substr(0, 16)+'@testdomain.com',
      password: user.id.substr(16, 16)
    }, function(error, userData) {
      if (error) deferred.reject(error);
      else deferred.resolve(userData.uid);
    });
    return deferred.promise;
  };

  this.authUser = function(user){
    var deferred = $q.defer();
    ref.authWithPassword({
      email: user.id.substr(0, 16)+'@testdomain.com',
      password: user.id.substr(16, 16)
    }, function(error, data) {
      if (error === null) {
        auth.id = data.uid;
        deferred.resolve(data);
      } else {
        deferred.reject(error);
      }
    });
    return deferred.promise;
  };

  this.logout = function(){
    this.id = undefined;
    ref.unauth();
  };

}
