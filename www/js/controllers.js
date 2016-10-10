angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state , $firebaseArray, CONFIG, $document) {
     firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $document[0].getElementById("photo_user").src = localStorage.getItem("photo");
        $document[0].getElementById("displayName").innerHTML = localStorage.getItem("displayName");
      } else {
        // No user is signed in.
        // $state.go("login");
      }
    });
    $scope.doLogout = function() {
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          //console.log("Logout successful");
          // $state.go("login");
          $scope.modal.show();
          $scope.islogin = true;
           $scope.islogout = false;
        }, function(error) {
          // An error happened.
          console.log(error);
        });
      } // end dologout()

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.islogin = true;
  $scope.islogout = false;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.doLogin = function(userLogin) {
        if ($document[0].getElementById("user_name").value != "" && $document[0].getElementById("user_pass").value != "") {
          firebase.auth().signInWithEmailAndPassword(userLogin.username, userLogin.password).then(function() {
            // Sign-In successful.
            //console.log("Login successful");
            var user = firebase.auth().currentUser;
            var name, email, photoUrl, uid;
            if (user.emailVerified) { //check for verification email confirmed by user from the inbox
              console.log("email verified");
              $state.go("app.dashboard");
              name = user.displayName;
              email = user.email;
              photoUrl = user.photoURL;
              uid = user.uid;
                $scope.islogin = false;
  $scope.islogout = true;
              //console.log(name + "<>" + email + "<>" +  photoUrl + "<>" +  uid);
              localStorage.setItem("photo", photoUrl);
              localStorage.setItem("displayName", name);
            } else {
              alert("Email not verified, please check your inbox or spam messages")
              return false;
            } // end check verification email
          }, function(error) {
            // An error happened.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            if (errorCode === 'auth/invalid-email') {
              alert('Enter a valid email.');
              return false;
            } else if (errorCode === 'auth/wrong-password') {
              alert('Incorrect password.');
              return false;
            } else if (errorCode === 'auth/argument-error') {
              alert('Password must be string.');
              return false;
            } else if (errorCode === 'auth/user-not-found') {
              alert('No such user found.');
              return false;
            } else if (errorCode === 'auth/too-many-requests') {
              alert('Too many failed login attempts, please try after sometime.');
              return false;
            } else if (errorCode === 'auth/network-request-failed') {
              alert('Request timed out, please try again.');
              return false;
            } else {
              alert(errorMessage);
              return false;
            }
          });
        } else {
          alert('Please enter email and password');
          return false;
        } //end check client username password
      }; // end $scope.doLogin()




  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
   $scope.modal.show();
  };
  // SendLog.isLogout();
  $scope.logout = function() {
  $scope.loginData = {};
  $scope.islogin = true;
  $scope.islogout = false;
  $scope.loginData.username = '';
  $scope.loginData.password = '';
  $scope.loginData.loginErr = '';

};
})


  // Perform the login action when the user submits the login form

  // $scope.doLogin = function() {
  //   if(($scope.loginData.username == "admin")&&($scope.loginData.password == "1234")){
  //           $scope.islogin = false;
  //           $scope.islogout = true;
  //           $scope.closeLogin();
  //         }else{
  //           $scope.loginData.loginErr = "Error pls check your username and password !!!!";
  //           $scope.closeLogin();
  //         }
  //   // Simulate a login delay. Remove this and replace with your login
  //   // code if using a login system
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };

// .controller('loginController', ['$scope', '$firebaseArray', 'CONFIG', '$document', '$state','SendLog',
//   function($scope, $firebaseArray, CONFIG, $document, $state, SendLog) {
//     // Perform the login action when the user submits the login form
//     $scope.doLogin = function(userLogin) {
//       if ($document[0].getElementById("user_name").value != "" && $document[0].getElementById("user_pass").value != "") {
//         firebase.auth().signInWithEmailAndPassword(userLogin.username, userLogin.password).then(function() {
//           // Sign-In successful.
//           //console.log("Login successful");
//           var user = firebase.auth().currentUser;
//           var name, email, photoUrl, uid;
//           if (user.emailVerified) { //check for verification email confirmed by user from the inbox
//             console.log("email verified");
//             $state.go("app.dashboard");
//             name = user.displayName;
//             email = user.email;
//             photoUrl = user.photoURL;
//             uid = user.uid;
//             // SendLog.isLogout();
//             SendLog.Sub();
//             //console.log(name + "<>" + email + "<>" +  photoUrl + "<>" +  uid);
//             localStorage.setItem("photo", photoUrl);
//             localStorage.setItem("displayName", name);
//           } else {
//             alert("Email not verified, please check your inbox or spam messages")
//             return false;
//           } // end check verification email
//         }, function(error) {
//           // An error happened.
//           var errorCode = error.code;
//           var errorMessage = error.message;
//           console.log(errorCode);
//           if (errorCode === 'auth/invalid-email') {
//             alert('Enter a valid email.');
//             return false;
//           } else if (errorCode === 'auth/wrong-password') {
//             alert('Incorrect password.');
//             return false;
//           } else if (errorCode === 'auth/argument-error') {
//             alert('Password must be string.');
//             return false;
//           } else if (errorCode === 'auth/user-not-found') {
//             alert('No such user found.');
//             return false;
//           } else if (errorCode === 'auth/too-many-requests') {
//             alert('Too many failed login attempts, please try after sometime.');
//             return false;
//           } else if (errorCode === 'auth/network-request-failed') {
//             alert('Request timed out, please try again.');
//             return false;
//           } else {
//             alert(errorMessage);
//             return false;
//           }
//         });
//       } else {
//         alert('Please enter email and password');
//         return false;
//       } //end check client username password
//     }; // end $scope.doLogin()

