// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
var Verifier = artifacts.require('Verifier');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

contract('SolnSquareVerifier', accounts => {

    var verifier;
    var solnVerifier;
    describe('Verify the integrated Contract', function () {
        beforeEach(async function () { 
            verifier = await Verifier.new({from: accounts[0]});
            solnVerifier = await SolnSquareVerifier.new("RT", "RET", verifier.address, {from: accounts[0]});
        })

       it('Minting a Token', async function () { 
           // copied it from the generated proof.JSON file
            const cProof = {
                "proof": {
                  "a": [
                    "0x0f4b7c783514b6dfa8fc7951557d0c80e8b7a8211b6f8d3da884d90cc2315422",
                    "0x00f0b02ccf09de0254a2fa93b941f09923e73610a28ceb1bc1b0c7f2a25ef5a8"
                  ],
                  "a_p": [
                    "0x1b8a128808434e8e8512d140796f37329cc83ae81451c9282e039bfdc4e49b33",
                    "0x0fca63c339ac78daa22334aa9fb98d9a7128e81d26c153535c86f41ec7fee105"
                  ],
                  "b": [
                    [
                      "0x18bf118d403eaac54d40b664aa7c9c27b5c12580b6d274931f7274f4ce52ba47",
                      "0x118e99fa5ebc84110a5a0d66e83a3beedf305e349ef368db79a99b5d3b9321b4"
                    ],
                    [
                      "0x23a31f5589f75dd1f2873e7548bc3263c74a70712f4b0c3fc6cb736141cee347",
                      "0x1933d3c4fe89885429d3f0eba44505ec3cefeab171b5b67cefadc2af1ce4297f"
                    ]
                  ],
                  "b_p": [
                    "0x0a534cd52d206c3c7af1f7f0ff40b451746678cd41b50ee644b378d7e008aa96",
                    "0x22e30290837e909e771f3c17f8f2a0ee6ab02a675081f90700c5310abe700959"
                  ],
                  "c": [
                    "0x2e612218f83d2c36f48437b6dcee043efff1df74ba646208c2b848f06f89294e",
                    "0x28de46e22bda7d6ac667dc1a1a1081c94da1a365ac7804c8779ff22d194f86f3"
                  ],
                  "c_p": [
                    "0x07006ee01ea1966aa4d751bce30511aee0a4fde6a634563e59cb5f35e38ab6e7",
                    "0x14d5269a4eeba3c1405f85dd120a780faed7a82197cd69a38ff8de540f995f2e"
                  ],
                  "h": [
                    "0x2db0edc1e2e6ed2a2a2bc21fbe29c6afb8c5b290d85f0dbcb26496417ebef3ae",
                    "0x1d1c1aa92790944f14aa46c2a056e405b79c96f7e3757f1ff3b00a74fee43cc2"
                  ],
                  "k": [
                    "0x2e23bb5ca1716ff3ed70f35fc7b4b4bb2889b1437ba139db6235221562ebd517",
                    "0x2fd0b4a37db74dda4f913538da5fa4fc695d5c24b5128e126feb1c5f000b80b2"
                  ]
                },
                "inputs": [
                  "0x0000000000000000000000000000000000000000000000000000000000000009",
                  "0x0000000000000000000000000000000000000000000000000000000000000001"
                ]
              }
            var supply1 = await solnVerifier.totalSupply.call(); 
            assert.equal(supply1.toNumber(),0,  " Total Supply incorrect before mint"); 
            await solnVerifier.mintRET.call(accounts[1], 1, cProof.proof,  cProof.inputs, 
                {from: accounts[0]});
            
            /*try{
                await solnVerifier.mintRET.call(accounts[1], 1, cProof.proof,  cProof.inputs, {from: accounts[0]});
            }catch(error){
              console.log("minting failed")
            }
            finally{
                var supply2 = await solnVerifier.totalSupply.call();
                assert.equal(supply2.toNumber(),1, " Total Supply incorrect after mint");
            }*/

        })

    })
})