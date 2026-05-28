(function(context) {

    let wallet;

    context.addOperation = function(operation) {
        try {
            wallet.addOperation(operation);
        } catch(e){
            console.error(e);
        }
        
    };

    context.removeOperation = function(id) {

        try {
            wallet.removeOperation(id);
        } catch(e){ // La variabile e sta per error
            console.error(e);
        }
        
    }

    context.findOperation = function(val) {
        return wallet.findOperation(val);
    }

    context.getBalance = function(){
        return wallet.getBalance();
    }

    context.getOperations = function(){
        return wallet.getOperations();
    }

    document.addEventListener('DOMContentLoaded', function(){
        wallet = new Wallet();
    });

})(window);