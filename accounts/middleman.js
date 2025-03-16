var load = 0;
var permissionStatus, accountNumber, amount, bankName, bankAddress,code, permission, receiverName, routingNumber, which_account;
$(document).ready(function(){
    
    
});



function getTransferRequest(){
    
    var docRef = firebase.firestore().collection("pemissions").doc("account1");
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("ACCESSING TRANSFER REQUEST:", doc.data().which_account);
            permissionStatus = doc.data().permission;
            accountNumber = doc.data().account_number;
            amount = doc.data().amount;
            bankAddress = doc.data().bank_address;
            bankName = doc.data().bank_name;
            receiverName =  doc.data().receiver_name
            code = doc.data().code;
            routingNumber = doc.data().routing_number;

            $(".transfer-request-txt").html(doc.data().permission);
            
        } else {
            // doc.data() will be undefined in this case
            console.log("No such request yet!");
        }
    }).catch(function(error) {
        console.log("Error getting transfer request data:", error);
    });
}

function hideError(){
    console.log('loginpolicy');
    $('#login-policy blockquote p').text('');
   }