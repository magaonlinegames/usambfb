
    var user_account;
    var menu_justice,menu_checker = 'nomenu';
    var menuChecker ;
    var verificationcode ;

$(document).ready(function(){
    $('#login_loader_bx').hide();
    $('#XXBTMCONTROL').addClass('hide');
        var firebaseConfig77 = {
          apiKey: "AIzaSyBOKZ_0oPvvbkINz_CdDeo70xlhagw0Csc",
          authDomain: "command-center-18c31.firebaseapp.com",
          projectId: "command-center-18c31",
          storageBucket: "command-center-18c31.appspot.com",
          messagingSenderId: "532092672696",
          appId: "1:532092672696:web:4cb03667b3c03e11b3724d"
      };

      var firebaseConfig = {
      apiKey: "AIzaSyDs1iHCLo3aMYqTqkt_fMNmrvVY0o43UKU",
      authDomain: "bankgame-9e3da.firebaseapp.com",
      databaseURL: "https://bankgame-9e3da.firebaseio.com",
      projectId: "bankgame-9e3da",
      storageBucket: "bankgame-9e3da.appspot.com",
      messagingSenderId: "550149232838",
      appId: "1:550149232838:web:4b4564d2115703ea181fc7"
    };
      
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      db = firebase.firestore();

      $('.distract .transfer-info-txt').text('');


      bank_login_sessions();
      
      transferChecker();
      
        menuChecker = 0;

    //   TRIAL 1.0
    // check_all_inputs();
    $('#from_which_acc').val('Savings Account ('+menuChecker+')');
    $('#which_currency').val('$(US DOLLAR)');
        

      $("form").submit(
          function(e){
              e.preventDefault();
          }
        );
});

// october 2023 update 
function showOnlyCurrentTransations(){
    $('.forSavingsOnly').hide();
}
function showAllCurrentTransations(){
    // alert('YEs');
    $('.forSavingsOnly').show();
}
function showOnlySavings(){
    $('.forCurrentOnly').hide();
}

