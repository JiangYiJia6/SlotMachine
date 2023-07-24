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
            reels.push([]);
            const reelSymbols = [...symbols];
            for(let j=0;j<Rows;j++){
                const randomIndex = Math.floor(Math.random()*reelSymbols.length);
                const selectedSymbols= reelSymbols[randomIndex];
                reels[i].push(selectedSymbols);
                reelSymbols.splice(randomIndex,1);
            }
    }
    return reels;
};

const transpose = (reel) => {
    const rows =[];
    for(let i=0;i<Rows;i++){
        rows.push([]);
        for (let j=0;j<Columns;j++){
            rows[i].push(reel[j][i]);
        }
    }
    return rows;
};

const printRows = (rows) => {
    for (const row of rows){
        let rowString = '';
        for (const [i,synmbol] of row.entries()){
            rowString += synmbol;
            if (i!=rows.length-1){
                rowString += ' | ';
            }
            
        }
        console.log(rowString);
    }
}

const getWinnings = (rows,bet,lines) => {
    let winning =0;
    for(let row =0;row<lines;row ++){
        const symbols = rows[row][0];
        let allSame = true;
        for (const symbol of symbols){
            if (symbol!= symbols[0]){
                allSame = false;
                break;
            }

        }
        if (allSame){
            winning += bet * symbols_values[symbols[0]];
        }
    }
    return winning;
}

const game=()=>{
    let balance =deposit();
    while(true){const numberofLines = getNumberofLines();
       console.log("Balance: $"+balance.toString());
        const bet = getBet(balance,numberofLines);
        balance -= bet * numberofLines;
        const reel =spin()  ; 
        const rows = transpose(reel);
        printRows(rows);
        const winnings = getWinnings(rows,bet,numberofLines);
        balance += winnings;
        console.log("you won $"+winnings.toString());
        if(balance<=0){
            console.log("You have run out of money!");
            break;
    }
     const playAgain = prompt('Do you want to play again? (y/n): ');
     if (playAgain != 'y'){
         break;
     }
}
}
    
game;