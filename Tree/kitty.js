class Tree{
    constructor(){
        this.root = null;
        this.children = [];
    }

    addNode(node){
        if(this.root == null){
            this.root = node;
        } else{
            this.children.push(node);
        }
    }

}

function displayTree(tree){
    if (tree.root != null){
        console.log(tree.root);
    }
    for (let i = 0; i < tree.children.length; i++){
        displayTree(tree.children[i]);
    }
}

function processData(input) {
    //Enter your code here
    let inputs = splitInputs(input);
    
    let graph = inputs[0];
    
    let combinations = inputs[1];
    
    for (let i = 0; i < combinations.length; i++){
        if (combinations[i].length == 0){
            console.log(0);
        } else {
            let distance = distanceFunction(combinations[i], graph);
            console.log(distance);
        }
    }

} 

function inputToArray(input){
    
    let inputArray = input.split(/[\n]/);
    
    return inputArray;
    
}

function elementToNumber(arr){
    
    let arrNumber = [];
    
    for (let i = 0; i < arr.length; i++){
        arrNumber.push(arr[i].split(/[ ]/));
    }
    
    for (let i = 0; i < arrNumber.length; i++){
        
        for (let j = 0; j < arrNumber[i].length; j++){
            arrNumber[i][j] = parseInt(arrNumber[i][j]);
        }
        
    }
    
    return arrNumber;
    
}

function createGraph(array){
    let graph = [];
    
    let index = 0;
    
    for (let i = 0; i < array.length; i++){
        if (array[i].length < 2){
            index = i - 1;
            break;
        } else {
            graph.push(array[i]);
        }
    }
    
    graph.push(index);
    
    return graph;
}

function splitInputs(input){
    
    let inputArray = inputToArray(input); 
    
    let inputArrayNumbers = elementToNumber(inputArray);

    let graph = createGraph(inputArrayNumbers);
    
    let inputs = [];
    
    let graph_index = graph[graph.length - 1];
    
    graph.pop();
    
    let combinations = [];
    
    for (let i = graph_index + 1; i < inputArrayNumbers.length; i+=2){
        combinations.push(combinationArray(inputArrayNumbers[i + 1]));
    }
    
    inputs.push(graph);
    
    inputs.push(combinations);
    
    return inputs;

}

function combinationArray(arr){

    let combinationArray = [];
    
    for (let i = 0; i < arr.length; i++){
        for (let j = i + 1; j < arr.length; j++){
            combinationArray.push([arr[i], arr[j]]);
        }
    }
    
    return combinationArray;

}

function distanceFunction(combinations, array){
    let distance = 0;
    for (let i = 0; i < combinations.length; i++){
        let tree = new Tree();
        tree = graphToTree(array, array[1], tree);
        
        distance += combinations[i][0] * combinations[i][1] * dist(combinations[i][0], combinations[i][1], tree);
    }
    
    distance = distance % (Math.pow(10, 9) + 7);
    
    return distance;
}

function dist(u, v, tree){
    
    // console.log("U: " + u + ", V: " + v);
    
    let uArr = [];
    
    let vArr = [];
    
    hasPath(tree, uArr, u);
        
    hasPath(tree, vArr, v);
    
    let validU = validateArray(uArr, tree);
    
    // console.log("U Array: " + validU);
    
    let validV = validateArray(vArr, tree);
    
    // console.log("V Array: " + validV);
    
    return validU.length - 1 + validV.length - 1;
    
}

function validateArray(arr, tree){
    
    let validArray = [];
    
    for (let i = 0; i < arr.length - 1; i++){
        
        if (isChildren(tree, arr[i], arr[i + 1])){
            validArray.push(arr[i]);
            validArray.push(arr[i + 1]);
        }
        
    }
    
    validArray = removeDuplications(validArray);
    
    return validArray;
}

function removeDuplications(arr){
    let noDuplications = [];
    
    for (let i = 0; i < arr.length; i++){
        
        let duplicate = false;
        
        for (let j = 0; j < noDuplications.length; j++){
            if (noDuplications[j] == arr[i]){
                duplicate = true;
            }
        }
        
        if (duplicate == false){
            noDuplications.push(arr[i]);
        }
        
    }
    
    return noDuplications;
}

function isChildren(tree, parent, children){
    if (tree == null){
        return false;
    } else {
        if (tree.root == parent){
            for (let i = 0; i < tree.children.length; i++){
                if (tree.children[i].root == children){
                    return true;
                }
            }
            
            return false;
        } else {
            let result = false;
            
            for (let i = 0; i < tree.children.length; i++){
                result = result || isChildren(tree.children[i], parent, children);
            }
            
            return result;
        }
        
    }
}

function hasPath(tree, arr, x){
    
    if (tree == null){
        return false;
    }
    
    arr.push(tree.root);
    
    if (tree.root == x){
        return true;
    }
    
    let childrenHasPath = [];
    
    for (let i = 0; i < tree.children.length; i++){
        childrenHasPath.push(hasPath(tree.children[i], arr, x));
    }
    
    let hasChildren = false;
    
    for (let i = 0; i < childrenHasPath.length; i++){
        hasChildren = hasChildren || true;
    }
    
    if (hasChildren){
        return true;
    }
    
    arr.pop();
    
    return false;
    
}

function displayTreeChildren(tree){
    let children = [];
    for (let i = 0; i < tree.children.length; i++){
        children.push(tree.children[i].root);
    }
    console.log(children);
}

function countNodes(graph, node){
    let count = 0;
    
    for (let i = 0; i < graph.length; i++){
        if (graph[i][0] == node[0]){
            count = count + 1;
        }
    }
    
    return count;
}

function graphToTree(graph, node, tree){
    
    let root = graph[1][0];
    
    tree.addNode(root);
    
    tree = rootIteration(root, graph, tree);
    
    return tree;

}

function rootIteration(root, graph, tree){
    
    for (let i = 1; i < graph.length; i++){
        if (graph[i][0] == root){
            
            let subtree = new Tree();
            
            subtree.addNode(graph[i][1]);
            
            tree.children.push(rootIteration(graph[i][1], graph, subtree));
        }
    }  
    
    return tree;
}

function getNode(n, graph){
    for (let i = 0; i < graph.length; i++){
        if (graph[i][0] == n){
            return i;
        }
    }
    
    return -1;
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