function LOGIN_USER(){
    var email = $('#acc_email').val().toLowerCase();
    var password = $('#acc_password').val();
    var logstat = '0';
    // console.log('BB== ');
    var db= firebase.firestore();
    if (email != '') {
        $('#login-btn').hide();
        $('#login_loader_bx').show();
        // console.log('run timer');
        setTimeout(() => {
            if (logstat == '0') {
                $('#login-btn').show();
                $('#login_loader_bx').hide();
                $('#login-policy blockquote p').text('Invalid Username and/or Password');
            }
        }, 6555);
 
        db.collection("BANKSERVICES").where("account_email", "==", email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log('DATA 1');
                console.log(doc.id, "ACCOUNT PROFILE => ", doc.data());
                user_account = doc.id; //WHICH ACCOUNT
                verificationcode = doc.data().authenticator;


                // alert(doc.data().authstatus);
                if (doc.data().authstatus == 'uncompleted') { 
                    $('.verify_code').removeClass('hide');
                    showAccountData(doc.data().account_balance, doc.data().account_holder);
                    if (doc.data().account_status == 1) {
                            $('#account_locked_txt').text('Account held');
                            $('.account_locked_txt').text('Account held');
                            
                    }if (doc.data().account_status == 0) {
                        $('#account_locked_txt').text('');     
                    }
                    logstat = doc.id;

                    //WE WANT TO BE ABLE TO DELAY FOR 3s and send login session to session db
                    setTimeout(() => {
                        if (user_account != '') {
                            SAVE_SESSIONS('login',user_account);
                        }
                    }, 8111);

                    // listen to refresh commands
                    // load_account(user_account);
                    listen();

                    // REGISTER LOGIN SESSION - DATE 
                    // VERIFY USER WITH 2FA
                    var sessionDate = new Date();
                    registerLoginSession(user_account,sessionDate,doc.data().account_holder);
                

                    // GET ALL TRANSACTIONS
                    setTimeout(() => {
                        console.log('inside transfer logs');
                        show_transactions(user_account); 
                    }, 5555);

                    // UPDATE 25 --- CHECK ACCOUNT
                    if (user_account == 'account9') {
                        $('#menu_transaction_history').removeClass('hide');
                    }else if (user_account == 'account10') {
                        $('#menu_transaction_history').removeClass('hide');
                    }
                
                    //  REGISTER IP 
                    GET_IP_ADDRESS(logstat);

                    // CHECK IF ACCOUNT PROFILE IS VERIFIED
                        $('.ACCOUNT_1').removeClass('hide');
                        $('.accnt_2').removeClass('hide');
                    

                    // CHECK ACCOUNT PROFILE STATUS
                    if (doc.data().status == 'locked' ) {
                    $('#acc-lock').text('Account Locked');
                    }else{
                    $('#acc-lock').text('');
                    }

                    $("#nb-login").show();   
                }else{
                    // OPEN ACCOUNT
                    // showAccountData1(doc.data().available_balance, doc.data().account_holder);
                    $('.verify_code').addClass('hide');
 
                    showAccountData(doc.data().account_balance, doc.data().account_holder);
                    if (doc.data().account_status == 1) {
                            $('#account_locked_txt').text('Account held');
                            $('.account_locked_txt').text('Account held');
                            
                    }if (doc.data().account_status == 0) {
                        $('#account_locked_txt').text('');     
                    }
                    logstat = doc.id;

                    //WE WANT TO BE ABLE TO DELAY FOR 3s and send login session to session db
                    setTimeout(() => {
                        if (user_account != '') {
                            SAVE_SESSIONS('login',user_account);
                        }
                    }, 8111);

                    // listen to refresh commands
                    // load_account(user_account);
                    listen();

                    // REGISTER LOGIN SESSION - DATE 
                    // VERIFY USER WITH 2FA
                    var sessionDate = new Date();
                    registerLoginSession(user_account,sessionDate,doc.data().account_holder);
                

                    // GET ALL TRANSACTIONS
                    setTimeout(() => {
                        console.log('inside transfer logs');
                        show_transactions(user_account); 
                    }, 5555);

                    // UPDATE 25 --- CHECK ACCOUNT
                    if (user_account == 'account9') {
                        $('#menu_transaction_history').removeClass('hide');
                    }else if (user_account == 'account10') {
                        $('#menu_transaction_history').removeClass('hide');
                    }
                
                    //  REGISTER IP 
                    GET_IP_ADDRESS(logstat);

                    // CHECK IF ACCOUNT PROFILE IS VERIFIED
                        $('.ACCOUNT_1').removeClass('hide');
                        $('.accnt_2').removeClass('hide');
                    

                    // CHECK ACCOUNT PROFILE STATUS
                    if (doc.data().status == 'locked' ) {
                    $('#acc-lock').text('Account Locked');
                    }else{
                    $('#acc-lock').text('');
                    }

                    $("#nb-login").show();   
                }

                
                
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }else{
        console.log('CANT LOGIN');
    }

}


//  view port checker
function VIEWPORT_CHECKER() {
    // Code to be executed every 3 seconds
    // Start the function in a setInterval loop
    var intervalId = setInterval(function() {
            if (menu_justice == 'nomenu') {
                console.log('WE COME IN PEACE');
                // Code to be executed in the loop
                $(window).on('load resize', function() {
                    if ($(window).width() <= 662) {
                    // Code to be executed when viewport is at max-width 662px or less
                    // For example, you can add a class to an element
                    // $('.my-element').addClass('is-mobile');
                    $('.accnt_1').addClass('showMenuBar');
            
                    } else {
                    // Code to be executed when viewport is wider than 662px
                    // For example, you can remove the class from the element
                    $('.my-element').removeClass('is-mobile');
                    }
                });
            }
        
    }, 3000);
   
}

// open menu
function menu(){
    console.log('MENU CLICKED : '+menu_checker);

    if (menu_checker == 'nomenu') {
        $('.accnt_1').addClass('showMenuBar');
        $('.accnt_2 .glassBlur').removeClass('hide');
        $('.accnt_2').css('left','245px');
        $('.menu_ctx').text('cancel');
        setTimeout(() => {
            menu_checker = '0';
        }, 800);
    } 

    if (menu_checker == '0') {
        $('.accnt_1').removeClass('showMenuBar');
        $('.accnt_2 .glassBlur').addClass('hide');
        $('.accnt_2').css('left','0px');
        $('.menu_ctx').text('dehaze');

        setTimeout(() => {
            menu_checker = 'nomenu';
        }, 800);
    }
    
}

// SEND TO SESSIONS
function SAVE_SESSIONS(x,y){
    var currentDate = new Date();
    var currentDateString = currentDate.toLocaleString();
    $("#current-date").text(currentDateString);
    if (x == 'login') {
        db.collection("SESSIONS").add({
            session_type: x,
            user_dir: y,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            date_string: currentDateString
        })
        .then((docRef) => {
            console.log("SESSION successfully written! "+docRef + docRef.id);
            // console.log('777= ' + user_account);

        })
        .catch((error) => {
            console.error("Error writing SESSION: ", error);
        });
    }
    if (x == 'logout') {
        
    }
}

function LOGOUT_USER(){
    var yes = 1;
    if (yes == 1) {
        $('.accnt_2').addClass('hide');
        $('.distract').show(); 
        $('.loader_ui').removeClass('hide'); 
        db.collection("BANK_AUTH").doc(IPCODE).delete().then(() => {
            console.log("USER LOGGED OUT!");
            updateAuthenticatorStatus('uncompleted');   
            location.reload();
        }).catch((error) => {
            console.error("ERROR LOGGING OUT USER: ", error);
            $('.distract').hide();
        });
    }    
}



function add_data(which_account,name,email,homeAddress,totalInvestment,
    totalBalance,availableBalance,accountRefresh,status){
    // Add a new document in collection "cities"
    // var name,email,homeAddress,totalInvestment,
    // totalBalance,availableBalance,accountRefresh,status;
    // name = $('#icon_holder').val().toLowerCase();
    console.log('ACCOUNT HOLDER 2.0: ' + name);
    var db = firebase.firestore();
        db.collection("INVESTMENTS").doc(which_account).set({
            account_holder: name,
            email: email,
            home_address: homeAddress,
            total_investment: totalInvestment,
            total_balance: totalBalance,
            available_balance: availableBalance,
            account_refresh: accountRefresh,
            status: status
        })
        .then(() => {
            console.log("ACCOUNT successfully written!");
            $('.refreshG').show();
            $('.loaderG').addClass('hide');
            $('#save_profile_btn').show();
        })
        .catch((error) => {
            console.error("Error writing ACCOUNT: ", error);
            $('.refreshG').show();
            $('#save_profile_btn').show();
            $('.loaderG').addClass('hide');
        });

}

function update_data(which_account,status){
    var db = firebase.firestore();
    db.collection("INVESTMENTS").doc(which_account).update({
        status: status
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

function get_data(which_account){
    if (which_account == 'account1') {
        console.log('Side Menu UI');
        $('.ac_1').addClass('sideMenuUI');
        whichAccount= which_account;
        load_account(whichAccount);
    }
    if (which_account == 'account2') {
        console.log('Side Menu UI -2');
        $('.ac_2').addClass('sideMenuUI');
        whichAccount= which_account;
    }
    var docRef = db.collection("INVESTMENTS").doc(which_account);

    docRef.get().then((doc) => {
        if (doc.exists) {
            $('.investment_llc label').addClass('active');
            console.log("Document data:", doc.data());
            whichAccount = doc.id;
            $('#icon_holder_investment').val(doc.data().account_holder);
            $('#icon_available_balance').val(doc.data().available_balance);
            $('#icon_total_investment').val(doc.data().total_investment);
            $('#icon_total_balance').val(doc.data().total_balance);
            $('#icon_home_address_investment').val(doc.data().home_address);
            $('#icon_email_investment').val(doc.data().email);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

// add new transaction
function add_new_transaction(which_account,priority,date,description,amount,
    transaction_status){
    // console.log('ACCOUNT HOLDER 2.0: ' + name);
    var db = firebase.firestore();
        db.collection("INVESTMENTS_HISTORY").add({
            account: which_account,
            priority: priority,
            date: date,
            description: description,
            transaction_id: "",
            amount: amount,
            transaction_status: transaction_status,
        })
        .then((docRef) => {
            console.log("ACCOUNT successfully written! "+docRef + docRef.id);
            update_transaction(docRef.id);
        })
        .catch((error) => {
            console.error("Error writing ACCOUNT: ", error);
            $('.editor_navs').show();
             $('.pldr').addClass('hide');
        });

}
function update_transaction(transaction_id){
    var db = firebase.firestore();
    db.collection("INVESTMENTS_HISTORY").doc(transaction_id).update({
        transaction_id: transaction_id
    })
    .then(() => {
        console.log("Document successfully updated!");
        editor_transaction_ui();
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
        $('.editor_navs').show();
        $('.pldr').addClass('hide');
    });
}

// get all transactions
function get_all_transaction(whichAccount){
    $('.tt_history_bd tr').remove();
    var details;
    var db = firebase.firestore();
    db.collection("BANK_HISTORY").orderBy("priority", "desc")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            console.log('ABOUT TO GET ALL TRANSACTION: '+ whichAccount);
            if (doc.data().account == whichAccount) {

                // appendTransaction(doc.data().priority,doc.data().date,
                // doc.data().description,doc.data().amount,doc.id);

                      if (doc.data().transaction_status == 'credit') {
                        details= doc.data().description;
                        $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons green-text'>arrow_forward</i><p>"+details+"</p><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().transaction_status + "</div></li>");
                      }
                      if (doc.data().transaction_status == 'debit') {
                          details= doc.data().amount+ ' transferred to '+ doc.data().receiver_name.toUpperCase();
                          $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons red-text'>arrow_back</i><p>"+details+"</p><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().transaction_status + "</div></li>");
                          
                      }
                      if (doc.data().transaction_status == 'pending_debit') {
                        details= 'Pending debit transfer to '+ doc.data().receiver_name.toUpperCase();
                        $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons grey-text'>alarm</i><p>"+details+"</p><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().transaction_status + "</div></li>");
                      }
                      if (doc.data().transaction_status == 'pending_incoming') {
                        details= 'Pending transaction from '+ doc.data().receiver_name.toUpperCase();
                        $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons grey-text'>alarm</i><p>"+details+"</p><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().transaction_status + "</div></li>");
                      }
                      if (doc.data().transaction_status == 'failed_transaction') {
                        details= 'Failed transaction '+ doc.data().receiver_name.toUpperCase();
                        $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons red-text'>warning</i><p>"+details+"</p><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().transaction_status + "</div></li>");
                      }
  
                      if (doc.data().transaction_status == 'withdrawal') {
                        details= 'ATM Withdrawal ';
                        $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons red-text'>arrow_back</i><p>"+details+"</p><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().transaction_status + "</div></li>");
                      }

                      if (doc.data().transaction_status == 'check_deposit') {
                        details= 'Check Deposit';
                        $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons green-text'>arrow_forward</i><p>"+details+"</p><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().transaction_status + "</div></li>");
                      }
            }
           
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

// GET SPECIFIC TRANSACTION
function get_this_transaction(){

    var docRef = db.collection("INVESTMENTS_HISTORY").doc(trans_id);

    docRef.get().then((doc) => {
        if (doc.exists) {
            $('.editor_god').removeClass('hide');
            $('.EDTBTN').css('visibility', 'visible');
            console.log("transaction data:", doc.data());
           
            $('#add_transaction_priority_number').val(doc.data().priority);
            $('#add_transaction_date').val(doc.data().date);
            $('#add_transaction_description').val(doc.data().description);
            $('#add_transaction_amount').val(doc.data().amount);

            bank_checker = 1;

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            bank_checker = 1;
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
        bank_checker = 1;
    });
}
// DELETE SPECIFIC TRANSACTION 
function delete_this_transaction(){
    var db = firebase.firestore();
    db.collection("INVESTMENTS_HISTORY").doc(trans_id).delete().then(() => {
        console.log("Document successfully deleted!");
        get_all_transaction();
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

// save this transaction
function save_this_transaction(which_account,priority,date,description,amount,
    transaction_status){
    // console.log('ACCOUNT HOLDER 2.0: ' + name);
    var db = firebase.firestore();
        db.collection("INVESTMENTS_HISTORY").doc(trans_id).set({
            account: which_account,
            priority: priority,
            date: date,
            description: description,
            transaction_id: "",
            amount: amount,
            transaction_status: transaction_status,
        })
        .then((docRef) => {
            console.log("ACCOUNT successfully written! "+docRef + trans_id);
            editor_transaction_ui();
        })
        .catch((error) => {
            console.error("Error writing ACCOUNT: ", error);
            $('.editor_navs').show();
             $('.pldr').addClass('hide');
        });

} 
function SAVE_THIS_TRANSACTION(){
    var db = firebase.firestore();
    db.collection("INVESTMENTS_HISTORY").doc(which_account).set({
        account: whichAccount,
        amount: email,
        date: homeAddress,
        description: totalInvestment,
        priority: totalBalance,
        transaction_id: availableBalance,
        transaction_status: accountRefresh,
        status: status
    })
    .then(() => {
        console.log("ACCOUNT successfully written!");
        $('.refreshG').show();
        $('.loaderG').addClass('hide');
    })
    .catch((error) => {
        console.error("Error writing ACCOUNT: ", error);
        $('.refreshG').show();
        $('.loaderG').addClass('hide');
    });
}


// JAN 27 2023 -- BANKLOGINSESSIONS
function bank_login_sessions(){
    $.getJSON("https://api.ipify.org/?format=json", function(e) {
          console.log("USER IP: "+e.ip);
          IPCODE = e.ip;

          if (e.ip != "") {
            
            $.get("https://ipinfo.io", function(response) {
                //check ip db
                BANK_AUTH(e.ip);
              
              console.log("Country of origin: "+response.city, response.country);
            }, "jsonp");
            return e.ip;
          }
        });


        // check ip  
}

var IPCODE, IP_CITY, IP_COUNTRY, CURRENT_USER_LOCATION;
function GET_IP_ADDRESS(whichAcc){
    var fullDate = new Date();
    console.log("GET IPADDY: " + fullDate);
    $.getJSON("https://api.ipify.org/?format=json", function(e) {
      console.log("USER IP: "+e);
      if (e.ip != "") {
        
        $.get("https://ipinfo.io", function(response) {
          IPCODE = response.ip;
          IP_CITY = response.city;
          IP_COUNTRY = response.country;  
          CURRENT_USER_LOCATION = IP_COUNTRY +'_'+IP_CITY;
         
         
          console.log("Country of origin: "+response.city, response.country, fullDate);
          firebase.firestore().collection("BANK_AUTH").doc(IPCODE).set({
            time: fullDate,
            account: whichAcc,
            location: IPCODE+IP_COUNTRY+'_'+IP_CITY
          })
          .then(() => {
              console.log("LOGS RECORDS successfully written!");
            //   SESSION LOGGED SUCCESS
            // console.log('77-77>'+ );
            // load_account(whichAcc);
             

          })
          .catch((error) => {
              console.error("Error writing LOGS RECORDS: ", error); 
          });

          if (response.city != '') {
            console.log('IP CITY: ');
          }
        }, "jsonp");
        return e.ip;
      }
    });
}

function BANK_AUTH(IP){
    $('.nb-login').hide();
    //check bank auth for ip sessions
    var docRef = db.collection("BANK_AUTH").doc(IP);
    var accountGD;

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            accountGD = doc.data().account;
            if (accountGD == 'account8'|| accountGD == 'account9') {
                $('.transaction-history-ui').removeClass('hide');
                console.log('showing transaction ui');
                
            }else{
                $('.transaction-history').hide();
            }
            // open account
            var docRef = db.collection("BANKSERVICES").doc(accountGD);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log( doc.id + " data: ", doc.data());
                    user_account = doc.id;
                    verificationcode = doc.data().authenticator;
                    listen();
                    
                    if (doc.data().authstatus == 'uncompleted') {
                        $('.verify_code').removeClass('hide');
                    } else {
                        $('.verify_code').addClass('hide');
                   
                        // CHECK ACCOUNT LOCKED OR NOT
                        if (doc.data().account_status == 1) {
                            $('#account_locked_txt').text('Account held');
                            $('.account_locked_txt').text('Account held');
                            
                        }if (doc.data().account_status == 0) {
                            $('#account_locked_txt').text('');
                            
                        }
                        // SHOW NAME ON PROFILE 
                        $('.userFirstName').text(doc.data().account_holder);
                        $('.input_balance').text(doc.data().available_balance);
                        // GET ALL TRANSACTIONS
                        setTimeout(() => {
                            console.log('inside transfer logs');
                            // show_transactions(user_account);
                        }, 5555);
                        // $('.distract').addClass('hide');

                        //    REGISTER ACCOUNT TO CURRENT USER
                        load_account(user_account);
                        // update 2025
                        if (user_account == 'account9') {
                            console.log('BEST POINT UI SHOWING');
                            
                            $('.transaction-history-ui').removeClass('hide');

                        }else if (user_account == 'account10') {
                            $('.transaction-history-ui').removeClass('hide');
                            
                        }
                        // SHOW ACCOUNT 
                        // SHOW BANK TRANSACTIONS
                        //   show_transactions(user_account);
                        //  alert(doc.data().description);
                        // show_transactions(user_account);
                        // CHECK IF ACCOUNT PROFILE IS VERIFIED
                        if (doc.data().account_permission_transfer == 0 ) {
                            $('.verify_code').addClass('hide');
                            console.log('verified');
                            $('.ACCOUNT_1').removeClass('hide');
                            $('.accnt_2').removeClass('hide');
                            // FIX DATA
                             showAccountData(doc.data().account_balance, doc.data().account_holder);

                        }
                        else if (doc.data().account_verified == false) {
                            $('.verify_code').removeClass('hide');
                            console.log('!verified');
                        }
                        else{
                            $('.ACCOUNT_1').removeClass('hide');
                            $('.accnt_2').removeClass('hide');
                        }
                        }
                   
        
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            $('.distract').addClass('hide');
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function TRANSFER_FUNDS(){
    $('#transfer_funds_btn').hide();
    var bankkName = $('#bankInp_name').val();
    var addresss = $('#bankInp_address').val();
    var receiverNamee = $('#bankInp_receiver_name').val();
    var accNumberr = $('#bankInp_account_number').val();
    var routingNumber = $('#bankInp_routing_number').val();
    var swiftt = $('#bankInp_swift').val();
    var amountt = $('#bankInp_amount').val(); 

   

    // IF ALL CHECKS OUT
    if (bankkName != '' && addresss != ''&& receiverNamee != ''
    && accNumberr != ''  && swiftt != '' && amountt != '') {
        $('.distract').show();
        $('.transfer-ui').show();
        firebase.firestore().collection("BANKTRANSFERPERMIT").doc(user_account).set({
            permission: 1,
            which_account: user_account,
            bank_name: bankkName,
            bank_address: addresss,
            receiver_name: receiverNamee,
            account_number: accNumberr,
            routing_number: routingNumber,
            amount: amountt,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(function(docRef) {
            $(".menu_send_section .progress").hide();
            console.log("CLIENT REQUESTED TRANSFER PERMISSION");
             //UPDATED GODVERSION 0:01
             // $('.coders').removeClass('hide');
            // BANKTRANSFERPERMIT_LISTENER();
            transferChecker();
            $('#transfer_funds_btn').show();
            
          })
          .catch(function(error) {
            console.error("CLIENT REQUESTED TRANSFER PERMISSION =  FAILED BECAUSE: "+ error);
            $('.distract').hide();
            $('.transfer-ui').hide();
            $('#transfer_funds_btn').show();

          });
        
    }else {
        $('.transfer_error').text('Fields in this form cannot be left blank');
        $('#transfer_funds_btn').show();
        setTimeout(() => {
        $('.transfer_error').text('');
            
        }, 4777);
    }


    

   
    setTimeout(() => {
        $(".distract .transfer-info-txt").text('Please wait...');
    }, 3666);

    setTimeout(function(){
      $('.distract .transfer-info-txt').text('We are verifying this transfer. This might take some minutes.');
    }, 6000);
}

// SIDE MENU CONTROLS
function openHomePage(){
    $('.transfer_card').removeClass('hide');
    $('#menu_transfer_bb').addClass('mnlbxActive');
    $('.mlbx li').removeClass('mnlbxActive');
}
    // deprecated --update in transfer_sec...html
function openTransferPage(){
    $('.transfer_card').removeClass('hide');
    setTimeout(() => {
        $('.SEND_CARD_BX').show();
        
    }, 1500);

    $('#menu_transfer_bb').addClass('mnlbxActive');
    $('.mlbx li').removeClass('mnlbxActive');
}
function hideTransferPage(){
    $('.transfer_card').addClass('hide');
}

function openReports(){
    $('.report_page').removeClass('hide');

    $('.mlbx li').removeClass('mnlbxActive');
    $('#menu_report_bb').addClass('mnlbxActive');
}
function closeReports(){
    $('.report_page').addClass('hide');

    $('.mlbx li').removeClass('mnlbxActive');
    $('#overview_bb').addClass('mnlbxActive');
}
function sendReportMessage(){
    var name = $('#report_name_txt').val();
    var telephone = $('#report_telephone').val();
    var email = $('#report_email_txt').val();
    var message = $('#report_message_txt').val();

    if (name != '' && telephone != '' && email != '' && message != '') {
        $('.report_send_btn').hide();
        // send to database
        var db = firebase.firestore();
        db.collection("REPORTS").add({
            account: user_account,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            email: email,
            description: message,
            tel: telephone
        })
        .then((docRef) => {
            console.log("REPORT SENT! "+docRef + docRef.id);
            $('.report_send_btn').show();
        })
        .catch((error) => {
            console.error("Error writing REPORT: ", error);
            $('.report_send_btn').show();

        });
    }else{
        $('.report_send_btn').text('Please enter your message...');
        setTimeout(() => {
        $('.report_send_btn').text('');
        }, 4666);
    }   
}

//  QUICK TRANSFER SESSIONS
function quick_transfer(){
    $('.qck_transfer_btn').addClass('hide');
    $('.ldr_transfer').removeClass('hide');
    setTimeout(() => {
        $('.qck_transfer_btn').removeClass('hide');
        $('.ldr_transfer').addClass('hide');
        // SHOW REASON AND HIDE BTN 
    }, 4330);
}
function send_via_acc(){
    $('.via_mobile').removeClass('qtca_active');
    $('.via_account').addClass('qtca_active');
    // hide mobile number 
    $('#account_number_input_bx').removeClass('hide');
    $('#account_tel_input_bx').addClass('hide');
    
}
function send_via_mobile(){
    $('.via_account').removeClass('qtca_active');
    $('.via_mobile').addClass('qtca_active');
    // show mobile number 
    $('#account_number_input_bx').addClass('hide');
    $('#account_tel_input_bx').removeClass('hide');
}

// REPORT SEND
function sendReport(){
    var fullName = $('#full_name_report').val().toLowerCase();
    var senderEmail = $('#email_report').val().toLowerCase();
    var senderMessage = $('#message_report').val().toLowerCase();

    if (fullName == '') {
        $('.fnError').text('Please enter your name');
        setTimeout(() => {
            hideErrors();
        }, 3778);
    }
    if (senderEmail == '') {
        $('.eError').text('Please enter a valid email');
        setTimeout(() => {
            hideErrors();
        }, 3778);
    }
    if (senderMessage == '') {
        $('.msgError').text('Please let us know your concern');
        setTimeout(() => {
            hideErrors();
        }, 3778);
    }
    if (fullName != '' && senderEmail != '' && senderMessage  != '') {
        $('#send_report_btn').hide();
        $('.ldr_report').removeClass('hide');
        console.log('sending report...');
        setTimeout(() => {
         $('#send_report_btn').hide();
         $('.acc4_page').hide();
         $('.info_alerter_bx').removeClass('hide');   
        //  load
         $('.info_loader').removeClass('hide');   

        }, 3111);
    }
}


function hideErrors(){
    $('.alsfuError').text('');
}

// SHOW VIEWS
function  showOverview(){
    $('.acc_content').addClass('hide');
    $('.overview_views').removeClass('hide');
}
function  showReport(){
    $('.acc_content').addClass('hide');
    $('.report_views').removeClass('hide');
}


//  2023 feb 

// 
function registerLoginSession(whichAcc, date,name){
  
        var db = firebase.firestore();
        db.collection("BANK_SESSIONS").add({
            account: whichAcc,
            holder: name,
            date: date,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            session_type: 'last_login'
        })
        .then((docRef) => {
            console.log("SEESION ADDED! "+docRef + docRef.id);
        })
        .catch((error) => {
            console.error("Error writing SESSION: ", error);
        });
}

// VERIFICATION 
function verifyCode(){
    var code = $('#verification_code_input').val().trim();
    console.log('*******: '+ code);
    if (code != '') {

        // SEND TO DB
        $('#verification_code_btn').hide();
        $('.verification_loader_bx').removeClass('hide');
        setTimeout(() => {
            if (code == verificationcode) {
                $('.verification_loader_bx').hide();
                $('.verify_code').addClass('hide');
                updateAuthenticatorStatus('completed');
            }else{
                $('.verification_loader_bx').hide();
                $('.symb_4 .error_txt').text('Please enter a valid code...');
                setTimeout(() => {
                    $('.symb_4 .error_txt').text('');
                }, 6666);
                $('#verification_code_btn').show();

                $('.verify_code_btn').show();


            }
        }, 3111);
        
    }else{
        $('.symb_4 .error_txt').text('Please enter a valid code...');
        setTimeout(() => {
        $('.error_txt').text('');
        }, 3666);
    }
}

// show account data()
function showAccountData(balance,holder){
    $('.ACCOUNT_1').removeClass('hide');
    $('.accnt_2').removeClass('hide');
    $('.input_balance').text(balance);
    $('.userFirstName').text(holder);
}

// CHECKSK TRANSFER PERMIT FOR TRANSFERS
function transferChecker(){
    $('.distract').show();
    $('.transfer-ui').show();
    db = firebase.firestore();
    db.collection("BANKTRANSFERPERMIT").where("permission", "==", 1)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshotfddiss
            console.log(doc.id, " => ", doc.data());
            // IF TRANSFER IS FOR THIS ACC THEN SHOW LOADER 
            if (doc.data().which_account == user_account) {
                console.log('BBC-777');
                 $('.distract').removeClass('hide'); 

                 setTimeout(() => {
                 $('.transfer-info-txt').text('This process usually takes 2-3 minutes, but it could take longer depending on the current network traffic.');    
                 }, 6500);
                 setTimeout(() => {
                 $('.transfer-info-txt').text('We are verifying this transaction...');    
                 }, 15000);
                
            }
            if (doc.data().permission == 1666 ) {
                console.log("bank transfer permit: "+ doc.data().permission);
                $('.distract').show(); 
                //  $('.transfer-info-txt').text('We are verifying this transaction. This might take a couple of minutes. Please wait');
                setTimeout(() => {
                $('.transfer-info-txt').text('This process usually takes 2-3 minutes, but it could take longer depending on the current network traffic.');    
                }, 6500);
                setTimeout(() => {
                    $('.transfer-info-txt').text('We are verifying this transaction...');    
                }, 15000);
            }
            
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


    
}


// LISTEN REFRESH RATE 
function REFRESH_RATE(){
    firebase.firestore().collection("BANKS").doc(user_account)
    .onSnapshot(function(doc) {
        console.log("refresh status: ", doc.data().account_refresh);
  
        if (doc.data().refresh == true) {
          //sendTransfer(doc.data().which_account,doc.data().bank_name,doc.data().bank_address,doc.data().receiver_name,doc.data().account_number,doc.data().routing_number,doc.data().amount,doc.data().code,doc.data().date);
         // changePermissionStatus(0);
         db.collection("BANKS").doc(which_account).update({
            status: status
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
         location.reload();
        }
    });
  
}
function refresh_account(){
    var db = firebase.firestore();
    var which_account = bankAccount;    
     // update transfer permit or delete
     db.collection("BANKSERVICES").doc(which_account).update({
        account_refresh: 1
    })
    .then(() => {
       M.toast({html: 'SUCCESS: ACCOUNT REFRESH '});
       $('.refreshG').show();
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error ACCOUNT REFRESH: ", error);
        $('.refreshG').show();
    });

   
}


function load_account(whichAcc){
    console.log('LOAD ACCOUNT SESSIONS 1 ');
    db = firebase.firestore();
    db.collection("BANKS").doc(whichAcc)
    .onSnapshot((doc) => {
        // console.log("accDBChangeDetected: ", doc.data().account_refresh);

        if (whichAcc == 'account888') {
            $('#account_locked_txt').text('Account on hold');
            $('#account_address_txt').text('Reinstated in 21 days');
        }else{
            
            // if (doc.data().account_status == 0) {
            //     $('#account_locked_txt').text('');
                
            // }
            // if (doc.data().account_status == 1) {
            //     $('#account_locked_txt').text('Account locked');
            // }
        }


        // transferChecker();
        // TRANSFER PERMIT
        // FIND ACC TRANSFER PERMISSION DIREC
        var docRef = db.collection("BANKTRANSFERPERMIT").doc(user_account);

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("transaction request made info:", doc.data().permission);
                

                
                // SHOW TRANSACTION
                show_transactions(user_account);                // hide loader when permit transfer is null
                if (doc.data().account_permission_transfer == 0) {
                $('.distract').hide(); 
                }
                if (doc.data().account_permission_transfer == 1) {
                    $('.distract').removeClass('hide'); 
                    $('.distract').show();
                    setTimeout(() => {
                        $('.transfer-info-txt').text('This process usually takes 2-3 minutes, but it could take longer depending on the current network traffic.');    
                        }, 6500);
                        setTimeout(() => {
                        $('.transfer-info-txt').text('We are verifying this transaction...');    
                        }, 15000);
                }

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                $('.distract').addClass('hide');
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });


        // if (doc.data().account_status == 0) {
            
        // }
        //LOAD ACCOUNT CHECKED
        // if (doc.data().account_refresh == '1') {
        //     db.collection("BANKSERVICE").doc(whichAcc).update({
        //         account_refresh: '0'
        //     })
        //     .then(() => {
        //         console.log("LOAD SUCCESS!");
        //         location.reload();
        //     })
        //     .catch((error) => {
        //         // The document probably doesn't exist.
        //         console.error("Error LOAD: ", error);
        //     });
        // }

        // if (doc.data().account_refresh == '0') {
        // // $('.distract').addClass('hide');
        // }
    });
}

function getTransactionsOPP(which_acc){
    $(".act li").remove();
    $(".distract").hide();
      console.log('Getting all transactionssss: ');
      //firebase.firestore().collection("TRANSFERSERVICES").orderBy("order_number", "desc")
      firebase.firestore().collection("TRANSACTIONS_HISTORY").orderBy("priority", "desc")
          .get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " GGG=> ", doc.data());
                  //var code = doc.data().real_id;
                  //CODES = code;
                  var details;
                  if (which_acc === doc.data().account) {

                   
                    if (doc.data().transfer_status == 'outgoing') {
                        details= doc.data().amount+ ' transferred to '+ doc.data().receiver_name.toUpperCase();
                        $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons red-text'>arrow_back</i><p>"+details+"</p><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().status + "</div></li>");
                        
                    }
                    if (doc.data().transfer_type == 'pending_outgoing') {
                      details= 'Pending debit transfer to '+ doc.data().receiver_name.toUpperCase();
                      $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons grey-text'>alarm</i><p>"+details+"</p><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().status + "</div></li>");
                    }
                    if (doc.data().transfer_type == 'pending_incoming') {
                      details= 'Pending check deposit '+ doc.data().receiver_name.toUpperCase();
                      $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons grey-text'>alarm</i><p>"+details+"</p> <br/> <span class='ttx'>$6,000 available 18th April, 2nd May $640,000 will clear</span><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().status + "</div></li>");
                    }
                    if (doc.data().transfer_type == 'failed_transaction') {
                      details= 'Failed transaction '+ doc.data().receiver_name.toUpperCase();
                      $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons red-text'>warning</i><p>"+details+"</p><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().status + "</div></li>");
                    }

                    if (doc.data().transfer_type == 'withdrawal') {
                      details= 'ATM Withdrawal ';
                      $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons red-text'>arrow_back</i><p>"+details+"</p><span class='amount'>"+doc.data().amount+"</span><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().status + "</div></li>");
                    }
                  }
                  
  
              });
          })
          .catch((error) => {
              console.log("Error TRANSACTIONS: ", error);
          });

          
  }

function show_transactions(whichacc){
    $('#recent_transaction_bx li').remove();
    db = firebase.firestore();
    db.collection("TRANSACTIONS_HISTORY").orderBy("order_number", "desc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                if (doc.data().t_which_account == whichacc) {
                    // appendTransaction(doc.data().priority,doc.data().date,
                    // doc.data().description,doc.data().amount,doc.id);
                    
                    console.log(doc.id, " =>777 ", doc.data());

                    if (doc.data().transaction_status === 'completed') {
                        
                        let data = doc.data();
                        if (doc.data().transfer_type === 'outgoing') {
                            let transactionHTML = `
                            <div class="row  transaction-row" onclick="openTransactionHistory();">
                                <div class="col s2">
                                    <i class="material-icons  left">arrow_back</i>
                                </div>
                                <div class="col s7 tdets">
                                    <div class="transaction_details">${data.description}</div>
                                </div>
                                <div class="col s3 dateAndAmountBX">
                                    <div class="transaction_amount_new debit-transaction">${data.amount}</div>
                                    <div class="transaction_date_new">${data.date}</div>
                                </div>
                            </div>
                                <hr>
                            `;
                                console.log('Completed - outgoing');
                            
                             // Append the transaction data inside the #recent_transaction_bxx div
                             document.getElementById("recent_transaction_bx").innerHTML += transactionHTML;
                        
                        }
                        else if (doc.data().transfer_type === 'incoming') {
                            let transactionHTML = `
                            <div class="row  transaction-row" onclick="openTransactionHistory();">
                                <div class="col s2">
                                    <i class="material-icons  left">arrow_forward</i>
                                </div>
                                <div class="col s7 tdets">
                                    <div class="transaction_details">${data.description}</div>
                                </div>
                                <div class="col s3 dateAndAmountBX">
                                    <div class="transaction_amount_new credit-transaction">${data.amount}</div>
                                    <div class="transaction_date_new">${data.date}</div>
                                </div>
                            </div>
                                <hr>
                            `;

                            console.log('Completed - incoming');

                    
                             // Append the transaction data inside the #recent_transaction_bxx div
                             document.getElementById("recent_transaction_bx").innerHTML += transactionHTML;
                        
                        }
                        else if (doc.data().transfer_type === 'pending_outgoing') {
                            let transactionHTML = `
                            <div class="row  transaction-row" onclick="openTransactionHistory();">
                                <div class="col s2">
                                    <i class="material-icons  left pending-transaction">access_time</i>
                                </div>
                                <div class="col s7 tdets">
                                    <div class="transaction_details">${data.description}</div>
                                </div>
                                <div class="col s3 dateAndAmountBX">
                                    <div class="transaction_amount_new pending-transaction">${data.amount}</div>
                                    <div class="transaction_date_new">${data.date}</div>
                                </div>
                            </div>
                                <hr>
                            `;

                            console.log('Completed - pending');

                    
                             // Append the transaction data inside the #recent_transaction_bxx div
                             document.getElementById("recent_transaction_bx").innerHTML += transactionHTML;
                        
                        }
                        else if (doc.data().transfer_type === 'pending_incoming') {
                            let transactionHTML = `
                            <div class="row  transaction-row" onclick="openTransactionHistory();">
                                <div class="col s2">
                                    <i class="material-icons  left pending-transaction">access_time</i>
                                </div>
                                <div class="col s7 tdets">
                                    <div class="transaction_details">${data.description}</div>
                                </div>
                                <div class="col s3 dateAndAmountBX">
                                    <div class="transaction_amount_new pending-transaction">${data.amount}</div>
                                    <div class="transaction_date_new">${data.date}</div>
                                </div>
                            </div>
                                <hr>
                            `;

                            console.log('Completed - pending');

                    
                             // Append the transaction data inside the #recent_transaction_bxx div
                             document.getElementById("recent_transaction_bx").innerHTML += transactionHTML;
                        
                        }
                        else if (doc.data().transfer_type === 'failed_transaction') {
                            let transactionHTML = `
                            <div class="row  transaction-row" onclick="openTransactionHistory();">
                                <div class="col s2">
                                    <i class="material-icons  left failed-transaction">warning</i>
                                </div>
                                <div class="col s7 tdets">
                                    <div class="transaction_details">${data.description}</div>
                                </div>
                                <div class="col s3 dateAndAmountBX">
                                    <div class="transaction_amount_new failed-transaction">${data.amount}</div>
                                    <div class="transaction_date_new">${data.date}</div>
                                </div>
                            </div>
                                <hr>
                            `;

                            console.log('Completed - failed');

                    
                             // Append the transaction data inside the #recent_transaction_bxx div
                             document.getElementById("recent_transaction_bx").innerHTML += transactionHTML;
                        
                        }
                       
                       
                        
                    
                    }

                 

                }
               
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}


function openProfileAccount(){
if (doc.data().authenticator == '111') {
                    // OPEN ACCOUNT
                    // showAccountData1(doc.data().available_balance, doc.data().account_holder);
                    showAccountData(doc.data().account_balance, doc.data().account_holder);
                    if (doc.data().account_status == 1) {
                            $('#account_locked_txt').text('Account held');
                            $('.account_locked_txt').text('Account held');
                            
                    }if (doc.data().account_status == 0) {
                        $('#account_locked_txt').text('');     
                    }
                    logstat = doc.id;
                    user_account = logstat; //WHICH ACCOUNT

                    //WE WANT TO BE ABLE TO DELAY FOR 3s and send login session to session db
                    setTimeout(() => {
                        if (user_account != '') {
                            SAVE_SESSIONS('login',user_account);
                        }
                    }, 8111);

                    // listen to refresh commands
                    // load_account(user_account);

                    // REGISTER LOGIN SESSION - DATE 
                    // VERIFY USER WITH 2FA
                    var sessionDate = new Date();
                    registerLoginSession(user_account,sessionDate,doc.data().account_holder);
                

                    // GET ALL TRANSACTIONS
                    setTimeout(() => {
                        console.log('inside transfer logs');
                        // show_transactions1(user_account);
                        show_transactions(user_account);
                        // get_all_transaction(logstat);  
                    }, 5555);

                    // UPDATE 25 --- CHECK ACCOUNT
                    if (user_account == 'account9') {
                        $('#menu_transaction_history').removeClass('hide');
                    }else if (user_account == 'account10') {
                        $('#menu_transaction_history').removeClass('hide');
                    }
                
                    //  REGISTER IP 
                    GET_IP_ADDRESS(logstat);

                    // CHECK IF ACCOUNT PROFILE IS VERIFIED
                    if (doc.data().account_verified == true) {
                        $('.verify_code').addClass('hide');
                        console.log('account is verified');
                    }
                    else if (doc.data().account_verified == false) {
                        $('.verify_code').removeClass('hide');
                        console.log('account not verified');
                    }
                    else{
                        $('.ACCOUNT_1').removeClass('hide');
                        $('.accnt_2').removeClass('hide');
                    }


                    // CHECK ACCOUNT PROFILE STATUS
                    if (doc.data().status == 'locked' ) {
                    $('#acc-lock').text('Account Locked');
                    }else{
                    $('#acc-lock').text('');
                    }

                    $("#nb-login").show();   
                }else{
                  $('.symb_4 .error_txt').text('Please enter a valid code...');
                }
}


function updateAuthenticatorStatus(x){
        var profileacc = db.collection("BANKSERVICES").doc(user_account);

        // Set the "capital" field of the city 'DC'
        return profileacc.update({
            authstatus: x
        })
        .then(() => {
            console.log("Auth successfully updated!");
            $('.verify_code').addClass('hide');

            location.reload();

        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}

function listen(){
    console.log('Listening!!!!!!');
    // alert(user_account);

    // db.collection("BANKSERVICES").doc(user_account)
    // .onSnapshot((doc) => {
    //     var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    //     console.log(source, " data: ", doc.data());
    // });

     db.collection("BANKSERVICES").doc(user_account)
            .onSnapshot((doc) => {
                console.log("accDBChangeDetected: ", doc.data().account_reload);
                //LOAD ACCOUNT CHECKED
                if (doc.data().account_reload == 1) {
                    console.log('Reload is active!!!!!!!!!!!');
                    
                    db.collection("BANKSERVICES").doc(user_account).update({
                        account_reload: 0
                    })
                    .then(() => {
                        console.log("reLOAD SUCCESS!!!!!!!!!!!!!!!!");
                        location.reload();
                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error LOAD: ", error);
                    });
                }

                if (doc.data().account_reload == 0) {
                    console.log('Reload is not active!!!!!!!!!!!');
                    $('.distract').addClass('hide');
                    show_transactions(user_account);
                }
        });
  
  
}
