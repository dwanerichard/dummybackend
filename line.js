const {getToken} = require('./token.js');

let line = []


function getLine(){
    return line;
}

function joinTheLine(customer){
    //console.log(customer);
    let tokenNo = getToken();
    customer.token = tokenNo; 
    line.push(customer);
    //console.log(customer);
    return tokenNo;
}

function serveCustomer(){
    if(line.length == 0) return 0;
    customer = line[0];
    line.splice(0,1);
    console.log("Served",customer);

    return line.length;
}

module.exports = {
    getLine,
    joinTheLine,
    serveCustomer
}