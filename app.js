angular
  .module('authApp', ['ngComponentRouter', 'capture', 'extApi', 'authApi'])
  .config( function($locationProvider){
    $locationProvider.html5Mode(true);
  })
  .value('$routerRootComponent', 'app')
  .component('app', {
    templateUrl: 'app.html',
    $routeConfig: [
      {path: '/login',        name: 'Login',        component: 'login',         useAsDefault: true},
      {path: '/signup',       name: 'Signup',       component: 'signup'},
      {path: '/logout',       name: 'Logout',       component: 'logout'},
      {path: '/profile/:id',  name: 'Profile',      component: 'profile'}
    ]
  })
