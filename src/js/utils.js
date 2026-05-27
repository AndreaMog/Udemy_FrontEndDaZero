function findIndex(list, callback){
    for(var i = 0; i < list.length; i++){
        if(callback(list[i])){
            return i
        }

        return -1;

    }
}