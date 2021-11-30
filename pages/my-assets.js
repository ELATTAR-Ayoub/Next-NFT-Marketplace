//components
import NFTcard from '../components/NFT-card';
import NoNFTS from '../components/No-NFTs';

// others
import Link from 'next/link'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

export default function myAssets() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded'); //set loaded later

  useEffect(() => {
    loadNFTs();
  }, [])

  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })

    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchMyNFTs()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        itemId: i.itemId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        // likes: i.likes,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded')
  }
  // is user did,t buy anything will return
  if (loadingState === 'loaded' && !nfts.length) return (
    <NoNFTS title={'No assets are owned or bought right now...'} />
  )
  //  if not will return
  return (
    <div className='flexCenter flex-col mb-4'>
      <h1 className=' text-2xl md:text-3xl font-bold p-4 border-b border-secondary-dark border-opacity-50'>Here's your purchased NFTs</h1>
      <div className='flexCenter overflow-hidden'>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 py-4 normal-case">
          {
            nfts.map((nft, i) => (
              <NFTcard key={i} likes={'0'} image={nft.image} owner={nft.owner} name={nft.name} price={nft.price} description={nft.description} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
