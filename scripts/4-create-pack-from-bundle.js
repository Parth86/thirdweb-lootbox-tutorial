import { readFileSync} from 'fs';
import { sdk } from './helpers.js';

async function main() {
  const bundleModuleAddress = '0x394ec8b0635e7baFb6EEcD3136806758aD7c7923';
  const bundleModule = sdk.getBundleModule(bundleModuleAddress);

  const packModuleAddress = '0xeB04ee2d52EcfdAB575213C39e3E82639248Ea4F'; // your pack module address
  const packModule = sdk.getPackModule(packModuleAddress);
  
  console.log('Getting all NFTs from bundle...');
  const nftsInBundle = await bundleModule.getAll();

  console.log('NFTs in bundle:');
  console.log(nftsInBundle);

  console.log('Creating a pack containing the NFTs from bundle...');

  const created = await packModule.create({
      assetContract: bundleModuleAddress,
      metadata: {
          name: 'Bhagwan Pack!',
          image: readFileSync('./assets/om.jpg')
      },
      assets: nftsInBundle.map(nft => ({
          tokenId: nft.metadata.id,
          amount: nft.supply,
      }))
  })
  console.log('Pack created!')
  console.log(created);




}


try {
    await main();
  } catch (error) {
    console.error("Error minting the NFTs", error);
    process.exit(1);
  }