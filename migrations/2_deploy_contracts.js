var Owned = artifacts.require("Owned");
//var ERC20Token = artifacts.require("ERC20Token");
var EventToken = artifacts.require("EventToken");
var Events = artifacts.require("Events");


module.exports = function(deployer) {
  //deployer.deploy(ERC20Token);
  deployer.deploy(Owned);
  //deployer.link(ERC20Token, EventToken);
  deployer.link(Owned, EventToken);
  deployer.deploy(EventToken);
  deployer.link(Owned, Events);
  deployer.link(EventToken, Events);
  deployer.deploy(Events);
};
