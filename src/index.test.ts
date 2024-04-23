import { buildHashFunction } from "merkle-ts";
import { addLeavesToTree, createMerkleTree } from "./index";

describe("Merkle Tree", () => {
    it("Returns tree size with same size as input list", async () => {

        // Arrange
        const emails : string[] = [
            "email1@email.com",
            "email2@email.com",
            "email3@email.com"
        ];
    
        // Act
        const tree = await createMerkleTree(emails);

        // Assert
        expect(tree.size()).toBe(emails.length);
    });

    it("Returns tree depth of 2 for an input of 3 elements", async () => {

        // Arrange
        const emails: string[] = [
            "email1@email.com",
            "email2@email.com",
            "email3@email.com"
        ];

        // Act
        const tree = await createMerkleTree(emails);

        // Assert
        expect(tree.depth()).toBe(2);
    });

    it("Validates that leaf node exists in tree", async () => {

        // Arrange
        const emails: string[] = [
            "email1@email.com",
            "email2@email.com",
            "email3@email.com"
        ];
        const sha256 = buildHashFunction('sha-256');
        const leafToValidate = await sha256(Buffer.from(emails[0]));

        // Act
        const tree = await createMerkleTree(emails);
        const proof = tree.getProof(leafToValidate);
        
        // Assert

        expect(proof.isSome()).toBeTruthy();
    });

    it("Validates that leaf node does not exist in tree", async () => {

        // Arrange
        const emails: string[] = [
            "email1@email.com",
            "email2@email.com",
            "email3@email.com"
        ];

        const newEmail: string = "missing@email.com";

        const sha256 = buildHashFunction('sha-256');
        const leafToValidate = await sha256(Buffer.from(newEmail));

        // Act
        const tree = await createMerkleTree(emails);
        const proof = tree.getProof(leafToValidate);

        // Assert
        expect(proof.isNone()).toBeTruthy();
    });

    it("Validates that the proof is valid", async () => {

        // Arrange
        const emails: string[] = [
            "email1@email.com",
            "email2@email.com",
            "email3@email.com"
        ];

        const sha256 = buildHashFunction('sha-256');
        const leafToValidate = await sha256(Buffer.from(emails[0]));

        // Act
        const tree = await createMerkleTree(emails);
        const rootHash = tree.getRootHash();
        const proof = tree.getProof(leafToValidate);

        const isValidProof = await tree.validateProof(proof.some(), leafToValidate, rootHash);

        // Assert
        expect(proof.isSome()).toBeTruthy();
        expect(isValidProof).toBeTruthy();
    });

    it("Validates that rootHash changes when new leafs are added", async () => {

        // Arrange
        const emails: string[] = [
            "email1@email.com",
            "email2@email.com",
            "email3@email.com"
        ];

        const newEmail: string = "email4@email.com";

        // Act
        const tree1 = await createMerkleTree(emails);
        const rootHash1 = tree1.getRootHash();

        const tree2 = await addLeavesToTree(tree1, [newEmail]);
        const rootHash2 = tree2.getRootHash();

        // Assert
        expect(rootHash1 !== rootHash2).toBeTruthy();
    });

    it("Validates that the 3 emails provided exist in tree", async () => {

        // Arrange
        const emails: string[] = [
            "email1@email.com",
            "email2@email.com",
            "email3@email.com",
            "email4@email.com",
            "email5@email.com"
        ];

        const sha256 = buildHashFunction('sha-256');
        const leafToValidate1 = await sha256(Buffer.from(emails[0]));
        const leafToValidate2 = await sha256(Buffer.from(emails[1]));
        const leafToValidate3 = await sha256(Buffer.from(emails[2]));

        // Act
        const tree = await createMerkleTree(emails);
        const proof1 = tree.getProof(leafToValidate1);
        const proof2 = tree.getProof(leafToValidate2);
        const proof3 = tree.getProof(leafToValidate3);

        // Assert
        expect(proof1.isSome()).toBeTruthy();
        expect(proof2.isSome()).toBeTruthy();
        expect(proof3.isSome()).toBeTruthy();
    });
});