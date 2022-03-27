import { getApp } from "./helpers.js";

async function main() {
    const app = await getApp();

    console.log('Deploying bundle collection module...');

    const bundleModule = await app.deployBundleModule({
        name: 'Lootbox Bundle',
        sellerFeeBasisPoints: 0, //everything in thirdweb lets you set a royalty so that when your NFTs etc. are traded on you get a cut of that.
    })

    console.log(`Deployed bundle collection module with address ${bundleModule.address}`);
}

try {
    await main()
} catch (error) {
    console.error('Error creating the bundl module collection', error)
    process.exit(1)
}