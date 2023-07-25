

const positive = function sum(a,b){
    total = a+b;
    console.log('Total Sum: '+total);
}

const negative = function subtract(a,b){
    total = a-b;
    console.log('Total Subtract: '+total);
}

module.exports = {
    positive,
    negative
}