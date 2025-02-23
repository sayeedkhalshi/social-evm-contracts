// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract UserManager {
    struct User {
        address userAddress;
        string username;
        uint256 age;
        string bio;
        string profilePic;
        uint256 joinDate;
        string country;
        string city;
        string profession;
        string twitter;
    }

    mapping(address => User) private users;
    mapping(string => address) private usernameToAddress;

    constructor() {
        User memory newUser = User({
            userAddress: 0x89De2C53352850d8c1f18E7D3d1Ba999cEB2E1f5,
            username: "Alice",
            age: 29,
            bio: "I am starter",
            profilePic: "zkscam.com/images/logo.png",
            joinDate: block.timestamp,
            country: "USA",
            city: "New York",
            profession: "Software Engineer",
            twitter: "https://twitter.com/alice"
        });

        users[0x89De2C53352850d8c1f18E7D3d1Ba999cEB2E1f5] = newUser;
        usernameToAddress[
            newUser.username
        ] = 0x89De2C53352850d8c1f18E7D3d1Ba999cEB2E1f5;
    }

    event UserRegistered(
        address indexed userAddress,
        string username,
        uint256 joinDate,
        string country,
        string city,
        string profession,
        string twitter
    );
    event UserProfileUpdated(
        address indexed userAddress,
        string username,
        string bio,
        string profilePic,
        string country,
        string city,
        string profession,
        string twitter
    );

    modifier onlyExistingUser(address _userAddress) {
        require(
            users[_userAddress].userAddress != address(0),
            "User does not exist."
        );
        _;
    }

    modifier onlyUniqueUsername(string memory _username) {
        require(
            usernameToAddress[_username] == address(0),
            "Username is already taken."
        );
        _;
    }

    function registerUser(
        string memory _username,
        string memory _bio,
        uint256 _age,
        string memory _profilePic,
        string memory _country,
        string memory _city,
        string memory _profession,
        string memory _twitter
    ) public onlyUniqueUsername(_username) {
        require(bytes(_username).length > 0, "Username cannot be empty.");
        require(bytes(_bio).length > 0, "Bio cannot be empty.");

        User memory newUser = User({
            userAddress: msg.sender,
            username: _username,
            bio: _bio,
            age: _age,
            profilePic: _profilePic,
            country: _country,
            city: _city,
            profession: _profession,
            twitter: _twitter,
            joinDate: block.timestamp
        });

        users[msg.sender] = newUser;
        usernameToAddress[_username] = msg.sender;

        emit UserRegistered(
            msg.sender,
            _username,
            block.timestamp,
            _country,
            _city,
            _profession,
            _twitter
        );
    }

    function updateUserProfile(
        string memory _username,
        string memory _bio,
        uint256 _age,
        string memory _profilePic,
        string memory _country,
        string memory _city,
        string memory _profession,
        string memory _twitter
    ) public onlyExistingUser(msg.sender) {
        require(bytes(_username).length > 0, "Username cannot be empty.");
        require(bytes(_bio).length > 0, "Bio cannot be empty.");

        User storage user = users[msg.sender];
        user.username = _username;
        user.bio = _bio;
        user.age = _age;
        user.profilePic = _profilePic;
        user.country = _country;
        user.city = _city;
        user.profession = _profession;
        user.twitter = _twitter;

        emit UserProfileUpdated(
            msg.sender,
            _username,
            _bio,
            _profilePic,
            user.country,
            user.city,
            user.profession,
            user.twitter
        );
    }

    function getUserProfile(
        address _userAddress
    )
        public
        view
        onlyExistingUser(_userAddress)
        returns (
            string memory,
            uint256,
            string memory,
            string memory,
            uint256,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        User memory user = users[_userAddress];
        return (
            user.username,
            user.age,
            user.bio,
            user.profilePic,
            user.joinDate,
            user.country,
            user.city,
            user.profession,
            user.twitter
        );
    }

    function getUserByUsername(
        string memory _username
    ) public view returns (address) {
        return usernameToAddress[_username];
    }

    function getUserByAddress(
        address _userAddress
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        User memory user = users[_userAddress];
        return (
            user.username,
            user.country,
            user.city,
            user.profession,
            user.twitter
        );
    }
}
