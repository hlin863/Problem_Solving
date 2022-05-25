'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'waiter' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY number
 *  2. INTEGER q
 */

function waiter(number, q) {
    // Write your code here
    
    let answers = [];
    
    let primes = [2,3,5,7,11,13];
    
    let A = [];
    
    let B = [];
    
    for (let i = 0; i < primes.length; i++){
        let AB = divisible(number, A, B, primes[i]);
        
        A = AB[0];
        B = AB[1];
        
        answers = moveAnswers(answers, B);
        
        number = A;
    }
    
    return answers;

}

function moveAnswers(answer, arr){
    for (let i = 0; i < arr.length; i++){
        answer.push(arr[i]);
    }
    return answer;
}

function divisible(list, A, B, prime){
    for (let i = 0; i < list.length; i++){
        if (list[i] % prime == 0){
            B.push(list[i]);
        } else {
            A.push(list[i]);
        }
    }
    
    return [A, B];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const q = parseInt(firstMultipleInput[1], 10);

    const number = readLine().replace(/\s+$/g, '').split(' ').map(numberTemp => parseInt(numberTemp, 10));

    const result = waiter(number, q);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
