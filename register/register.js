$(document).ready(function(){
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

    $("#regFormDIV form").submit(function(e){
        console.log('Default prevented');
        e.preventDefault();
    });
    clearErrors();
});

function validateForm(){
    var firstName,lastName,password,email,address;
    firstName = $('#first_name').val();
    lastName = $('#last_name').val();
    password = $('#password').val();
    email = $('#email').val();
    address = $('#address').val();
    
    if (firstName == '') {
        $('#firstNameField .errorTxt').text('Enter your legal first name.');
    }
    if (lastName == '') {
        $('#lastNameField .errorTxt').text('Enter your legal last name.');
    }
    if (password == '') {
        $('#passwordField .errorTxt').text('Your password is less than 6 characters or blank.');
    }
    if (email == '') {
        $('#emailField .errorTxt').text('Your email is incorrect. Enter your personal email address');
    }
    if (address == '') {
        $('#emailField .errorTxt').text('Your email is incorrect. Enter your personal email address');
    }

    if (firstName != '' && lastName != '' && password != ''&& email != ''&&address != '') {
        //SAVE AND CREATE ACCOUNT
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          console.log('USER HAS BEEN CREATED CRED: '+ user);
          //SEND TO ADMINISTRATOR FOR APPROVAL
          //sendToBankManager(firstName,lastName,password,email,address,user);
            getCurrentlyRegisteredUser(firstName,lastName,password,email,address);
          // ...
          $('.reg_bx .btn').addClass('hide');
          $('.reg_bx .preloader-wrapper').removeClass('hide');
          //$('.reg_success').removeClass('hide');
          setTimeout(
              function(){
                //window.location.replace("https://mbfbanking.com/accounts/"); 
                console.log('next phase##');
                setTimeout();
              },6000
          );
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
    }else{
        console.log('Blanks');
        $('#addressField .errorTxt').text('All Fields are required. Please Enter with your information');
    }
}
function clearErrors(){
    
    $('#regFormDIV .input-field').click(
        function(){
            $('.errorTxt').text('');
        }
    );
}
function sendToBankManager(fName,lName,pword,email,address,authID){
    // Add a new document in collection "cities"
    firebase.firestore().collection("BANKMANAGER").add({
        account_holder: fName +" "+ lName,
        account_balance: "$0.00",
        account_address: address,
        account_permission_transfer: 0,
        account_status: 1,
        transfer_records: 0,
        allow_me: 1,
        account_id: authID,
        doc_id: '',
        timestamp_registration: firebase.firestore.FieldValue.serverTimestamp(), 
        which_account: 'account33'
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        //UPDATE DOC ID WITH ITS ID
        firebase.firestore().collection("BANKMANAGER").doc(docRef.id).update({
            doc_id: docRef.id
        })
        .then(() => {
            console.log("Document:  "+ docRef.id+" successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating docref document: ", error);
        });
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}
function getCurrentlyRegisteredUser(fName,lName,pword,email,address){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          console.log('User is signed in with this ID: '+ uid);
          sendToBankManager(fName,lName,pword,email,address,uid);

          setTimeout(
              function(){
                
              },5000
          );
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
}


