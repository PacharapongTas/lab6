angular.module('yenlover.service', [])

.factory('SendLog',function(){
var login = true;
var logout = false;

	return {
    Sub : function(){
    	return login = false;
    	return logout = true;
    },
    isLogout: function(){
      return logout;
    },
  isLogin : function(){
    	 return login;
    }
  }
})