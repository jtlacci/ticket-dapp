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

});
