var CustomERC721Token = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const NUM_TOKENS = 10;

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new("Real Estate Tokens", "RET", {from: account_one});

            // TODO: mint multiple tokens
            for(let i=0; i< NUM_TOKENS; i++){
                await this.contract.mint(accounts[(i%2)+1], i+1,{from: account_one});
            }
        })

        it('should return total supply', async function () { 
            let supply = await this.contract.totalSupply.call();
            assert.equal(supply, NUM_TOKENS, " Total Supply incorrect");
            
        })

        it('should get token balance', async function () { 
            let balance= await this.contract.balanceOf(accounts[1]);
            assert.equal(balance, NUM_TOKENS/2, "Balance incorrect");
            balance= await this.contract.balanceOf(accounts[2]);
            assert.equal(balance, NUM_TOKENS/2, "Balance incorrect");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            baseuri="https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
            for(let i=0;i<NUM_TOKENS; i++){
                let uri= await this.contract.gettokenURI(i+1);
                assert.equal(uri, baseuri.concat((i+1).toString()), "Incorrect uri");
            }

        })

        it('should transfer token from one owner to another', async function () { 
            let ownerToken1=await this.contract.ownerOf(1);
            await this.contract.transferFrom(ownerToken1, accounts[3],1, {from: ownerToken1});
            let ownerToken2=await this.contract.ownerOf(1);
            assert.notEqual(ownerToken1, ownerToken2, "Ownership not transferred");
            assert.equal(ownerToken2, accounts[3], " Owner not correct")   
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new("Real Estate Tokens", "RET", {from: account_one});;
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let supply1 = await this.contract.totalSupply.call();   
            try{
                await this.contract.mint(accounts[3], 11,{from: account_two});
            }catch(error){
            }
            finally{
                let supply2 = await this.contract.totalSupply.call();
                assert.equal(supply1.toNumber(), supply2.toNumber(), " Total Supply incorrect after mint");
            }
            
        })

        it('should return contract owner', async function () { 
            let owner= await this.contract.getOwner();
            assert.equal(owner, accounts[0], "Contract owner not correct")     
        })

    });
})