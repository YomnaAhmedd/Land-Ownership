App = {
  web3Provider: null,
  contracts: {},


  init: function() {
	
    // Check if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use existing gateway
        window.web3 = new Web3(web3.currentProvider);
    } else {
        alert("No Ethereum interface injected into browser. Read-only access");
    }

    ethereum.enable().then(function(accounts) {}).catch(function(error) {console.error(error)});


    return App.initContract();
  },

  initContract: function() {
	var ABI = [
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_address",
					"type": "string"
				},
				{
					"internalType": "address payable",
					"name": "_OwnerAddress",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_marketValue",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				}
			],
			"name": "Registration",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "property",
					"type": "uint256"
				}
			],
			"name": "buyProperty",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "ids",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "land",
			"outputs": [
				{
					"internalType": "string",
					"name": "Address",
					"type": "string"
				},
				{
					"internalType": "address payable",
					"name": "CurrentOwner",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "marketValue",
					"type": "uint256"
				},
				{
					"internalType": "bool",
					"name": "isAvailable",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				}
			],
			"name": "landInfoUser",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	];
	contract = web3.eth.contract(ABI).at("0x0954c05833ff0bB31A2Be38B23dFc302A0E8fF0E");
	console.log(contract);
	web3.eth.getAccounts(console.log);

    return App.bindEvents();

  },
  bindEvents: function() {
    $(document).on('click', '#btn-PropAdd', App.createProperty);
	$(document).on('click', '#btn-PropSearch', App.landInfoUser);
	$(document).on('click', '#btn-buy', App.buyProperty);
    },



  createProperty: function(event) {
    event.preventDefault();

   	ID = $('#PropAdd #id').val();
	Address = $('#PropAdd #address').val();
   	owner = $('#PropAdd #owner').val();
	value = $('#PropAdd #value').val();
	console.log(value);
	console.log(ID);
	console.log(Address);
	console.log(owner);
	
	contract.Registration(Address, owner, value, ID, 
	{gas: 1000000, gasPrice: web3.toWei(20, 'gwei'), from:"0xAa997310E581959c76e79993F499cAF38B141723"}, function(error, result){
	if(!error)
	console.log(JSON.stringify(result));
	else
	console.error(error);
	});
},
  
  landInfoUser: function() {
   event.preventDefault();
    var PropId = $('#PropSearchform #PropSearch').val();
							contract.landInfoUser(PropId, {gas: 1000000, gasPrice: web3.toWei(20, 'gwei'),from:"0xAa997310E581959c76e79993F499cAF38B141723"}, function(error, result){
                                     if(!error)
                                          {        
											console.log(JSON.stringify(result));
											var isAvailable = result[2];

											$('#resultPropID').text(PropId);
											$('#resultPropValue').text(result[1]);
											$('#resultPropOwner').text(result[0]);
											$('#resultIsAvailable').text(result[2]);
                                        

										  	if(isAvailable == false)
										  		document.getElementById("btn-buy").disabled = true;
											else
												document.getElementById("btn-buy").disabled = false;

										  }
						});
					},
					
					
buyProperty: function(error){
				if (error) {
						console.log(error);
							}
							else{
								contract.buyProperty(PropId,
								{gas: 1000000, gasPrice: web3.toWei(20, 'gwei'), 
								from:"0xAa997310E581959c76e79993F499cAF38B141723"}, function(error, result)
								{
									if(!error)
										console.log(JSON.stringify(result));
									else
										console.error(error);
      });                 	
	}}
}

$(function() {
  $(window).load(function() {

    App.init();
  });
});
