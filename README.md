# Exploring Blockchain Basics: An Overview of Merkle Trees and Their Usage

## What is a Merkle Tree?

Merkle Trees are a fundamental component of blockchain technology but they have been widely used in other fields of Computer Science for data verification and synchronization. They are essentially binary trees composed of hashes and their primary function is to verify the integrity of data, ensuring that the information remains unaltered and intact. In the structure of a Merkle tree, each non-leaf node is the hash of the values of its child nodes, effectively creating a chain of interconnected information.

![merkle-tree-non-leaf]()

On the other hand, the leaf nodes, which form the base of the tree, are hashes of the input data, serving as the primary source of information. This unique and highly efficient structure allows for the secure verification of the contents of large data structures.

!(merkle-tree-leaf-nodes-with-values)()

One of the key advantages of a Merkle Tree is that any change in a single element, regardless of how minor, results in a change in the root hash. This makes it possible to quickly and accurately detect any changes or alterations in the data.

![merkle-tree-different-trees]()

In essence, Merkle Trees play an indispensable role in maintaining the security and integrity of blockchain technology.

## Building a Merkle Tree

A Merkel Tree is built from the bottom up, and the process of constructing a Merkle Tree involves several crucial steps:

1. **Hash the input data**: Each piece of input data is hashed individually to create the leaf nodes of the Merkle tree.
2. **Pair up the hashes**: The hashes are then paired up. If there is an odd number of hashes, the last hash is duplicated.
3. **Hash the pairs**: Each pair of hashes is concatenated and then hashed again to create the parent node.
4. **Repeat**: Steps 2 and 3 are repeated until there is only one hash left, which becomes the root of the Merkle tree.
5. **Store the tree**: The tree is typically stored with the root node at the top and each layer of child nodes below it.

Remember, any change in the input data will result in a change in the root hash, allowing efficient and secure verification of large data structures.

In the example below we show how to create a Merkel Tree from a list of emails.

![Merkle-Tree-For-Emails]()

!!! note
    Notice that the value for the last leaf is duplicated because the example uses an odd number of inputs.

## Merkle Proofs

## Validation

## Wrapping up
