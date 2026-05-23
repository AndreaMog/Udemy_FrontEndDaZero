(function() {

    var wallet;

    function addOperation(operation) {
        wallet.addOperation(operation);
    }

    function removeOperation() {

    }

    function findOperation() {

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