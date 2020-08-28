pragma solidity >=0.4.0;

contract landRegistration{
    struct landDetails{
        string Address;
        address payable CurrentOwner;
        uint marketValue;
        bool isAvailable;

    }
    
    uint[] public ids;


    struct profiles{
        uint[] assetList;   
        }

 
    mapping(uint => landDetails) public land;
    address owner;
    mapping(address => profiles) profile;
    
    constructor() public {
        owner = msg.sender;
    }
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    

    function Registration(
        string memory _address, address payable _OwnerAddress,uint _marketValue, uint id
        ) public returns(bool) {
        require( _OwnerAddress == msg.sender);
        land[id].Address= _address;
        land[id].CurrentOwner = _OwnerAddress;
        land[id].marketValue = _marketValue;
        land[id].isAvailable =true;
        profile[_OwnerAddress].assetList.push(id);
        return true;
    }

        
        function landInfoUser(uint id) public view returns(address,uint,bool){
                return(land[id].CurrentOwner,land[id].marketValue,land[id].isAvailable);        
    }

    function buyProperty(uint property)public payable{
        require(land[property].isAvailable == true);
        require(msg.value >= (land[property].marketValue+((land[property].marketValue)/10)));
        land[property].CurrentOwner.transfer(land[property].marketValue);
        land[property].CurrentOwner=msg.sender;
        land[property].isAvailable=false;
        profile[msg.sender].assetList.push(property); 
    }
}