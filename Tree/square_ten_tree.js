function processData(input) {
    //Enter your code here
    // split the input into an array by lines
    let inputArray = input.split("\n");
    
    inputArray = inputArray.map(function(x){
        return parseInt(x, 10);
    });
    
    inputArray = formatArray(inputArray);
    
    let resultArray = [];
    
    for (let i = 0; i < inputArray.length; i++){
        let exponentBase = Math.log10(inputArray[i][1] / (i + 1));
        let result = 0.5 * (exponentBase + 1);
        resultArray.push(result);
    }
    
    let result = resultArray[0];
    
    for (let i = 0; i < result + 1; i++){
        
        let resultString = "";
        for (let j = 0; j < i + 1; j++){
            resultString += (result + " ");
        }
        
        console.log(resultString);
        
    }
} 

function formatArray(arr){
    
    let result = [];
    
    for (let i = 0; i < arr.length; i+=2){
        
        result.push([arr[i], arr[i + 1]]);
        
    }
    
    return result;
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
