#!/bin/python3

from collections import deque
import math
import os
import random
import re
import sys

#
# Complete the 'swapNodes' function below.
#
# The function is expected to return a 2D_INTEGER_ARRAY.
# The function accepts following parameters:
#  1. 2D_INTEGER_ARRAY indexes
#  2. INTEGER_ARRAY queries
#

class Node:
    def __init__(self, d):
        self.data = d

def createTree(indexes):
    # use the indexes to construct a new tree.
    # node function converts value into a node unless the value is -1.
    nodeFunction = lambda x : None if x == -1 else Node(x)

    childrenNodes = [list(map(nodeFunction, x)) for x in indexes]

    nodes = {node.data: node for node in filter(None, sum(childrenNodes, []))}

    nodes[1] = Node(1)

    for id, childNode in enumerate(childrenNodes):
        nodes[id + 1].left = childNode[0]
        nodes[id + 1].right = childNode[1]

    return nodes[1]   

def inOrderTraversal(root):
    stack = []

    currentNode = root

    while stack or currentNode:
        if currentNode:
            stack.append(currentNode)
            currentNode = currentNode.left
        else:
            currentNode = stack.pop()
            yield currentNode.data
            currentNode = currentNode.right

def swapNodes(indexes, queries):
    # Write your code here
    root = createTree(indexes)

    for q in queries:
        h = 1

        queueElement = deque([root])

        while queueElement:
            for qIndex in range(len(queueElement)):
                queueNode = queueElement.popleft()
                if h % q == 0:

                    queueNode.left, queueNode.right = queueNode.right, queueNode.left

                queueElement += filter(None, (queueNode.left, queueNode.right))
            
            h += 1

        yield inOrderTraversal(root)

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    n = int(input().strip())

    indexes = []

    for _ in range(n):
        indexes.append(list(map(int, input().rstrip().split())))

    queries_count = int(input().strip())

    queries = []

    for _ in range(queries_count):
        queries_item = int(input().strip())
        queries.append(queries_item)

    result = swapNodes(indexes, queries)

    fptr.write('\n'.join([' '.join(map(str, x)) for x in result]))
    fptr.write('\n')

    fptr.close()