//   }



// ])

.controller('signupController', ['$scope', '$state', '$document', '$firebaseArray', 'CONFIG',
  function($scope, $state, $document, $firebaseArray, CONFIG) {
    $scope.doSignup = function(userSignup) {
      //console.log(userSignup);
      if ($document[0].getElementById("cuser_name").value != "" && $document[0].getElementById("cuser_pass").value != "") {
        firebase.auth().createUserWithEmailAndPassword(userSignup.cusername, userSignup.cpassword).then(function() {
          // Sign-In successful.
          //console.log("Signup successful");
          var user = firebase.auth().currentUser;
          user.sendEmailVerification().then(function(result) {
            console.log(result)
          }, function(error) {
            console.log(error)
          });
          user.updateProfile({
            displayName: userSignup.displayname,
            photoURL: userSignup.photoprofile
          }).then(function() {
            // Update successful.
            $state.go("app.browse");
          }, function(error) {
            // An error happened.
            console.log(error);
          });
        }, function(error) {
          // An error happened.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          if (errorCode === 'auth/weak-password') {
            alert('Password is weak, choose a strong password.');
            return false;
          } else if (errorCode === 'auth/email-already-in-use') {
            alert('Email you entered is already in use.');
            return false;
          }
        });
     
      } else {
        alert('Please enter email and password');
        return false;
      } //end check client username password
    }; // end $scope.doSignup()
  }
])

.controller('resetController', ['$scope', '$state', '$document', '$firebaseArray', 'CONFIG',
  function($scope, $state, $document, $firebaseArray, CONFIG) {

    $scope.doResetemail = function(userReset) {
      //console.log(userReset);
      if ($document[0].getElementById("ruser_name").value != "") {
        firebase.auth().sendPasswordResetEmail(userReset.rusername).then(function() {
          // Sign-In successful.
          //console.log("Reset email sent successful");
          $state.go('app.browse');
          // $state.href('templates/login.html');
        }, function(error) {
          // An error happened.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          if (errorCode === 'auth/user-not-found') {
            alert('No user found with provided email.');
            return false;
          } else if (errorCode === 'auth/invalid-email') {
            alert('Email you entered is not complete or invalid.');
            return false;
          }
        });
      } else {
        alert('Please enter registered email to send reset link');
        return false;
      } //end check client username password
    }; // end $scope.doSignup()
  }
])



.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

  $scope.$on('$ionicView.enter', function(){
    console.log('PlayListsView - enter');
  });

  $scope.$on('$ionicView.leave', function(){
     console.log('PlayListsView - leave');
  });

  $scope.$on('$ionicView.beforeEnter', function(){
     console.log('PlayListsView - beforeEnter');
  });

  $scope.$on('$ionicView.afterEnter', function(){
     console.log('PlayListsView - afterEnter');
  });

  $scope.$on('$ionicView.beforeLeave', function(){
     console.log('PlayListsView - beforeLeave');
  });

  $scope.$on('$ionicView.afterLeave', function(){
     console.log('PlayListsView - afterLeave');
  });

  $scope.$on('$ionicView.unloaded', function(){
     console.log('PlayListsView - unloaded');
  });
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(){
    console.log('DetailsView - enter');
  });

  $scope.$on('$ionicView.leave', function(){
     console.log('DetailsView - leave');
  });

  $scope.$on('$ionicView.beforeEnter', function(){
     console.log('DetailsView - beforeEnter');
  });

  $scope.$on('$ionicView.afterEnter', function(){
     console.log('DetailsView - afterEnter');
  });

  $scope.$on('$ionicView.beforeLeave', function(){
     console.log('DetailsView - beforeLeave');
  });

  $scope.$on('$ionicView.afterLeave', function(){
     console.log('DetailsView - afterLeave');
  });

  $scope.$on('$ionicView.unloaded', function(){
     console.log('DetailsView - unloaded');
  });
})

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('app.browse');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('ChatsCtrl', function($scope, Chats){
  Chats.getUsers().then(function(chats){
    $scope.chats = chats;
  });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  var index = $stateParams.index;
  $scope.chat = Chats.getUser(index);
  // $scope.chat = Chats.get($stateParams.chatId);
})

.controller('dashboardController', ['$scope', '$firebaseArray', 'CONFIG',
  function($scope, $firebaseArray, CONFIG) {
    // TODO: Show profile data
    $scope.user = firebase.auth().currentUser;
  }
])
