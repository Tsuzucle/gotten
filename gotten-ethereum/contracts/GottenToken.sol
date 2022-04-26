pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

struct Treasure {
    uint256 lat;
    uint256 lon;
    uint256 value;
    address owner;
    bytes32 hash;
    string name;
    bool isClaimed;
}

contract GottenToken is ERC20 {
    mapping(uint => Treasure) public treasures;
    mapping(bytes32 => uint) public treasureIdx;
    uint public treasureCount;

    constructor() ERC20("Gotten", "GTN") {
        _mint(msg.sender, 100 ether);
    }

    function registerTreasure(string memory name, uint256 lat, uint256 lon, uint256 value, bytes32 hash) public {
        require(balanceOf(msg.sender) >= value);
        _transfer(msg.sender, address(this), value);
        treasures[treasureCount++] = Treasure(
            lat,
            lon,
            value,
            msg.sender,
            hash,
            name,
            false
        );
    }

    function gotcha(string memory key) public {
        bytes32 hash = sha256(bytes(key));
        require(treasureIdx[hash] != 0);
        Treasure storage treasure = treasures[treasureIdx[hash]];

        require(!treasure.isClaimed);
        treasure.isClaimed = true;
        _transfer(address(this), msg.sender, treasure.value);
    }
}
