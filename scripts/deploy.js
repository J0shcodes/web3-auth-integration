const hre = require("hardhat");

const main = async () => {
	const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");	
	const Voting = await VotingSystem.deploy();

	await Voting.deployed();

	console.log("The VotingSystem contract was deployed to: ", Voting.address);
}

const deploy = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

deploy();