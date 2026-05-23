function getWallet() {

    var wallet = localStorage.getItem('wallet'); // Prova a prendere il wallet dal localStorage

    if(!wallet) { // Se non esiste, crea un nuovo wallet con bilancio 0 e nessuna operazione
        return {
            balance: 0,
            operations: []
        }
    }

    return JSON.parse(wallet); // Se esiste, restituisci il wallet convertito da JSON

}

function Wallet(){

    var balance = 0;
    var operations = []; 

    // Funzione privata di inizializzazione del wallet, che prende i dati dal localStorage o crea un nuovo wallet se non esiste
    function init() {
        var wallet = getWallet(); // Chiama la funzione sopra e prende i dati (nuovi o salvati)
        balance = wallet.balance; // Imposta il bilancio iniziale del wallet
        operations = wallet.operations; // Imposta le operazioni iniziali
    }

    // Funzioni pubbliche per gestire le operazioni e il bilancio del wallet
    this.addOperation = function(){
        
    }

    this.removeOperation = function() {

    }

    this.findOperation = function() {

    }

    this.getBalance = function(){
        return balance;
    }

    this.getOperations = function(){
        return operations;
    }

    // Funzioni invocate che crea una nuova istanza del nostro portafoglio, e inizializza i dati del wallet (bilancio e operazioni) con quelli salvati nel localStorage o con quelli di default se non esistono
    init(); // Inizializza il wallet quando viene creato

}