# Digital marketplace running on Ethereum blockchain with Maticvigil & Polygon & Next.js coded with JavaScript and Solidity.

This is a full stack web NFTs marketplace app built on the Ethereum blockchain using Maticvigil servers & Polygon mumbai testnet, to test this project in your local machine you have to fill up some files that contains sensitive informations like `.secret`, `.appId`, `config.js` & `.env`

## Prepare your envirement:
- First download the source code on your machine.
- Second type `npm install` to download all packages you need(there is quite a lot).
- You goona find all the main backend on the Ethereum blockchain in the contracts file, there's 2 solidity files.
- Create a digital Wallet on METAMASK (Don't use your own).
- Get the secret code of your MEWTAMASK Wallet and save it for later.
- Open [maticvigil.com](https://rpc.maticvigil.com) on your browser and create there an app, they will give you 2 links for your app API end points:
  - The Matic Mainnet RPC URL: https://rpc-mainnet.maticvigil.com/v1/${YourAppID}
  - The Mumbai Testnet RPC URL: https://rpc-mumbai.maticvigil.com/v1/${YourAppID}
- Type `geth — datadir ./data — networkid 2018 — rpc — rpccorsdomain “*” — rpcapi “admin,db,eth,miner,web3,net,personal,txpool” — allow-insecure-unlock` then `npx hardhat node` in the Terminal to get free META Wallet accounts has 1000 Matic on each in the localhost server (probably, you will get 20 accounts but I found them all empty for some reason but they are just for testing so it dosn't matter really).
  - Go to your META Wallet and click add wallet then enter the ID and the password of any account you want to get access to it.
- Type your Wallet ID in the [faucet.polygon](https://faucet.polygon.technology/) to get 1 MATIC Free for the mumbai-testnet network, you can use one from the 20 accounts you get from the terminal if you want. (Having money in the wallet is important, without some real money in your META Wallet you can't create a server for the market)

## Complete the code:
After preparing the envirement we need to complete the source withe sensitive informations.
-  Go to `.secret` and type the secret code of your MEWTAMASK Wallet u saved earlier.
-  Go to `.appId` and type the AppId you get from [maticvigil.com](https://rpc.maticvigil.com).
-  Go to the terminal then type `npx hardhat run scripts/deploy.js --network mumbai` and the Go to `.config.js` and type:
  - nftMarket deployed to: ***That code*** in your **nftaddress** 
  - nft deployed to: ***That code*** in your **nftmarketaddress** 
- Your app is now live in the mumbai-testnet incha2a Allah.
- Finally type `npm run dev` and gead to **localhost:3000** to use your market.

## Running the code on the real Polygon-Mainnet:
Running the app on the Polygon-Mainnet is so easy, you gonna head to the terminal then type `npx hardhat run scripts/deploy.js --network ~Whatever net you want~` then change the **nftaddress** and the **nftmarketaddress** in the `config.js` the voila :tada:, you have your app deployed to whatever network you want.
Be aware that the only problem is that your Wallet mustn't be empty, If your wallet is empty then the terminal will drop an error to you to go get some MATICs buddy.


