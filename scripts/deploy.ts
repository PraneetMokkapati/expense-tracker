import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

async function main() {
  try {
    // Get the deployer's signer
    const [deployer]: SignerWithAddress[] = await ethers.getSigners();
    const provider = deployer.provider;
    
    if (!provider) {
      throw new Error("Provider not found");
    }

    console.log("Deploying contract with account:", deployer.address);

    // Get deployer's balance using provider
    const balance = await provider.getBalance(deployer.address);
    console.log("Account balance:", ethers.formatEther(balance));

    // Deploy the contract
    const ExpenseTracker = await ethers.getContractFactory("ExpenseTracker");
    const expenseTracker = await ExpenseTracker.deploy();
    
    console.log("Waiting for deployment...");
    await expenseTracker.waitForDeployment();

    const contractAddress = await expenseTracker.getAddress();
    console.log("ExpenseTracker deployed to:", contractAddress);

    // Get deployment transaction
    const deploymentTx = expenseTracker.deploymentTransaction();
    if (deploymentTx) {
      console.log("Transaction hash:", deploymentTx.hash);
    }

  } catch (error) {
    console.error("Error during deployment:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
