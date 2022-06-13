function processData(input) {
    //Enter your code here
    
    // formats the input string into array format
    let formattedInput = formatInput(input);
    
    // console.log(formattedInput);
    
    // extracts the two numbers N and M where N represents the number of elements in the array and M represents the number of queries. 
    let N = parseInt(formattedInput[0][0]); 
    let M = parseInt(formattedInput[0][1]);
    
    // console.log("N: " + N);
    // console.log("M: " + M);
    
    let inputArray = formattedInput[1];
    
    for (let k = 2; k < formattedInput.length; k++){
        
        let operationType = parseInt(formattedInput[k][0]);
        
        let i = formattedInput[k][1];
        // console.log("I: " + i);
        let j = formattedInput[k][2];
        // console.log("J: " + j);
        
        switch(operationType){
            case 1:
                // type 1 queries
                
                // perform the type 1 query on the input array.
                inputArray = typeOneQuery(i, j, inputArray);
                
                break;
            case 2:
                // type 2 queries
                
                // perform the type 2 query on the input array.
                inputArray = typeTwoQuery(i, j, inputArray);
                
                break;
        }
        
    }
    
    console.log(Math.abs(inputArray[0] - inputArray[N - 1]));
    
    let outputString = "";
    
    for (let k = 0; k < inputArray.length; k++){
        outputString += (inputArray[k] + " ");
    }
    console.log(outputString);
}

function typeOneQuery(i, j, formattedInput){
    let resultArray = [];
    
    const firstPart = formattedInput.slice(0, i - 1);
    
    const secondPart = formattedInput.slice(i - 1, j);
    
    const thirdPart = formattedInput.slice(j, formattedInput.length);
    
    resultArray = resultArray.concat(secondPart);
    
    let remainingPart = firstPart.concat(thirdPart);
    
    resultArray = resultArray.concat(remainingPart);
    
    return resultArray;
    
    // resultArray.concat(formattedInput.slice(0, i));
    
    // console.log("1st concat: " + resultArray);
    
    // resultArray.concat(formattedInput.slice(i, j));
    
    // console.log("2nd concat: " + resultArray);
    
    // resultArray.concat(formattedInput.slice(j, formattedInput.length));
    
    // console.log("3rd concat: " + resultArray);
    
    return formattedInput;
}

function typeTwoQuery(i, j, formattedInput){
    let resultArray = [];
    
    const firstPart = formattedInput.slice(0, i - 1);
    
    const secondPart = formattedInput.slice(i - 1, j);
    
    const thirdPart = formattedInput.slice(j, formattedInput.length);
    
    let remainingPart = firstPart.concat(thirdPart);
    
    resultArray = resultArray.concat(remainingPart);
    
    resultArray = resultArray.concat(secondPart);
    
    return resultArray;
    
    // let resultArray = [];
    
    // for (let k = 0; k < formattedInput.length; k++){
    //     if (k < i - 1 || k >= j){
    //         resultArray.push(formattedInput[k]);
    //     }
    // }
    
    // for (let k = i - 1; k < j; k++){
    //     resultArray.push(formattedInput[k]);
    // }
    
    // return resultArray;
}

function formatInput(input){
    let formattedInput = input.split("\n");
    
    for (let i = 0; i < formattedInput.length; i++){
        formattedInput[i] = formattedInput[i].split(" ").map(numStr=>parseInt(numStr)); 
    }
    
    return formattedInput;
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
