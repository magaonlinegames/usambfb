
// Add a new document in collection "cities"
//var messagesRef = firebase.database().ref('messages');
var account_owner;
//AUTHENTICATION



function saveMessage(name, email, message){
     name = $(".name_of_sender").val();
     email = $(".email_of_sender").val();
     message = $(".message_of_sender").val();
     if (name == "" || email == "" || message == "") {
         $(".cu-bx .error-txt").show();
         setTimeout(
             function(){
                $(".cu-bx .error-txt").hide();  
             }, 3000
         );
     } else {
        db.collection("messages").add({
            name: name,
            email: email,
            message: message
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        }); 
     }
    
}
function saveTransfer(bankName, recName, accNumber, amount){
    bankName = $(".nob").val();
    recName = $(".rn").val();
    accNumber = $(".an").val();
    amount = $(".tamount").val();
    if (bankName == "" || recName == "" || accNumber == ""||amount == "") {
        $(".transfer-error").show();
        setTimeout(
            function(){
               $(".transfer-error").hide();  
            }, 3000
        );
    } else {
        $(".clear").val("");
       db.collection("transfer").add({
           bank_name: bankName,
           receiver_name: recName,
           account_number: accNumber,
           transfer_amount: amount
       })
       .then(function(docRef) {
           console.log("transfer written with ID: ", docRef.id);
       })
       .catch(function(error) {
           console.error("Error adding document: ", error);
       }); 
    }
   
}
function saveLoan(bankName, bankAddress, receiverName, accountNumber, routingNumber, amount){
    if (bankName == "" || bankAddress == "" || receiverName == ""||accountNumber == ""||routingNumber == ""||amount == "") {
        $(".loan-error").show();
        setTimeout(
            function(){
               $(".loan-error").hide();  
            }, 3000
        );
    } else {
        $(".distract").show();
        $(".ie5 .validate").val("");
        writeLoanRequest(account_owner, bankName, bankAddress, receiverName);
       db.collection("loan_details").add({
           bank_name: bankName,
           bank_address: bankAddress,
           receiver_name: receiverName,
           account_number: accountNumber,
           routing_number: routingNumber,
           loan_amount: amount
       })
       .then(function(docRef) {
           console.log("loan written with ID: ", docRef.id);
           //   
           $(".distract").hide();
           $(".loader").show();
           loanDescription();
           iWantPermit();
           var myTimer = setInterval(
               function(){
                    /// CHECK DATABASE FOR PERMISSION FROM THE OFFICE OF THE CHIEF COMMANDER
                    db.collection("loan_permit").doc("grant_permit").get().then(function(doc) {
                    if (doc.exists) {
                        var checkPermit = doc.data().account_1_permit;
                        console.log("LOAN PERMISSION REQUEST IS AVAILABLE:", checkPermit);
                        if (checkPermit == "1") {
                            console.log("LOAN PERMIT GRANTED");
                            clearInterval(myTimer);
                            $(".loader p").text("Your loan has been approved. The funds will be made available to you within 7 business days. Thank you for banking with us");
                            setTimeout(function(){goHome();},8000);
                            
                        } else {
                            $(".loader p").text("Processing your request...");
                        }
                    } else {
                        console.log("No such document for Loan Request here!");
                        $(".distract").hide();
                        goHome();
                        
                    }
                    }).catch(function(error) {
                        console.log("Error getting document:", error);
                    });
            }, 10000);
        })
        .catch(function(error) {
            console.error("Error adding loan to document: ", error);
        }); 
        }
   
}
function iWantPermit(){  
    db.collection("loan_permit").doc("grant_permit").set({
        account_1_permit: "0"
    })
    .then(function(docRef) {
      console.log("LOAN PERMIT REQUESTED: " + docRef);
      })
    .catch(function(error) {
        console.error("ERROR REQUESTING FOR LOAN PERMIT: ", error);
    }); 
}

