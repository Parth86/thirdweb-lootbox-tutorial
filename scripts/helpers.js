import { ThirdwebSDK } from '@3rdweb/sdk';
import ethers from 'ethers';

import dotenv from 'dotenv';
import exp from 'constants';
dotenv.config();

const walletPrivateKey = process.env.WALLET_PRIVATE_KEY;

if(!walletPrivateKey) {
    console.log('Wallet Key Missing!')
    process.exit(1)
}

export const sdk = new ThirdwebSDK(
    new ethers.Wallet(
        process.env.WALLET_PRIVATE_KEY,
         // We use Polygon Mumbai network
    ethers.getDefaultProvider("https://winter-icy-sun.matic-testnet.quiknode.pro/f36aa318f8f806e4e15a58ab4a1b6cb9f9e9d9b9/")
    )
)

const appAddress = '0xA2c9173f2e4f737d23C298b05F8B9f1dC4AcD4DD'

export async function getApp() {
    const app = await sdk.getAppModule(appAddress);

    return app
}