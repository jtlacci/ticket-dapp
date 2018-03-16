var Events = artifacts.require("./Events.sol");



contract('Events', function(accounts) {

  it("should get event info", async function() {
    let instance = await Events.new('test',10,1,10)
    //get event name
    assert.equal(await instance.name.call(),'test')
    //get event seats
    assert.equal(await instance.seats.call(),10)
    //get price
    assert.equal(await instance.price.call(),1)
  });

  it("should get event Ticket Receipt", async function() {
    let instance = await Events.new('test',10,1,10)
    //buy ticket before listener
    await instance.buyTickets({value:1})
    //filter ticket reciepts by account
    let receipts = instance.TicketReceipt({buyer:accounts[0]},{fromBlock:0, toBlock:'latest'})
    //reciept array
    var Receipt = []
    //test unique receipt
    var test = {}
    receipts.watch(function (error,event){
      if(!error){
        console.log(event);
        // get tx hash
        let txHash = event.transactionHash
        // get event snapshot
        let snapshot = {
          type:event.event,
          blockNumber:event.blockNumber,
          ...event.args
          }
        //check for unique txHash
        if(!test[txHash]){
          // add to unique txHash test
          test = {...test, [txHash]:snapshot }
          // push snapshot to array
          Receipt.push(snapshot)
        }
      }
    })
    // buy ticket after listener
    await instance.buyTickets({value:1})
    // check that 2 seats have been bought
    assert.equal(await instance.seatsAvailable.call(),8)
    // check that 2 events have been caught
    assert.equal(Receipt.length , 2)
  });

});
