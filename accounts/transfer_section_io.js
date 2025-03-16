function WIRE_TRANSFER_REQUEST(){
     //--------GET ALL TRANSFER HISTORY 
     var receiverName = $('#receiver_name_input').val().toLowerCase();
     var bankName = $('#bank_name_input').val().toLowerCase();
     var bankNumber = $('#bank_number_input').val();
     var bankRouting = $('#bank_number_input').val().toLowerCase();
     var bankAddress = $('#bank_address_input').val().toLowerCase();
     var bankIdentifier = $('#bank_identifier_input').val().toLowerCase();
     var amount = $('#bank_amount').val();
     var purpose = $('#purposeOfTransfer_input').val().toLowerCase();
    firebase.firestore().collection("BANKTRANSFERPERMIT").doc(user_account).set({
        permission: 1,
        which_account: user_account,
        bank_name: bankName,
        bank_address: bankAddress,
        receiver_name: receiverName,
        account_number: bankNumber,
        routing_number: bankRouting,
        bank_identifier_code: bankIdentifier,
        purpose_for_transfer: purpose,
        amount: amount,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function(docRef) {
        $(".menu_send_section .progress").hide();
        console.log("CLIENT REQUESTED TRANSFER PERMISSION--G22222");
         //UPDATED GODVERSION 0:01
         // $('.coders').removeClass('hide');
        // BANKTRANSFERPERMIT_LISTENER();
        transferChecker();
        $('.bank_information_bx').hide();
        $('#transfer_funds_btn').show();
            $('.loaderBX').show(); 
            setTimeout(() => {
                $('.loaderBX').hide(); 
                $('.confirm_this_transfer_bx').removeClass('hide');
                // SHOW CONFIRMATION PAGE
                SHOW_CONFIRM_TRANSACTION();

            }, 5200);

        
      })
      .catch(function(error) {
        console.error("CLIENT REQUESTED TRANSFER PERMISSION =  FAILED BECAUSE: "+ error);
        $('.distract').hide();
        $('.transfer-ui').hide();
        $('#transfer_funds_btn').show();

      });
}


function check_all_inputs(x){
    
    var receiverName = $('#receiver_name_input').val().toLowerCase();
    var bankName = $('#bank_name_input').val().toLowerCase();
    var bankNumber = $('#bank_number_input').val().toLowerCase();

    var bankAddress = $('#bank_address_input').val().toLowerCase();
    var bankIdentifier = $('#bank_identifier_input').val().toLowerCase();
    var amount = $('#bank_amount').val();
    var purpose = $('#purposeOfTransfer_input').val().toLowerCase();

    if (x == 0) {
        if (receiverName != '' &&  bankNumber != '' &&  purpose != '') {
            // MOVE TO NEXT --- 
            $('.receiver_information_bx').hide();
            $('.wire_money_continue_btn').hide();
            setTimeout(() => {
                $('.loaderBX').removeClass('hide');
            }, 1500);
            setTimeout(() => {
                $('.loaderBX').hide(); 
                $('.bank_information_bx').removeClass('hide'); 
            }, 3500);
        }else{
            if (receiverName == '') {
                $('#e_receiverName').text('Enter the full name of the receiver');
                console.log('nun');
                setTimeout(() => {
                    $('.errorBX .e_txt').text('');
                }, 9999);
            }
    
            if (bankNumber == '') {
                $('#e_bankNumber').text('Enter the bank number of the receipient account');
                console.log('nun');
                setTimeout(() => {
                    $('.errorBX .e_txt').text('');
                }, 9999);
            }
        }
    
    }

   
    if (x == 1) {
        if (bankName != '' && bankAddress != '' 
        && bankIdentifier != '' && amount != '') {
            // SEND ALL TO DB AND CLOSE
            //  
            WIRE_TRANSFER_REQUEST();
            
        }else{
         if (bankName == '') {
             $('#e_bankName').text('Enter the bank name of the receipient account');
             console.log('error_here');
             setTimeout(() => {
                 $('.errorBX .e_txt').text('');
             }, 9999);
         }
     
         if (bankAddress == '') {
             $('#e_bankAddress').text('Enter the bank address of the receipient account');
             console.log('error_here');
             setTimeout(() => {
                 $('.errorBX .e_txt').text('');
             }, 9999);
         }

         if (bankIdentifier == '') {
            $('#e_bankIdentifier').text('Enter the bank identifier of the receipient bank');
            console.log('error_here');
            setTimeout(() => {
                $('.errorBX .e_txt').text('');
            }, 9999);
         }

         if (amount == '') {
            $('#e_amount').text('Enter amount here');
            console.log('error_here');
            setTimeout(() => {
                $('.errorBX .e_txt').text('');
            }, 9999);
         }
        }
    }
    
}

function SHOW_CONFIRM_TRANSACTION(){
    var receiverName = $('#receiver_name_input').val().toLowerCase();
    var bankName = $('#bank_name_input').val().toLowerCase();
    var bankNumber = $('#bank_number_input').val();
    var routingNumber = $('#bank_routing_input').val();
    // var routingNumber   = $('#bank_address_input').val().toLowerCase();

    var bankAddress = $('#bank_address_input').val().toLowerCase();
    var amount = $('#bank_amount').val();

    $('#icon_receiver_name').text(receiverName);
    $('#icon_accountNumber').text(bankNumber);

    $('#icon_bank').text(bankName);
    $('#icon_location').text(bankAddress);

    // $('#icon_bank').text(bankName);
    $('#icon_amount').text(amount); 

}

function CANCEL_TRANSFER(){
    $('.confirm_this_transfer_bx').addClass('hide');
    $('.loaderBX').show(); 

    setTimeout(() => {
        $('.receiver_information_bx').removeClass('hide');
        $('.wire_money_continue_btn').show(); 
        $('.loaderBX').hide(); 

    }, 5200);
}
function CONFIRM_TRANSFER(){
    $('.confirm_this_transfer_bx').addClass('hide');
    $('.loaderBX').show(); 
    transferChecker();
}

function close_transfer_section(){
    $('.transfer_card').addClass('hide');

    setTimeout(() => {
    $('.SEND_CARD_BX').hide();
    }, 2500);
}

function open_transfer_section(){
    $('.transfer_card').removeClass('hide');

  
}


// JULY 2023 --9TH not done
function WHO_ARE_YOU(){

}