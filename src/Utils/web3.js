import Web3 from 'web3'

var web3 = (function () {
    var instance;

    function init() {
        var web3js;
        if (typeof window.web3 !== 'undefined') {
          // Use Mist/MetaMask's provider
          web3js = new Web3(window.web3.currentProvider);
          console.log('MetaMask Detected');
        } else {
          console.log('No web3? You should consider trying MetaMask!')
          // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
          web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
        return web3js;
    }

    return {
        init: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

export default web3.init(); 
