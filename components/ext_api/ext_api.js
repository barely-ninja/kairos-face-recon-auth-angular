angular
  .module('extApi', [])
  .service('extApiService', ['$q', '$http', extApiService]);

function extApiService($q, $http){

  var baseURL = 'https://api.kairos.com';
  var headers = {
    app_id: 'aa4358cc',
    app_key: '8580c12eb0620c7a4c553f7f8225f1ee'
  }
  headers['Content-Type'] = 'application/json';

  var serv = this;

  this.getBestCandidate = function(arr){
    return arr.reduce( function(pr, cr){
      for(var prop in cr){
        if (prop !== 'enrollment_timestamp' && cr[prop] > 0.8 && cr[prop] > pr.prob){
          return {id: prop, prob: cr[prop]};
        }
      }
      return pr;
    },{id: '', prob: 0});
  }

  this.addImgUrl = function(imgUrl){
    var req = {
      method: 'POST',
      url: baseURL+'/enroll',
      headers: headers,
      data: {
        image: imgUrl.substring(22),
        subject_id: md5(imgUrl),
        gallery_name: 'test',
        minHeadScale: 0.25
      }
    }
    return $http(req).then(function(resp){
      if (resp.data.hasOwnProperty('Errors')) $q.reject(resp.data.Errors[0]);
      return(resp.data.images[0].transaction.subject_id)});
  }

  this.checkImgUrl = function(imgUrl){
    var req = {
      method: 'POST',
      url: baseURL+'/recognize',
      headers: headers,
      data: {
        image: imgUrl.substring(22),
        gallery_name: 'test',
        minHeadScale: 0.25
      }
    }
    return $http(req).then(function(resp){
      if (resp.data.hasOwnProperty('Errors')) return $q.reject(resp.data.Errors[0]);
      if (!resp.data.images[0].hasOwnProperty('candidates')) return $q.reject({Message: 'No match'});

      if (resp.data.images[0].candidates.length) return serv.getBestCandidate(resp.data.images[0].candidates);
    });
  }

  this.purgeGallery = function(){
    var req = {
      method: 'POST',
      url: baseURL+'/gallery/remove',
      headers: headers,
      data: {
        gallery_name: 'test'
      }
    }
    return $http(req);
  }

}
