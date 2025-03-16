var modes = 0;
var loadAccount = 0;

$(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton();
});

function checkModes(num){
    if(num == 0){
        console.log("Game mode: "+ num);
    }
    if(num == 1){
        console.log("Game mode: "+ num);
    }
    if(num == 2){
        console.log("Game mode: "+ num);
    }
}

function openBankMode(){
    modes = 1;
    console.log('Mode changed to: ' + modes);
    checkModes()
    listenToAccountState(ACCOUNT);
    getAccountHolder(ACCOUNT);
    getAccountAddress(ACCOUNT);
    getAccountBalance(ACCOUNT);
    getMonitorData(ACCOUNT);
    $('.bank-mode').fadeIn();
    $('.percentage').css('right','0px');
    $('.percentage').css('left','0px');
    $('.percentage').css('margin','auto');
}
function closeBankMode(){
    modes = 0;
    console.log('Mode changed to: ' + modes);
    checkModes()
    $('.bank-mode').hide();
}

function openEdits(x){
    if (x == 1) {
    $('.edit-man').hide();
    $('.e1').fadeIn();
    }
    if (x == 2) {
        $('.edit-man').hide();
        $('.e2').fadeIn();
    }
    if (x == 3) {
        $('.edit-man').hide();
        $('.e3').fadeIn();
        }
}

function openRefresh(){
    $('.alerter').fadeIn();
    $('.transfer-alert').addClass('hide');
    $('.refresh-alert').removeClass('hide');
}
function closeRefresh(){
    $('.transfer-alert').addClass('hide');
    $('.refresh-alert').addClass('hide');
    $('.alerter').hide();
}

function openMessenger(){
    alert('Provide Domain Repository For Linkage. #%%BTCXCXX');
}
function ngo(){
    window.location.href = 'https://prosperityforkids.org/donate/control/';
}
