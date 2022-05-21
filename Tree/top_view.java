import java.util.*;
import java.io.*;

class Node {
    Node left;
    Node right;
    int data;
    
    Node(int data) {
        this.data = data;
        left = null;
        right = null;
    }
}

class Solution {
    
    static class QueueNode{
        Node node;
        int level;
        public QueueNode(Node node, int level){
            this.node = node;
            this.level = level;
        }
    }

	/* 
    
    class Node 
    	int data;
    	Node left;
    	Node right;
	*/
	public static void topView(Node root) {
      
        Queue<QueueNode> queue = new LinkedList<QueueNode>();
        
        TreeMap<Integer, Integer> map = new TreeMap<Integer, Integer>();
        
        queue.add(new QueueNode(root, 0));
        
        while (!queue.isEmpty()){
            QueueNode temp = queue.poll();
            
            if (!map.containsKey(temp.level)){
                map.put(temp.level, temp.node.data);
            }
            
            if (temp.node.left != null){
                queue.add(new QueueNode(temp.node.left, temp.level - 1));
            }
            
            if (temp.node.right != null){
                queue.add(new QueueNode(temp.node.right, temp.level + 1));
            }
        }
        
        for (Integer value : map.values()) {
            System.out.print(value + " ");
        }
      
    }

	public static Node insert(Node root, int data) {
