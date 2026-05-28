function findIndex(list, callback){
    for(var i = 0; i < list.length; i++){
        if(callback(list[i])){
            return i
        }

        return -1;

    }
}

function isValidOperation(operation) { // Funzione per validare un'operazione
    return operation && operation.description && parseFloat(operation.amount) > 0 && typeof OperationTypes[operation.type] !== 'undefined'; // Controlla se l'operazione esiste, se ha una descrizione, se un importo maggiore di 0 e se è un tipo valido
}

function getWallet() { // Funzione per ottenere il wallet dal localStorage o creare un nuovo wallet se non esiste

    const wallet = localStorage.getItem('wallet'); // Prova a prendere il wallet dal localStorage

    if(!wallet) { // Se non esiste, crea un nuovo wallet con bilancio 0 e nessuna operazione
        return {
            balance: 0,
            operations: []
        }
    }

    return JSON.parse(wallet); // Se esiste, restituisci il wallet convertito da JSON

}