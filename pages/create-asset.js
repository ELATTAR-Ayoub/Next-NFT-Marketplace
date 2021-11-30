import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
    nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

export default function createItem() {
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
    const router = useRouter()

    async function onChange(e) {
        const file = e.target.files[0]
        try {
            const added = await client.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setFileUrl(url)
        } catch (err) {
            console.log('Error uploading file: ', error)
        }
    }

    async function createdItem() {
        const { name, description, price } = formInput
        if (!name || !description || !price || !fileUrl) return
        /* first, upload to IPFS */
        const data = JSON.stringify({
            name, description, image: fileUrl
        })
        try {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
            createSale(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    async function createSale(url) {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        //creating the item
        let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
        let transaction = await contract.createToken(url)
        let tx = await transaction.wait()
        let event = tx.events[0]
        let value = event.args[2]
        let tokenId = value.toNumber()

        // parse the price
        const price = ethers.utils.parseUnits(formInput.price, 'ether')

        //list the item for sale on the marketplace
        contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()

        transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
        await transaction.wait()

        // send the uer to the main page
        router.push('/')
    }

    return (
        <div className="flexCenter flex-col w-full mb-4">
            <h1 className='text-3xl font-bold p-4'>Sell Your Digital Asset</h1>
            <p className=' text-xs text-center font-semibold mb-12 md:text-sm'>Create your art and sell it using your META Wallet with no registration required.</p>
            <div className="form w-11/12 md:w-3/4 ">
                <label name='Asset-name'>
                    Asset name:
                </label>
                <input
                    placeholder="NFT name"
                    name='Asset-name'
                    id='Asset-name'
                    className=""
                    onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                />
                <label name='Asset-description'>
                    Asset description:
                </label>
                <textarea
                    placeholder="NFT description"
                    name='Asset-description'
                    id='Asset-description'
                    style={{ 'minHeight': '25px' }}
                    onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                />
                <label name='Asset-price'>
                    Asset price (ETH):
                </label>
                <input
                    type='number'
                    maxLength='15'
                    step='0.1'
                    min="0"
                    placeholder="e. g: 0.025"
                    name='Asset-price'
                    id='Asset-price'
                    className=""
                    onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                />
                <label name='Asset-file'>
                    Asset picture:
                </label>
                <input
                    type="file"
                    name="Asset-file"
                    id='Asset-file'
                    className="file-input"
                    onChange={onChange}
                />
                {
                    fileUrl && (
                        <img className="w-full rounded-md my-2" src={fileUrl} />
                    )
                }
                <button onClick={createdItem} className="btn-main">
                    Create Digital Asset
                </button>
            </div>
        </div>
    )

}