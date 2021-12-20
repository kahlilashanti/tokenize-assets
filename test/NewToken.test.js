const Token = artifacts.require("./NewToken.sol");

const { assert } = require("chai");
var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

contract("Token Test", async (accounts) => {
    it("all tokens should be in my account", async () => {
        //here we define our test case
        let instance = await Token.deployed();
        let totalSupply = await instance.totalSupply();
        // let balance = await instance.balanceOf(accounts[0]);
        // assert.equal(balance.valueOf(), initalSupply.valueOf(), "the balance was not the same")
        //it is better to use expect because it is more readable
        expect(await instance.balanceOf(accounts[0])).to.be.bignumber.equal(totalSupply);
        //to run the test run truffle developer then then type test
    })
})
