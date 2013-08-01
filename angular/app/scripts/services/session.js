angular.module('indelibleApp.services').service('Session',[ '$cookieStore', 'UserSession', 'UserRegistration', function($cookieStore, UserSession, UserRegistration) {

  this.currentUser = $cookieStore.get('_indelible_session');
  this.loggedIn = !!$cookieStore.get('_indelible_session');
  this.loggedOut = !this.loggedIn;
  this.userSession = new UserSession( { email: "", password: "", remember_me: true } );
  this.userRegistration = new UserRegistration( { email: "", password: "", password_confirmation: "" } );

}]);