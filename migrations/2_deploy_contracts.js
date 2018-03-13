var Owned = artifacts.require("./Owned.sol");
var ERC20Token = artifacts.require("./ERC20Token.sol");
var EventToken = artifacts.require("./EventToken.sol");
var Events = artifacts.require("./Events.sol");


module.exports = function(deployer) {
  deployer.deploy(ERC20Token);
  deployer.deploy(Owned);
  deployer.link(ERC20Token, EventToken);
  deployer.link(Owned, EventToken);
  deployer.deploy(EventToken);
  deployer.link(Events, Owned);
  deployer.link(Events, EventToken);
  deployer.deploy(Events);
};
