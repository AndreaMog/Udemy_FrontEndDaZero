(function() {
    var wallet;
    function addOperation(){

    }
    function removeOperation() {

    }
    function getBalance(){
        return wallet.getBalance();
    }
    function getOperations(){
        return wallet.getOperations();
    }
    document.addEventListener('DOMContentLoaded', function(){
        wallet = new Wallet();
    });
})();