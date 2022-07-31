#{ 
#Driver Code Starts
#Initial Template for Python 3

 # } Driver Code Ends
#User function Template for python3

'''
class Node:
    def __init__(self,val):
        self.data=val
        self.left=None
        self.right=None
'''

import collections

class Solution:
    
    def __init__(self):
        self.sums = []
        self.sum_size = []
        
    def minSubtreeSumBST(self, target, root):
        #code here
        if root is None: 
            return []

        def dfs(node, sum_arr):
            if node is None: 
                return 0
            
            s = node.data + dfs(node.left, sum_arr) + dfs(node.right, sum_arr)
            sum_arr.append(node.data)
            
            print(sum_arr)
            
            self.sum_size.append(len(sum_arr))
            self.sums.append(sum(sum_arr))
            
            count[s] += 1
            
            return s
        
        sum_arr = []
        
        count = collections.Counter()
        dfs(root, sum_arr)
        
        if len(self.sums) == 0:
            return -1
        
        print(self.sums)
        print(self.sum_size)
        
        filtered_sums, filtered_sizes = zip(*((s, x) for s, x in zip(self.sums, self.sum_size) if s == target))
        
        
        filtered_sums = list(filtered_sums)
        filtered_sizes = list(filtered_sizes)
        
        
        two_dimensional_list = [list(a) for a in zip(filtered_sums, filtered_sizes)]
        
        
        return min(e for e in two_dimensional_list if e[1])[1]

#{ 
#Driver Code Starts.

#Initial Template for Python 3
from collections import defaultdict
from collections import deque
from sys import stdin, stdout
from math import inf
# Tree Node
class Node:
    def __init__(self, val):
        self.right = None
        self.data = val
        self.left = None

# Function to Build Tree   
def buildTree(s):
    #Corner Case
    if(len(s)==0 or s[0]=="N"):           
        return None
        
    # Creating list of strings from input 
    # string after spliting by space
    ip=list(map(str,s.split()))
    
    # Create the root of the tree
    root=Node(int(ip[0]))                     
    size=0
    q=deque()
    
    # Push the root to the queue
    q.append(root)                            
    size=size+1 
    
    # Starting from the second element
    i=1                                       
    while(size>0 and i<len(ip)):
        # Get and remove the front of the queue
        currNode=q[0]
        q.popleft()
        size=size-1
        
        # Get the current node's value from the string
        currVal=ip[i]
        
        # If the left child is not null
        if(currVal!="N"):
            
            # Create the left child for the current node
            currNode.left=Node(int(currVal))
            
            # Push it to the queue
            q.append(currNode.left)
            size=size+1
        # For the right child
        i=i+1
        if(i>=len(ip)):
            break
        currVal=ip[i]
        
        # If the right child is not null
        if(currVal!="N"):
            
            # Create the right child for the current node
            currNode.right=Node(int(currVal))
            
            # Push it to the queue
            q.append(currNode.right)
            size=size+1
        i=i+1
    return root

if __name__ == '__main__':
    test_cases = int(input())
    for _ in range (test_cases):
        target = int(input())
        N = input()
        root = buildTree(N)
        res = Solution().minSubtreeSumBST(target, root)
        print(res)
#} Driver Code Ends