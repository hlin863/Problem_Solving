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

	/* 
    
    class Node 
    	int data;
    	Node left;
    	Node right;
	*/
	public static void levelOrder(Node root) {
      
        // performs inorder traversal.
        Queue<Node> q = new LinkedList<Node>();

        q.add(root);

        while (!q.isEmpty()){

            Node temp = q.poll();

            System.out.print(temp.data + " ");

            if (temp.left != null){
                q.add(temp.left);
            }

            if (temp.right != null){
                q.add(temp.right);
            }

        }
      
    }

	public static Node insert(Node root, int data) {
