const landRegistration = artifacts.require('landRegistration');

contract('landRegestration' , () => {
	let landregestration = null;
	before(async() => {
		landregestration = await landRegistration.deployed();
	});
	it('test of regestration' , async() => {
		const result = await landregestration.Registration("Egypt" , "0xe19ad0c2ba163045bb313f59807073d6fe897d4c" , 1 , 1);
		assert(result , true);
	});
	it('test of landInfoUser' , async() => {
		const user = await landregestration.landInfoUser(1);
		assert(user[0] , "Egypt");
		assert(user[1] , "0xe19ad0c2ba163045bb313f59807073d6fe897d4c");
		assert(user[2] , 1);
	});
});
