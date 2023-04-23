const { ethers } = require("hardhat");

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const contract = await ethers.getContractFactory("GovernanceToken");
  const GovToken = await contract.deploy();
  await GovToken.deployed();
  console.log(
    `The contract is deployed on the the address ${GovToken.address}`
  );
  console.log(`Delegating to ${deployer.address}`);
  await delegate(GovToken.address, deployer.address);
  console.log("Delegated!");
};

const delegate = async (governanceTokenAddress, delegatedAccount) => {
  const governanceToken = await ethers.getContractAt(
    "GovernanceToken",
    governanceTokenAddress
  );
  const transactionResponse = await governanceToken.delegate(delegatedAccount);
  await transactionResponse.wait(1);
  console.log(
    `Checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`
  );
};

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
