// icons 
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaEthereum } from 'react-icons/fa';

//components
import Icon from '../components/Icon';
import NoNFTS from '../components/No-NFTs';

// others
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

let rpcEndpoint = null

if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
  rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL
}

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded'); //set loaded later

  useEffect(() => {
    loadNFTs();
  }, [])

  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider('' + rpcEndpoint + '')
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    const data = await marketContract.fetchMarketItems()

    // map all the items to get the tkon URI to get the META data from the token
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
        likes: meta.data.likes,
      }

      return item
    }))
    setNfts(items)
    setLoadingState('loaded')
  }

  async function buyNft(nft) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)

    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')

    const transaction = await contract.createMarketSale(nftaddress, nft.itemId, {
      value: price
    })

    await transaction.wait();
    loadNFTs()
  }
  if (loadingState === 'loaded' && !nfts.length) return (<NoNFTS title={'no items in market right now...'} />)

  return (
    <div className='flexCenter flex-col mb-4'>
      <h1 className=' text-2xl md:text-3xl font-bold p-4 border-b border-secondary-dark border-opacity-50'>Welcome To NFT marketPlace</h1>
      <div className='flexCenter overflow-hidden'>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 py-4 normal-case">
          {
            nfts.length === 0 ?
              <div className=' col-span-full '>
                <NoNFTS title={'loading NFTs...'} />
              </div>
              : nfts.map((nft, i) => (
                <div key={i} style={{ 'min-height': '30rem' }} className=" w-96 border border-secondary-dark border-opacity-50 shadow rounded-xl overflow-hidden flexCenter flex-col">
                  <div className='w-full border-b border-secondary-dark border-opacity-50 flexCenter justify-end py-3 px-3'>
                    <Icon extraStyle=' flex-row-reverse' icon={< AiOutlineHeart size='24' className='text-secondary-dark opacity-50 cursor-pointer mr-1' />} text={'0'} />
                  </div>
                  <div className='w-full h-full p-2 flexCenter justify-between flex-col '>
                    <img className='w-full min-h-1/2 rounded-md' src={nft.image} alt='Asset picture' />
                    <div className="py-4 w-full">

                      <p title={nft.owner} className=' text-secondary-dark opacity-50 text-sm noOverflowText '>Created by {nft.owner}</p>

                      <div className='w-full py-1 flexCenter justify-between text-xl font-bold'>
                        <p title={nft.name} className=' text-secondary-dark noOverflowText w-3/4'>{nft.name}</p>
                        <Icon extraStyle='text-xl flex-row-reverse' icon={< FaEthereum size='16' className='text-sideColor' />} text={nft.price} />
                      </div>

                      <p className='noOverflowText-2lines text-secondary-dark opacity-50 text-sm ' title={nft.description} >{nft.description}</p>

                    </div>
                    <button className=' justify-self-end' className="btn-main" onClick={() => buyNft(nft)}>Buy Now</button>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  )
}
