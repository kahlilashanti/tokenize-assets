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

    //define accounts
    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("all tokens should be in my account", async () => {
        //here we define our test case
        let instance = await Token.deployed();
        let totalSupply = await instance.totalSupply();
        // let balance = await instance.balanceOf(accounts[0]);
        // assert.equal(balance.valueOf(), initalSupply.valueOf(), "the balance was not the same")
        //it is better to use expect because it is more readable
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.bignumber.equal(totalSupply);
        //to run the test run truffle developer then then type test
    })

    it("is possible to send tokens between accounts", async () => {
        //we are going to send a token from the deployer account to the recipient account and see if the balance changed
        //send one token
        const sendTokens = 1;
        let instance = await Token.deployed();
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        //we expect the balance to be less one token after sending
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        //BN is a javascript class which allows you to make arithmetic operations on big numbers like sub, add, etc
        //reciptient should have one token
        expect(instance.balanceOf(recipient)).to.eventually.be.bignumber.equal(new BN(sendTokens));

    })

    it("is not possible to send more tokens than are available in total", async () => {
        let instance = await Token.deployed();
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);

        expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to.eventually.be.rejected;

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.bignumber.equal(balanceOfDeployer);
    })
})
