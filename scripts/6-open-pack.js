import { sdk } from "./helpers.js";

async function main() {
  const packModuleAddress = '0xeB04ee2d52EcfdAB575213C39e3E82639248Ea4F';
  const packModule = sdk.getPackModule(packModuleAddress);

  console.log('Opening the pack...');
  const opened = await packModule.open('0');
  //we call packModule.open('0'). The 0 here is the ID of the pack that we want to open. We’ve only created one pack in our module, but we can have multiple 
  console.log('Opened the pack!');
  console.log(opened);
}

try {
  await main();
} catch (error) {
  console.error("Error opening the pack", error);
  process.exit(1);
}