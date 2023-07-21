const prompt = require('prompt-sync')();
const Rows  =3;
const Columns = 3;
const symbols_count = {
    "A":2,
    "B":4,
    "C":6,
    "D":8,
}
const symbols_values ={
    "A":5,
    "B":4,
    "C":3,
    "D":2,
}



const deposit =()=>{
    while(true){
    const depositAmount = prompt('Enter the amount you want to deposit: ');
    const numberDepositAount = parseFloat(depositAmount);
    if(isNaN(numberDepositAount)||numberDepositAount<=0){
            console.log('Invalid deposit amount,try again');
        }else{
            return numberDepositAount;
        }
    }
};

const getNumberofLines =()=>{
    while(true){
        const Lines = prompt('Enter the number of lines to bet on(1-3): ');
        const numberofLines = parseFloat(Lines);
        if(isNaN(numberofLines)||numberofLines<=0||numberofLines>3){
                console.log('Invalid number of lines,try again');
            }else{
                return numberofLines;
            }
        }
}

const getBet =(balance,lines)=>{
    while(true){
        const bet = prompt('Enter the bet per line: ');
        const numberbet = parseFloat(bet);
        if(isNaN(numberbet )||numberbet <=0||numberbet >(balance/lines)){
                console.log('Invalid number of bet,try again');
            }else{
                return numberbet ;
            }
        }
}

const spin =()=>{
    const symbols=[];
    for(const[symbol,count] of Object.entries(symbols_count)){
        for(i=0;i<count;i++){
            symbols.push(symbol);
        }
        }
        const reels =[[],[],[]];
        for(let i=0;i<Columns;i++){
            const reelSymbols = [...symbols];
            for(let j=0;j<Rows;j++){
                const randomIndex = Math.floor(Math.random()*reelSymbols.length);
                const selectedSymbols= reelSymbols[randomIndex];
                reels[i].push(selectedSymbols);
                reelSymbols.splice(randomIndex,1);
            }
    }
    return reels;
}


const reel =spin()  ; 
console.log(reel);
let balance =deposit();
const numberofLines = getNumberofLines();
const bet = getBet(balance,numberofLines);