function accountSecurity(state){
    if (state == "1") {
        $(".describer, .login-bx").hide();
        $(".account-1").fadeIn();
        openHome();
    }
}
//Delete document in collection "cities"
function deleteFromDatabase(){
    db.collection("cities").doc("DC").delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

// RENDER
const messageList = document.querySelector('#messages-list');
const transferList = document.querySelector('#transfer-list');
function renderDB(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let email = document.createElement('span');
    let message = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    email.textContent = doc.data().email;
    message.textContent = doc.data().message;

    li.appendChild(name);
    li.appendChild(email);
    li.appendChild(message);

    document.getElementById("messages-list").appendChild(li);
}
function renderTransfer(doc){
    let li = document.createElement('li');
    let bankName = document.createElement('span');
    let recName = document.createElement('span');
    let accNumber = document.createElement('span');
    let transferAmount = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    bankName.textContent = doc.data().bank_name;
    recName.textContent = doc.data().receiver_name;
    accNumber.textContent = doc.data().account_number;
    transferAmount.textContent = doc.data().transfer_amount;

    li.appendChild(bankName);
    li.appendChild(recName);
    li.appendChild(accNumber);
    li.appendChild(transferAmount);

    document.getElementById("transfer-list").appendChild(li);
}
function renderLoan(doc){
    let li = document.createElement('li');
    let bankName = document.createElement('span');
    let bankAddress = document.createElement('span');
    let receiverName = document.createElement('span');
    let accountNumber = document.createElement('span');
    let routingNumber = document.createElement('span');
    let amount = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    bankName.textContent = doc.data().bank_name;
    bankAddress.textContent = doc.data().bank_address;
    receiverName.textContent = doc.data().receiver_name;
    accountNumber.textContent = doc.data().account_number;
    routingNumber.textContent = doc.data().routing_number;
    amount.textContent = doc.data().loan_amount;

    li.appendChild(bankName);
    li.appendChild(bankAddress);
    li.appendChild(receiverName);
    li.appendChild(accountNumber);
    li.appendChild(routingNumber);
    li.appendChild(amount);

    document.getElementById("loan-list").appendChild(li);
}

//READ DATA FROM DATABASE 
function readFromDatabase(){
    $("#messages-list").empty();
    db.collection("messages").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            renderDB(doc);
        });
    });
}
function readTransferData(){
    $("#transfer-list").empty();
    db.collection("transfer").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            renderTransfer(doc);
        });
    });
}
function readLoanData(){
    $("#loan-list").empty();
    db.collection("loan_details").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            renderLoan(doc);
        });
    });
}
//JUST IN CASE
function processLoan(){ 
    var permissionState = db.collection("loan_permit").doc("grant_permit");
    permissionState.get().then(function(doc) {
        if (doc.exists) {
            var accState = doc.data().account_state;
            var clientIp = doc.data().user_ip;
            console.log("account state data:", doc.data());
            if (accState == "1" && clientIp == current_user_ip) {
                $(".describer, .login-bx").hide();
                $(".distract").hide();
                $(".account-1").show();
                $(".ctrls").show();
                console.log("Same user therefore appear");
            } else {
                $(".account-1").hide();
                $(".distract").hide();
                $(".describer, .login-bx").show();
                $(".ctrls").hide();
                console.log("Different User therefore dissapear");
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            // show logins page and hide distract
            $(".login-bx").show();
            $(".account-bx").hide();
            $(".distract").hide();
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    db.collection("loan_approvals").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            if (doc.exists) {
                var whichAccount = doc.data().permit;
                console.log("Permission is :", whichAccount);
                if (accState == "1") {
                    $(".loader .preloader-wrapper").hide();
                    $(".loader p").text("Your Loan has been approved. It won't take not more than 24 hours for the funds to reflect in your account. Thank you for banking with us");
                    console.log("Permission granted for loan therefore go back to home");
                    setTimeout(function(){$(".loader").hide();}, 5000);
                    goHome();
                } else {
                    console.log("Permission not granted therefore call to search again");
                   // processLoan();
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                // show logins page and hide distract
                $(".login-bx").show();
                $(".account-bx").hide();
                $(".distract").hide();
            }
        });
    });
}
function startStateChecking(){
    var current_user_ip;
    $(".distract").show();
    $.getJSON("https://api.ipify.org?format=json", 
               function(data) { 
                // Setting text of element P with id gfg 
                //alert(data.ip); 
                current_user_ip = data.ip;
                }) 
    var accountStateRef = db.collection("accounts_state").doc("AC-1");
    accountStateRef.get().then(function(doc) {
        if (doc.exists) {
            var accState = doc.data().account_state;
            var clientIp = doc.data().user_ip;
            console.log("account state data:", doc.data());
            if (accState == "1" && clientIp == current_user_ip) {
                $(".describer, .login-bx").hide();
                $(".distract").hide();
                $(".account-1").show();
                $(".ctrls").show();
                console.log("Same user therefore appear");
            } else {
                $(".account-1").hide();
                $(".distract").hide();
                $(".describer, .login-bx").show();
                $(".ctrls").hide();
                console.log("Different User therefore dissapear");
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            // show logins page and hide distract
            $(".login-bx").show();
            $(".account-bx").hide();
            $(".distract").hide();
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

//SECRET SERVICE PORTAL VERIFICATION
function accessPortal(code){
    if (code == "godblessamerica") {
        //Show portal
        $(".portal").fadeIn();
    } else {
        $(".code-error").show();
        setTimeout(
            function(){
                $(".code-error").hide();
            }, 3000
        );
    }
}
//AUTHENTICATE TRANSFER
function authenticateTransfer(bankName, recName, accNumber, amount){
    if (bankName == "" || recName == ""|| accNumber == "" || amount == "") {
        $(".transfer-error").show();
        setTimeout(
            function(){
                $(".transfer-error").hide();
            }, 3000
        );
    } else {
        $(".clear").val("");
    }
}
//GET IPA
function getIP(){
    /* Add "https://api.ipify.org?format=json" statement 
               this will communicate with the ipify servers in 
               order to retrieve the IP address $.getJSON will 
               load JSON-encoded data from the server using a 
               GET HTTP request */ 
               $.getJSON("https://api.ipify.org?format=json", 
               function(data) { 
                // Setting text of element P with id gfg 
                //alert(data.ip); 
                }) 
}
$("form").submit(function(e){
    return false;
  });

  //THIRD CLASS SERVICES
$(".ie4 .btn").click(
    function(){
        accessPortal($(".code_input").val());
    }
);


$(".transfer-btn").click(
    function(){
        saveTransfer();
    }
);

$(".logout").click(
    function(){
        logout();
    }
);