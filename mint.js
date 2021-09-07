const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "boss payment old wall cigar grid mother card must symbol meat uncover";
const contract = '0xE024D549497027C149996c8440bCe9603Bb14a9c';
const owner= '0x377eCBAea332ee42a17C56E8c4069d897769ec1D';
const proofs = [
  require("./zokrates/code/square/proof1.json"),
  require("./zokrates/code/square/proof2.json"),
  require("./zokrates/code/square/proof3.json"),
  require("./zokrates/code/square/proof4.json"),
  require("./zokrates/code/square/proof5.json"),
  require("./zokrates/code/square/proof6.json"),
  require("./zokrates/code/square/proof7.json"),
  require("./zokrates/code/square/proof8.json"),
  require("./zokrates/code/square/proof9.json"),
  require("./zokrates/code/square/proof10.json"),
];

const web3 = require("web3");
const network = "rinkeby";

const abi = require("./eth-contracts/build/contracts/SolnSquareVerifier").abi;

const init = async () => {
  const provider = new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/535644c3d89e42db8e4b5d9a5e64e183`);
  const web3Inst = new web3(provider);

  if (contract) {
    const token = new web3Inst.eth.Contract(abi, contract, { gasLimit: 300000000 });
    try {
      for (let i = 0; i < 10; i++) {
        console.log("proofs " + i, proofs[i]);
        tx = await token.methods.mintRET(owner, i, proofs[i].proof, proofs[i].inputs).send({ from: owner, gas: 3000000 });
        console.log("Token mint", tx);
      }
    } catch (err) {
      console.log(err);
    }
  }
};

init();