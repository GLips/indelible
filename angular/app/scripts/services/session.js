angular.module('indelibleApp.services').service('Session',[ '$cookieStore', 'UserSession', 'UserRegistration', function($cookieStore, UserSession, UserRegistration) {

  this.currentUser = $cookieStore.get('_indelible_session');
  this.signedIn = !!$cookieStore.get('_indelible_session');
  this.signedOut = !this.signedIn;
  this.userSession = new UserSession( { email: "", password: "", remember_me: true } );
  this.userRegistration = new UserRegistration( { email: "", password: "", password_confirmation: "" } );

}]);