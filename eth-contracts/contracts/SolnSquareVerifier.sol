pragma solidity >=0.5.0;
pragma experimental ABIEncoderV2;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./ERC721Mintable.sol";
import "./verifier.sol";


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token {
    // TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
    Verifier verifierContract;

    constructor(string memory name, string memory symbol, address verifierAddress) 
        CustomERC721Token(name, symbol) public{
        verifierContract = Verifier(verifierAddress);
    }

    // TODO define a solutions struct that can hold an index & an address
    struct solution {
        uint256 tokenId;
        address to;

    }

    // TODO define an array of the above struct
    solution[] Solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes4 => solution) submittedSolutions;

    // TODO Create an event to emit when a solution is added
    event AddedToSolutions(address indexed to, uint256 indexed tokenId, bytes4 indexed key);

    // TODO Create a function to add the solutions to the array and emit the event
    function _addSolutions(address to, uint256 tokenId, bytes4 key)
        internal
    {
        solution memory sol = solution({tokenId : tokenId, to : to});
        submittedSolutions[key] = sol;
        Solutions.push(sol);
        emit AddedToSolutions(to, tokenId, key);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSupply
    function mintRET(address to, uint256 tokenId, Verifier.Proof memory proof, uint[2] memory input)
        public
        whenNotPaused
    {
        bytes4 key = bytes4(keccak256(abi.encodePacked(proof.a.X, proof.a_p.X, proof.b.X, proof.b_p.X ,
                                        proof.c.X,proof.c_p.X, proof.h.X, proof.k.X , input)));
        require(submittedSolutions[key].to == address(0), "Already used Proof");
        require(verifierContract.verifyTx(proof, input), "Proof incorrect");
        _addSolutions(to, tokenId, key);
        super.mint(to, tokenId);
    }
}


/*interface verifier {
    struct P_C {uint[2] c1; uint[2] c2;}
    struct Proof {uint[2] a; uint[2] b; P_C c; uint[2] d; uint[2] e; uint[2] f; uint[2] g; uint[2] h;}
    function verifyTx(Proof calldata proof, uint[2] calldata input) external view returns (bool r);
}*/























