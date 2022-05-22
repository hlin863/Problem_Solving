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
 * Complete the 'getMax' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts STRING_ARRAY operations as parameter.
 */

function getMax(operations) {
    // Write your code here
    
    let stack = [];
    
    let maximum = [];
    
    for (let i = 0; i < operations.length; i++){
        // split the string into numbers by space
        let numbers = operations[i].split(' ');
        if (numbers.length == 2){
            if (numbers[0] == 1){
                stack.push(numbers[1]);
            }
        } else if (numbers.length == 1){
            if (numbers[0] == 2){
                stack.pop();
            } else if (numbers[0] == 3){
                maximum.push(getMaximumValue(stack));
            }
        }
    }

    // convert maximum to an array of ints
    for (let i = 0; i < maximum.length; i++){
        maximum[i] = parseInt(maximum[i]);
    }

    return maximum;
}

function getMaximumValue(stack){
    let result = 0;
    
    for (let i = 0; i < stack.length; i++){
        if (stack[i] > result){
            result = stack[i];
        }
    }
    
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let ops = [];

    for (let i = 0; i < n; i++) {
        const opsItem = readLine();
        ops.push(opsItem);
    }

    const res = getMax(ops);

    ws.write(res.join('\n') + '\n');

    ws.end();
}
