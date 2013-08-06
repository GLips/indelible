angular.module('indelibleApp.services').service('Session',[ '$cookieStore', 'UserSession', 'UserRegistration', function($cookieStore, UserSession, UserRegistration) {

  this.currentUser = $cookieStore.get('_indelible_session');
  this.loggedIn = !!$cookieStore.get('_indelible_session');
  this.loggedOut = !this.loggedIn;
  this.userSession = new UserSession( { email: "", password: "", remember_me: true } );
  this.userRegistration = new UserRegistration( { email: "", password: "", password_confirmation: "" } );

  this.logout = function() {
    this.currentUser = null;
    this.loggedIn = false;
    this.loggedOut = !this.loggedIn;
    this.userSession = new UserSession( { email: "", password: "", remember_me: true } );
  }

  this.login = function(user) {
    this.currentUser = user;
    this.loggedIn = true;
    this.loggedOut = !this.loggedIn;
    $cookieStore.put('_indelible_session', user);
  }

  this.getEmail = function() {
    if(this.loggedIn) { return this.currentUser.email; }
  }

  this.isLoggedIn = function() {
    return this.loggedIn;
  }

}]);