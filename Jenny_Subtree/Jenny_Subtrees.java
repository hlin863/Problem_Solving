import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.Set;

public class Jenny_Subtrees {

    // create a node subclass
    static class Node implements Comparable<Node> {

        private int data;
        // initialises the children of the node
        private List<Node> children = new ArrayList<>();

        public Node(int data) {
            this.data = data;
        }

        public void addChild(Node child) {
            children.add(child);
        }

        /* 
         * compareTo method for Node class
         * @param Node n2
         * @return int
         */
        public int compareTo(Node n2){
            return this.children.size() - n2.children.size();
        }

        /*
         * print method for Node class
         */
        public void print() {
            System.out.print(data + " ");
            for (Node child : children) {
                child.print();
            }
        }

    }

    static class Tree {

        private Map<Integer, Node> nodes;
        private int nEdge = 0; // initialises the tree size to 0

        // constructor
        public Tree(){
            nodes = new HashMap<>(); // initialises the nodes map
        }

        /*
         * add method for Tree class
         * @param int data
         */
        public void add(int data){
            // if the data is already contained in the tre structure
            if (nodes.containsKey(data)){
                return;
            }

            // create a new node
            Node node = new Node(data);
            nodes.put(data, node);
        }

        /*
         * addEdge method for Tree class
         * @param int node1
         * @param int node2
         */
        public void addEdge(int node1, int node2){
            // fetches node1
            Node n1 = nodes.get(node1);
            // validates n1
            if (n1 == null){
                n1 = new Node(node1);
                nodes.put(node1, n1);
            }

            // fetches node2
            Node n2 = nodes.get(node2);

            // validates n2
            if (n2 == null){
                n2 = new Node(node2);
                nodes.put(node2, n2);
            }

            // adds node2 to node1's children
            n1.addChild(n2);

            // adds node1 to node2's children
            n2.addChild(n1);

            this.nEdge++;
            
        }

        /*
         * count the number of subtrees
         * @param int radius
         * @return int count
         */
        public int countSubtrees(int radius){
            int count = 0;
            
            Set<Tree> tree_set = new HashSet<Tree>();

            for (int data : nodes.keySet()){
                // creates a new tree
                Tree tree = new Tree();

                tree.add(data); // creates a new subtree

                Node root = tree.nodes.get(data); // fetches the root node

                depth_first_search(radius, tree, root, new HashSet<>()); // performs a depth first search

                if (!isIsomorphic(tree_set, tree)){
                    tree_set.add(tree);
                    count++;
                }

            }

            return count;
        }

        public void depth_first_search(int range, Tree tree, Node node, Set<Integer> set){
            // if the node is null
            if (node == null){
                return;
            }

            // if there is no range
            if (range == 0){
                return;
            }

            set.add(node.data); // adds the node to the set

            Node current = nodes.get(node.data);

            // iterate through the children
            for (Node child : current.children){
                if (!set.contains(child.data)){
                    // adds unvisited children to the set
                    Node temp = new Node(child.data);
                    tree.addEdge(current.data, temp.data);
                    depth_first_search(range - 1, tree, child, set);
                }
            }

        }

        /* 
         * checks whether the tree is a subtree
         * @param Tree tree
         * @param Set<Tree> trees
         * @return boolean
         */
        public boolean isIsomorphic(Set<Tree> trees, Tree tree){
            for (Tree t : trees){
                if (isIsomorphic(t, tree)){
                    return true;
                }
            }

            return false;
        }

        public boolean isIsomorphic(Tree t1, Tree t2){
            // base case when both trees are null
            if (t1 == null && t2 == null){
                return true;
            }

            // if one of the trees is null
            if (t1 == null || t2 == null){
                return false;
            }

            // if trees have different sizes
            if (t1.nEdge != t2.nEdge){
                return false;
            }

            // if trees have different number of children
            if (t1.nodes.size() != t2.nodes.size()){
                return false;
            }

            // initialises the set of visited nodes
            List<Node> children1 = new LinkedList<>(t1.nodes.values());
            List<Node> children2 = new LinkedList<>(t2.nodes.values());

            // sorts the children
            Collections.sort(children1);
            Collections.sort(children2);

            // iterates through the children
            for (int i = 0; i < children1.size(); i++){
                Node child1 = children1.get(i);
                Node child2 = children2.get(i);

                // if the children are not isomorphic
                if (child1.children.size() != child2.children.size()){
                    return false;
                }

            }

            return true;
        }
        
    }
    
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);

        int n = in.nextInt();
        int r = in.nextInt();

        Tree tree = new Tree();

        for (int i = 0; i < n - 1; i++){
            int x = in.nextInt();
            int y = in.nextInt();

            System.out.println("input: " + x + " " + y);

            tree.addEdge(x, y);
        }

        System.out.println(tree.countSubtrees(r));

        in.close();
    }
    
}