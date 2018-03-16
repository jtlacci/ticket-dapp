
const _ = require('lodash')
import Web3 from 'web3'
import web3 from './web3'
import eventJSON from '../../build/contracts/Events.json'
var contract = require('truffle-contract')

var events = (function () {
    var instance;

    function init() {
        var eventContract = contract(eventJSON)
        eventContract.setProvider(web3.currentProvider)
        return eventContract;
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

export default events.init();
