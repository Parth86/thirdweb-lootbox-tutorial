import { readFileSync  } from "fs";
import { sdk } from './helpers.js'

async function main() {
  // Paste in the address from when you created the bundle collection module
  const bundleModuleAddress = '0x394ec8b0635e7baFb6EEcD3136806758aD7c7923';
  const bundleModule = sdk.getBundleModule(bundleModuleAddress);
  //This time we’re using sdk from our helpers. When we want to interact with an existing contract, we use sdk.getXXXModule and pass it the contract address of that module type. So in our case, we’re calling getBundleModule and passing it the contract address of the bundle collection module that we just deployed. From there we can interact with it!

  console.log('Creating NFT batch...');

  const created = await bundleModule.createAndMintBatch([
      {
          metadata: {
              name: 'Krishna',
              description: 'Avatar of Bhagwan Vishnu',
              image: readFileSync('./assets/krishna.jpg'),//we can just read in an image file using readFileSync and all the hard work of making that image work as an NFT will be done for us by sdk
              properties: {
                rarity: 'somewhat rare',
                fanciness: 7
              }
          },
          supply: 50,
      },
      {
        metadata: {
            name: 'Ganesha',
            description: 'Son of Bhagwan Shiva and Bhagwati Parvati',
            image: readFileSync('./assets/ganesha.avif'),
            properties: {
              rarity: 'somewhat rare',
              fanciness: 7
            }
        },
        supply: 50,
    }
  ])
  //'supply' says how many of that nft we want to have. The supply can be whatever you like, and it can be different for each one.

  console.log('NFTs created!')
  console.log(JSON.stringify(created, null, 2));


}

try {
    await main()
} catch(err) {
    console.error('Error minting nfts', err)
    process.exit(1)
}