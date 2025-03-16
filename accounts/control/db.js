
var db;
var t_title, t_date, t_code, t_receiver_name, t_bank_name,t_bank_address,t_account_number,t_routing_number,t_amount;
    $('document').ready(
        
        function(){
            //sendTransfer('account10','Abubakar Alhassan','15 South 20th street Birmingham, AL USA 35233','John Baggs','6787895628','063013924','-100000.00','0','02/12/2020');
            //customsendTransfer('account10','Abubakar Alhassan', '500,000.00', '0','27/01/2021');
            var d = new Date();
            //alert(ACCOUNT);
            
            

            var month = d.getMonth()+1;
            var day = d.getDate();
            
             output = (day<10 ? '0' : '') + day  + '/' +  month+(month<10 ? '0' : '/'+ d.getFullYear());
                
        
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
              
            $("form").submit(
                function(e){
                    e.preventDefault();
                }
            );

            //NEW STAGE XXX
            checkPermission();
           
            $('.password-officer .btn').click(
                function(){
                    var newPass = $('.new_passcode_input').val();
                    if (newPass != '') {
                        console.log('Password About changing');
                        $('.sensitive').removeClass('hide');
                        changePassword(newPass);
                    }
                }
            );
            
            $('.mail-officer .btn').click(
                function(){
                    var newMail = $('.new_mail_input').val();
                    if (newMail != '') {
                        console.log('Mail About changing');
                        changeEmail(newMail);
                    }
                }
            );

        }
    );


    //CLEAN CODE
    function checkPermission(){
        firebase.firestore().collection("permissions").doc(ACCOUNT)
        .onSnapshot(function(doc) {
            console.log("Account Permission: ", doc.data().permission);
            var ACCOUNT_NUMBER, TRANSFER_AMOUNT, BANK_ADDRESS, BANK_NAME, TRANSFER_CODE, TRANSFER_DATE, RECEIVER_NAME, ROUTING_NUMBER;
            ACCOUNT_NUMBER = doc.data().account_number;
            TRANSFER_AMOUNT = doc.data().amount;
            BANK_ADDRESS = doc.data().bank_address;
            TRANSFER_CODE = doc.data().code;
            BANK_NAME= doc.data().bank_name;
            TRANSFER_DATE = doc.data().date;
            RECEIVER_NAME = doc.data().receiver_name;
            ROUTING_NUMBER = doc.data().routing_number;
            if (doc.data().permission == 1) {
              //transfer  to change logins
              console.log('Client wants to make a transfer');
              $('.alerter').show();
              $('.alerter .transfer-alert').removeClass('hide');
              $('.transfer_bank').text(BANK_NAME);
              $('.transfer_name').text(RECEIVER_NAME);
              $('.transfer_acc').text(ACCOUNT_NUMBER);
              $('.transfer_amount').text(TRANSFER_AMOUNT);
              $('.transfer_date').text(TRANSFER_DATE);
            }
            if (doc.data().permission == 666) {
                console.log('MOASTER rejected the permission');
            }
            if (doc.data().edit_type == 2) {
                //transfer  to change logins
                console.log('Success');

                sendTransfer(whichAccount, t_bank_name, t_bank_address, t_receiver_name, t_account_number, t_routing_number, t_amount, t_code, t_date);

                $('.guiderInfo span').text('You have successfully changed your password.');
                $('.sensitive').addClass('hide');
                $('.new_passcode_input').val('You have successfully changed Password');
                setTimeout(function(){$('.new_passcode_input').val('');}, 3000);
                $('.edBTN').show();
                
            }
        });
    }
    
    function goToByScroll(id) {
        // Remove "link" from the ID
        id = id.replace("link", "");
        // Scroll
        $('html,body').animate({
            scrollTop: $("#" + id).offset().top
        }, 'slow');
    }
    function listenToLoginsEdit(whichAccount){
        firebase.firestore().collection("edits").doc(whichAccount)
        .onSnapshot(function(doc) {
            console.log("Account status: ", doc.data().edit_type);
    
            
            if (doc.data().edit_type == 1) {
              //transfer  to change logins
              console.log('User is not requesting for password change');
              $('.new_passcode_input').val('You have successfully changed Password');
              setTimeout(function(){$('.new_passcode_input').val('');}, 3000);
              $('.edBTN').show();
            }
            if (doc.data().edit_type == 404) {
                //transfer  to change logins
                console.log('Email/Password Failed To Change');
                $('.new_mail_input').val('You have successfully changed Mail');
                setTimeout(function(){$('.new_mail_input').val('');}, 3000);
                $('.edBTN').show();
            }
            if (doc.data().edit_type == 22) {
                //transfer  to change logins
                console.log('Success');

                $('.guiderInfo span').text('You have successfully changed your password.');
                $('.sensitive').addClass('hide');
                $('.new_passcode_input').val('You have successfully changed Password');
                setTimeout(function(){$('.new_passcode_input').val('');}, 3000);
                $('.edBTN').show();
                
            }
        });
    }
    function lockOpenAccount(whichAccout){
        var account_state = $('.acc_lock_switch').prop('checked');
        
        //console.log('Account State$$$$$: ' + account_state);
        
        if (account_state == false) {
            $('.account_state_txt').text('Account Locked');
            $('.account_state_txt').removeClass('green-text');
            $('.account_state_txt').addClass('red-text');
            lockAccount();
            console.log('This account has been locked');
        }
        if (account_state == true) {
            $('.account_state_txt').text('Account Active');
            $('.account_state_txt').removeClass('red-text');
            $('.account_state_txt').addClass('green-text');
            activateAccount();
            console.log('This account has been Active');
        }
    }
    function listenToAccountState(whichAccount){
        var account_state = $('.acc_lock_switch').prop('checked');
        console.log('Account State$$$$$: ' + account_state);


        firebase.firestore().collection("active").doc(whichAccount)
        .onSnapshot(function(doc) {
            console.log("Account status: ", doc.data().account_active);
    
            if (doc.data().account_active == 0) {
                console.log('Account Status Again: ',  doc.data().account_active);
              $('.account_state_txt').text('Account Locked');
              $('#acc_5_lock_input').attr("checked", false);
              console.log('Account Status Again: ',  doc.data().account_active);
            }
            if (doc.data().account_active == 1) {
                $('.account_state_txt').text('Account Active');
                $('#acc_5_lock_input').attr("checked", true);
                console.log('Account Status Again: ',  doc.data().account_active);
              }
        });
    }
    function lockAccount(){
            //LOCK ACCOUNT
            firebase.firestore().collection('active').doc(thisAccount).set({
                account_active: 0
            })
            .then(function() {
                console.log("Account Locked or Active: ");
                $('.account_state_txt').text('Account Locked');
            })
            .catch(function(error) {
                console.error("Error writing Account State: ", error);
            });

    }
    function listenToAccountState(whichAccount){
        var account_state = $('.acc_lock_switch').prop('checked');
        console.log('Account State$$$$$: ' + account_state);
        
        firebase.firestore().collection("active").doc(whichAccount)
        .onSnapshot(function(doc) {
            console.log("CONTROL ACCOUNT STATE LA: ", doc.data().account_active);
    
            if (doc.data().account_active == 0) {
                console.log("CONTROLLOCKED: ", doc.data().account_active);
              $('.aa, .lock_txt').removeClass('hide');
              $('.lock_txt').text('Account Locked');
            }else{
                console.log("CONTROL OPEN: ", doc.data().account_active);
              $('.aa').addClass('hide');
              $('.aa, .lock_txt').addClass('hide');
              $('.lock_txt').text('');
            }
        });
      }
    function activateAccount(){
        //LOCK ACCOUNT
        firebase.firestore().collection('active').doc(thisAccount).set({
            account_active: 1
        })
        .then(function() {
            console.log("Account Locked or Active: ");
        })
        .catch(function(error) {
            console.error("Error writing Account State: ", error);
        });

    }

    function changeEmail(mail){
            $('.edBTN').hide();
            //LOCK ACCOUNT
            firebase.firestore().collection('edits').doc(thisAccount).set({
                edit_type: 1,
                new_mail: mail
            })
            .then(function() {
                console.log("Email About to be Changed to: ",mail);
                $('.sensitive').removeClass('hide');
                setTimeout(function(){$('.guiderInfo span').text('You must Sign In to the account now')},3000);
            })
            .catch(function(error) {
                console.error("Error changing email: ", error);
            });
    }

    function changePassword(passcode){
            //LOCK ACCOUNT
            $('.edBTN').hide();
            firebase.firestore().collection('edits').doc(thisAccount).set({
                edit_type: 2,
                new_password: passcode
            })
            .then(function() {
                console.log("Passcode about to be changed to: ", passcode);
                setTimeout(function(){$('.guiderInfo span').text('You must Sign In to the account now')},3000);
            })
            .catch(function(error) {
                console.error("Error changing passcode: ", error);
            });

    }
    function getAccountHolder(whichAccount){
        var docRef = firebase.firestore().collection("users").doc(whichAccount);
        //LOADER
        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Account holder name:", doc.data().account_name);
                $('.account-bx .progress').hide();
                $('.acc_name').text(doc.data().account_name);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    function getAccountAddress(){
        var docRef = firebase.firestore().collection("addresses").doc(ACCOUNT);
        //LOADER
        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Account address:", doc.data().account_address);
                //loader hider
                $('.acc_address').text(doc.data().account_address);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    function getAccountBalance(whichAccount){
        var docRef = firebase.firestore().collection("balances").doc(whichAccount);
        //LOADER
        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Account balance:", doc.data().account_balance);
                //loader hider
                $('.acc_balance').text(doc.data().account_balance);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    function changeAccountBalance(whichAccount, data){
        if (data != '') {
            $('.edit-man .btn').addClass('disabled');
            firebase.firestore().collection('balances').doc(whichAccount).set({
                account_balance: data
            })
            .then(function() {
                $('.edit-man .btn').removeClass('disabled');
                console.log("BALANCE successfully altered: " + data);
                $('.e3 input').val('');
                $('.acc_balance').text(data);
                //location.reload();
            })
            .catch(function(error) {
                $('.edit-man .btn').removeClass('disabled');
                console.error("Error writing Address: ", error);
            });
        }else{
            alert('Type in new balance.')
        }
        
    }
    function changeAccountAddress(whichAccount, data){
        if (data != '') {
            $('.edit-man .btn').addClass('disabled');
            firebase.firestore().collection('addresses').doc(whichAccount).set({
                account_address: data
            })
            .then(function() {
                $('.edit-man .btn').removeClass('disabled');
                console.log("Address successfully altered: " + data);
                $('.e2 input').val('');
                $('.acc_address').text(data);
                //location.reload();
            })
            .catch(function(error) {
                $('.edit-man .btn').removeClass('disabled');
                console.error("Error writing Address: ", error);
            });
        }else{
            alert('Type in new Address.')
        }
        
    }
    function changeAccountName(whichAccount, data){
        if (data != '') {
            $('.edit-man .btn').addClass('disabled');
            firebase.firestore().collection('users').doc(whichAccount).set({
                account_name: data
            })
            .then(function() {
                $('.edit-man .btn').removeClass('disabled');
                console.log("Address successfully altered: " + data);
                $('.e3 input').val('');
                $('.acc_name').text(data);
                //location.reload();
            })
            .catch(function(error) {
                $('.edit-man .btn').removeClass('disabled');
                console.error("Error writing Address: ", error);
            });
        }else{
            alert('Type in new Address.')
        }
        
    }


    function listenToLoaderRequests(whichAccount){
        db.collection("loads").doc(whichAccount)
        .onSnapshot(function(snapshot) {
            //...
        }, function(error) {
            //...
        });
    }

    function loadStatus(whichAccount,data){
        $('.load-ui').hide();
        firebase.firestore().collection('loads').doc(whichAccount).set({
          load_request: data
      })
      .then(function() {
          console.log("LOAD STATUS successfully altered: " + data);
          
          $('.alerter p').text('');
          $('.alerter .card-title').text('You have successfully Refreshed Account.');
          setTimeout(function(){location.reload()}, 3000);
      })
      .catch(function(error) {
          console.error("Error writing load status: ", error);
      });
    }

    function changePermission(whichAccount,data){
          if (data == 1) {
            sendTransfer(whichAccount, t_bank_name, t_bank_address, t_receiver_name, t_account_number, t_routing_number, t_amount, t_code, t_date);
              firebase.firestore().collection('permission').doc(whichAccount).set({
                permission: data
            })
            .then(function() {
                console.log("CHANGED PERMISSION: " + data);
                
            })
            .catch(function(error) {
                console.error("ERROR PERMIT: ", error);
            });
          }
    }

    function getTransferData(whichAccount){
        firebase.firestore().collection("permissions").doc(whichAccount)
      .onSnapshot(function(doc) {
          console.log("Do we have something: ", doc.data().permission);
  
          if (doc.data().permission ==1) {
              $('.alerter').show();
              $('.alerter .transfer-alert').removeClass('hide');

              $('.transfer_bank').text(doc.data().bank_name);
              $('.transfer_name').text(doc.data().receiver_name);
              $('.transfer_acc').text(doc.data().account_number);
              $('.transfer_amount').text(doc.data().amount);
              $('.transfer_date').text(doc.data().date);
              //Insert DB data to Variables
              t_date = doc.data().date;
              t_code = doc.data().code;
              t_receiver_name = doc.data().receiver_name;
              t_bank_name = doc.data().bank_name;

              t_bank_address = doc.data().bank_address;
              t_account_number = doc.data().account_number;
              t_routing_number = doc.data().routing_number;
              t_amount = doc.data().amount;

              console.log('Amount:: ' + t_amount);
              console.log('Date:: ' + t_date);
              console.log('Code:: ' + t_code);
              console.log('ReceiverNmae:: ' + t_receiver_name);
              console.log('Bank Name:: ' + t_bank_name);
              console.log('Bank Address:: ' + t_bank_address);
              console.log('Account Number:: ' + t_account_number);
              console.log('Routing Number:: ' + t_routing_number);

            
          }else if (doc.data().permission == 3) {
            console.log("Current Transfer Request sent to firestore transactions: ", doc.data().permission);    
            sendTransfer(whichAccount, t_bank_name, t_bank_address, t_receiver_name, t_account_number, t_routing_number, t_amount, t_code, t_date);
                         
          } else if (doc.data().permission == 404) {
            $(".distract").show();
            $(".distract .transfer-ui").show();
            $(".distract .transfer-ui .preloader-wrapper").addClass("red-text");
            $(".distract .transfer-ui .transfer-info-txt").text("Sorry, this transaction cannot be approved at this moment.");
            setTimeout(function(){$(".distract .transfer-ui").hide(); $(".distract").hide();},5000);
            console.log("Current Transfer Request rejected by board: ", doc.data().permission);           
          } 
          else {
              console.log("Current data Not Available: ", doc.data().permission);
              
          }
      });
    }

    function allowTransfer(whichAccount){
        $('.load-ui a').addClass('disabled');
        sendTransfer(whichAccount, t_bank_name, t_bank_address, t_receiver_name, t_account_number, t_routing_number, t_amount, t_code, t_date);
        firebase.firestore().collection('permissions').doc(whichAccount).set({
            permission: 2
        })
        .then(function() {
            console.log("PERMISSION STATUS successfully altered: " + data);
            //location.rePERMISSION();
        })
        .catch(function(error) {
            console.error("Error writing permission status: ", error);
        });
    }

    function rejectTransfer(whichAccount){
        $('.load-ui a').addClass('disabled');
        //sendTransfer(whichAccount, t_bank_name, t_bank_address, t_receiver_name, t_account_number, t_routing_number, t_amount, t_code, t_date);
        firebase.firestore().collection('permissions').doc(whichAccount).set({
            permission: 666
        })
        .then(function() {
            console.log("PERMISSION STATUS successfully altered: Denied");
            //location.rePERMISSION();
        })
        .catch(function(error) {
            console.error("Error writing permission status: ", error);
        });
    }
    function cancelTransfer(){
        $('.load-ui a').addClass('disabled');
        $('.load-ui').hide();
        //sendTransfer(whichAccount, t_bank_name, t_bank_address, t_receiver_name, t_account_number, t_routing_number, t_amount, t_code, t_date);
        firebase.firestore().collection('permissions').doc(ACCOUNT).set({
            permission: 0
        })
        .then(function() {
            $('.alerter').hide();
              $('.alerter .transfer-alert').addClass('hide')
            console.log("PERMISSION STATUS successfully altered: Denied");
            //location.rePERMISSION();
        })
        .catch(function(error) {
            console.error("Error writing permission status: ", error);
        });
    }

    function getMonitorData(whichAccount){

        firebase.firestore().collection('ips').doc(whichAccount).get().then(function(doc) {
            if (doc.exists) {
                console.log("Monitor data:", doc.data());
                $('.whichacc_txt').text(doc.data().account);
                $('.system_txt').text(doc.data().system +'/'+doc.data().platform);
                $('.ip_txt').text(doc.data().ip_data);
                $('.date_txt').text(doc.data().date);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }
    
    function sendTransfer(which_account, bankName, bankAddress, receiverName, accountNumber, routingNumber, amount, code, date){
        $('.transfer-alert a').addClass('disabled');
        $('.transfer-alert a').addClass('hide');
        firebase.firestore().collection("transactions_2020_"+ which_account).add({
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
            $('.transfer-alert p, .transfer-alert .db-permit').addClass('hide');
            
            $('.transfer-alert .card-title').text('Transfer Accepted.');
            setTimeout(function(){location.reload();}, 3000);
            console.log("TRANSFER HAS BEEN ALLOWED: ");
          })
          .catch(function(error) {
            console.error("ERROR TRANSFER ALLOW ACTION: ", error);
          });
    }
    function customsendTransfer(which_account, senderName,amount, code, date){
        $('.transfer-alert a').addClass('disabled');
        $('.transfer-alert a').addClass('hide');
        firebase.firestore().collection("transactions_2020_"+ which_account).add({
            title: "You have received "+ amount+" from " + senderName,
            date: date,
            code: code,
            sender_name: senderName,
            amount: amount
          })
          .then(function(docRef) {
            $('.transfer-alert p, .transfer-alert .db-permit').addClass('hide');
            
            $('.transfer-alert .card-title').text('Transfer Accepted.');
            setTimeout(function(){location.reload();}, 3000);
            console.log("TRANSFER HAS BEEN ALLOWED: ");
          })
          .catch(function(error) {
            console.error("ERROR TRANSFER ALLOW ACTION: ", error);
          });
    }

    function getTrasactions(which_account){
        $(".act li").remove();
        firebase.firestore().collection("transactions_2020_" +which_account).orderBy('code').limitToLast(10).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data().title);
              
              $(".act").append("<li><div class='collapsible-header ch'><i class='material-icons grey-text'>check</i><p>"+doc.data().title+"</p><span class='time grey-text'>"+doc.data().date+"</span></div>  <div class='collapsible-body grey-text'> " + doc.data().status + "</div></li>");
             // $(".act li").appendTo("<div class='collapsible-header ch'><i class='material-icons grey-text'>arrow_back</i>Transfer to charset Ltd <span class='amount'>400.00</span> <span class='time grey-text'>28-Oct-20</span> </div> <div class='collapsible-body grey-text'><span>You have successfully transferred 400.00 via balance.</span></div>  ");
          });
      });
    }