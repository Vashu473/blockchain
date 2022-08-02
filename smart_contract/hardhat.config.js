require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/s3Pk6BNFMrfqNGVzRu6HciQ7HO2n7ii6",
      accounts: [
        "42fa0bcc989634cafe0d97ff6c68f23451e34b625e1aa58a10533cdae0a95261",
      ],
    },
  },
};

// npx hardhat run scripts/deploy.js --network rinkeby
