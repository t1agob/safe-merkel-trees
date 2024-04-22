import { MerkleTree, MerkleTreeOptions, buildHashFunction } from "merkle-ts";

export async function createMerkleTree(elements: string[]): Promise<MerkleTree> {
    
    // Define the options for the Merkle tree
    const treeOptions: MerkleTreeOptions = {
        doubleHash: false,
        engine: "sha-256",
        sort: true,
    };

    // Create empty Merkle tree
    const tree = new MerkleTree(treeOptions);


    const buffer: Buffer[] = elements.map((e) => Buffer.from(e));

    // Add elements to the tree
    await tree.addLeaves(true, ...buffer);

    return tree; 
}

export async function addLeavesToTree(tree: MerkleTree, elements: string[]): Promise<MerkleTree> {
    const sha256 = buildHashFunction('sha-256');
    const buffer: Buffer[] = await Promise.all(elements.map(async (e) => await sha256(Buffer.from(e))));

    // Add elements to the tree
    await tree.addLeaves(false, ...buffer);

    return tree;
}