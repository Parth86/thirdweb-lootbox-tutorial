import { ethers } from "ethers";
import { sdk } from "./helpers.js";

async function main() {
    const packModuleAddress = '0xeB04ee2d52EcfdAB575213C39e3E82639248Ea4F'; // your pack module address
    const packModule = sdk.getPackModule(packModuleAddress);

    console.log('Depositing link...')

    // LINK uses 18 decimals, same as Eth. So this gives us the amount to use for 2 LINK
    const amount = ethers.utils.parseEther('2');
    //Like most cryptocurrencies LINK is subdivided into extremely small units, so you can have 0.00001 LINK for example. It uses the same subdivision as Ether, so 10^18 units = 1 LINK. We use the ethers library to help us get the number of units in 2 LINK here.

    await packModule.depositLink(amount);
    console.log('Deposited!')
  
    const balance = await packModule.getLinkBalance();
    console.log(balance);


}

try {
    await main();
  } catch (error) {
    console.error("Error depositing the LINK", error);
    process.exit(1);
  }