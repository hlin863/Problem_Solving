function processData(input) {
    //Enter your code here
    var arr_rows = input.split("\n");
    
    for (let i = 0; i < arr_rows.length; i++){
        arr_rows[i] = arr_rows[i].split(/\s+/);
    }
    
    // intialises an empty list.
    let instructionsList = [];
    
    // intialises an empty string.
    let S = "";
    
    let k;
    
    for (let i = 1; i < arr_rows.length; i++){
        let instructionType = parseInt(arr_rows[i][0]);
        
        switch(instructionType){
            case 1:
            
                S = append(S, arr_rows[i][1]);
                
                break;
                
            case 2:
            
                k = parseInt(arr_rows[i][1]);
                
                let lastK = getLastKCharacters(S, k);
                
                arr_rows[i][1] = lastK;
                
                S = removeLastKCharacters(S, k);
            
                break;
            
            case 3:
                
                k = parseInt(arr_rows[i][1]) - 1;
                
                arr_rows[i][0] = k;
                
                displayKthCharacter(S, k);
                
                break;
            case 4:
                
                S = reverseOperation(S, instructionsList);
                
                // resets the instruction list afterwards.
                instructionList = removeLastInstruction(instructionsList);
            
                break;
        }
        
        instructionsList.push(arr_rows[i]);
        
    }
    
    console.log("a");
}

function append(S, w){
    S += w;
    return S;
}

function reverseAppend(S, w){
    S -= w;
    return S;
}

function displayKthCharacter(S, k){
    
    if (k >= 0 && k < S.length){
        console.log(S[k]);
    }
    
}

function removeLastKCharacters(S, k){
    let sRemoved = [];
    
    for (let i = 0; i < S.length - k; i++){
        sRemoved.push(S[i]);
    }
    
    return sRemoved;
}

// reverses the removeLastKCharacters function
function addLastKCharacters(S, w){
    return S + w;
}

function getLastKCharacters(S, k){
    let lastK = [];
    
    for (let i = S.length - k; i < S.length; i++){
        lastK.push(S[i]);
    }
    
    return lastK;
}

function removeLastInstruction(instructionsList){
    let result = [];
    
    for (let i = 0; i < instructionsList.length - 1; i++){
        result.push(instructionsList[i]);
    }
    
    return result;
}

function reverseOperation(S, instructionsList){
    
    let i = instructionsList.length - 1;
    
    let instructionType = parseInt(instructionsList[i][0]);
        
    switch (instructionType){
        case 1:
                
            S = reverseAppend(S, instructionsList[i][1]);
                
            break;
                
        case 2:
            
            S = addLastKCharacters(S, instructionsList[i][1]);
            
            break;
            
        case 3:
            break;
    }
    
    
    return S;
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
