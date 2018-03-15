var Events = artifacts.require("./Events.sol");



contract('Events', function(accounts) {

  it("should get event info", async function() {
    let instance = await Events.new('test',10,1,10)
    assert.equal(await instance.name.call(),'test')
  });

});
