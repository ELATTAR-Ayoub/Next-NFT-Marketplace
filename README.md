# Digital marketplace running on Ethereum blockchain with Maticvigil & Polygon & Next.js coded with JavaScript and Solidity.

This is a full stack web NFTs marketplace app built on the Ethereum blockchain using Maticvigil RPC & Polygon mumbai testnet, coded with Javascript and solidity and styled with tailwind and port-css, to test this project in your local machine you have to fill up some files that contains sensitive informations like `.secret`, `.appId`, `config.js` & `.env`

## Prepare your envirement:
1. First download the source code on your machine.

2. Second type `npm install` to download all packages you need(there is quite a lot).
 
3. You goona find all the main backend on the Ethereum blockchain in the contracts file, there's 2 solidity files.
 
4. Create a digital Wallet on METAMASK (Don't use your own).
 
5. Get the secret code of your MEWTAMASK Wallet and save it for later.

6. Open the RPC [maticvigil.com](https://rpc.maticvigil.com) on your browser and create there an app, they will give you 2 links for your app API end-points:
  - The Matic Mainnet RPC URL: https://rpc-mainnet.maticvigil.com/v1/${YourAppID}
  - The Mumbai Testnet RPC URL: https://rpc-mumbai.maticvigil.com/v1/${YourAppID}
  
7. Type `geth — datadir ./data — networkid 2018 — rpc — rpccorsdomain “*” — rpcapi “admin,db,eth,miner,web3,net,personal,txpool” — allow-insecure-unlock` then `npx hardhat node` in the Terminal to get free META Wallet accounts has 1000 Matic on each for the localhost server (probably, you will get 20 accounts but I found them all empty for some reason but they are just for testing so it dosn't matter really).
  - Go to your META Wallet and click add wallet then enter the ID and the password of any account you want to get access to it.

8- Open your METAMASK Wallet then click add network and add the mumbai-testnet network details from [docs.polygon.technology.com](https://docs.polygon.technology/docs/develop/network-details/network/).

![Adding netwrok to METAMASK](https://i.ibb.co/kmF51R1/Screenshot-2021-11-30-180849.png)
  
9. Type your Wallet ID in the [faucet.polygon](https://faucet.polygon.technology/) to get 1 MATIC Free for the mumbai-testnet network, you can use one from the 20 accounts you get from the terminal if you want. (Having money in the wallet is important, without some real money in your META Wallet you can't create a server for the market).

## Complete the code:
After preparing the envirement we need to complete the source with some sensitive informations.
1.  Go to `.secret` and type the secret code of your MEWTAMASK Wallet u saved earlier.

2.  Go to `.appId` and type the AppId you get from [maticvigil.com](https://rpc.maticvigil.com).

3.  Go to the terminal then type `npx hardhat run scripts/deploy.js --network mumbai` and the Go to `.config.js` and type:
  - nftMarket deployed to: ***That code*** in your **nftaddress** in `.config.js` file.
  - nft deployed to: ***That code*** in your **nftmarketaddress** `.config.js` file.
  
4. Your app is now live in the mumbai-testnet incha2a Allah.

5. Finally type `npm run dev` and head to **localhost:3000** to use your market web app.

## Running the code on other networks:
Running the app on the Polygon-Mainnet is so easy, you gonna head to the terminal then type `npx hardhat run scripts/deploy.js --network ~Whatever net you want~` then change the **nftaddress** and the **nftmarketaddress** in the `config.js` file then voila :tada:, you have your app deployed to whatever network you want.
but be aware from the only problem which is that your Wallet mustn't be empty on that server you want, If your wallet is empty then the terminal will drop an error for you to go get some MATICs buddy.


