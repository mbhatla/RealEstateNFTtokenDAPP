// migrating the appropriate contracts
var Verifier = artifacts.require("./verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {
  deployer.deploy(Verifier).then(() => {
    return deployer.deploy(SolnSquareVerifier,"Real Estate Token", "RET", Verifier.address);
  });
};
