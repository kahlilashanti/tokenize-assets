
//artifacts are created when truffle migrates the contract and spits out a json file of your contract
var NewToken = artifacts.require("./NewToken.sol");

module.exports = async function (deployer) {
    await deployer.deploy(NewToken, 100);
}

