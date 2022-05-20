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
	public static void topView(Node root) {
        ArrayList<ArrayList<Node>> a = new ArrayList<>();

        int numberOfLevels = findNumberOfLevels(root); // finds the number of levels in the tree

        System.out.println("Number of levels: " + numberOfLevels);

        for (int i = 0; i < numberOfLevels; i++) {
            a.add(new ArrayList<Node>()); // added a placeholder node to the arraylist
        }

        a = topDownView(root, a, numberOfLevels); // calls the topDownView method

    }

    public static ArrayList<ArrayList<Node>> topDownView(Node root, ArrayList<Node> a, int numberOfLevels) {
        if (root == null) {
            return a;
        }

        // TO-DO write a topdown approach method to change the tree structure into a 2D arrayList. 

        a = topDownView(root.left, a, numberOfLevels); // calls the topDownView method on the left child
        a = topDownView(root.right, a, numberOfLevels); // calls the topDownView method on the right child

        return a;
    }

    public static int findNumberOfLevels(Node root){
        // function to find the number of levels in the tree;
        if (root == null) {
            return 0;
        } else {
            if (findNumberOfLevels(root.left) > findNumberOfLevels(root.right)) {
                return findNumberOfLevels(root.left) + 1;
            } else {
                return findNumberOfLevels(root.right) + 1;
            }
        }

    }


	public static Node insert(Node root, int data) {
        if(root == null) {
            return new Node(data);
        } else {
            Node cur;
            if(data <= root.data) {
                cur = insert(root.left, data);
                root.left = cur;
            } else {
                cur = insert(root.right, data);
                root.right = cur;
            }
            return root;
        }
    }

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int t = scan.nextInt();
        Node root = null;
        while(t-- > 0) {
            int data = scan.nextInt();
            root = insert(root, data);
        }
        scan.close();
        topView(root);
    }	
}
