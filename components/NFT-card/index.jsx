// icons 
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaEthereum } from 'react-icons/fa';

// components
import Icon from '../Icon';

const NFTcard = ({ key, likes, image, owner, name, price, description }) => {
    return (
        <div key={key} style={{ 'min-height': '28rem' }} className=" w-96 border border-secondary-dark border-opacity-50 shadow rounded-xl overflow-hidden flexCenter flex-col">
            <div className='w-full border-b border-secondary-dark border-opacity-50 flexCenter justify-end py-3 px-3'>
                <Icon extraStyle=' flex-row-reverse' icon={< AiOutlineHeart size='24' className='text-secondary-dark opacity-50 cursor-pointer mr-1' />} text={likes} />
            </div>
            <div className='w-full h-full p-2 flexCenter flex-col justify-between'>
                <img className='w-full min-h-1/2 rounded-md' src={image} alt='Asset picture' />
                <div className="py-4 w-full">
                    <p title={owner} className=' text-secondary-dark opacity-50 text-sm noOverflowText '>Created by {owner}</p>

                    <div className='w-full py-1 flexCenter justify-between text-xl font-bold'>
                        <p title={name} className=' text-secondary-dark noOverflowText w-3/4'>{name}</p>
                        <Icon extraStyle='text-xl flex-row-reverse' icon={< FaEthereum size='16' className='text-sideColor' />} text={price} />
                    </div>

                    <p className='noOverflowText-2lines text-secondary-dark opacity-50 text-sm ' title={description} >{description}</p>
                </div>
            </div>
        </div>
    )
}

export default NFTcard;