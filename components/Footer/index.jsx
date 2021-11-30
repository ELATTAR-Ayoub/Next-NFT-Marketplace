// components
import WaterMark from '../WaterMark'

// others
import Link from 'next/link'

const Footer = () => {
    return (
        <div className='w-screen flexCenter flex-col bg-secondary text-primary capitalize '>
            <div className='flexCenter justify-between w-screen max-w-7xl m-4 mt-3 mb-0 p-4 flex-col items-start md:flex-row'>
                <div className="">
                    <WaterMark svg={'w'} />
                </div>
                <div className='mt-3 font-semibold md:my-0'>
                    created with &lt;3 by <span className='text-primary hover:text-sideColor transition-all'>
                        <Link href='https://github.com/ELATTAR-Ayoub'>
                            <a target='_'>
                                ELATTAR Ayoub
                            </a>
                        </Link>
                    </span>

                </div>
            </div>
            <div className='flexCenter justify-between w-screen max-w-7xl p-4 text-primary mt-0 m-4 mb-6 items-start flex-col-reverse md:flex-row'>
                <div>
                    <p className='font-semibold'>&#169; NFT MARKETPLACE</p>
                    <p className="text-primary text-opacity-50">Project License <span className='text-primary hover:text-sideColor transition-all'>
                        <Link title='elattarayoub000@gmail.com' href='mailto:elattarayoub000@gmail.com'>
                            <a target='_'>
                                (buy for 500$)
                            </a>
                        </Link>
                    </span> </p>
                </div>
                <div className='footer-links flexCenter flex-wrap w-1/3 mb-4'>
                    <Link href='/my-assets'>
                        <a >
                            My Digital Assets
                        </a>
                    </Link>
                    <Link href='/create-asset'>
                        <a >
                            Sell Digital Asset
                        </a>
                    </Link>
                    <Link href='/dashboard'>
                        <a >
                            Creator Dashboard
                        </a>
                    </Link>
                    <Link title='elattarayoub000@gmail.com' href='mailto:elattarayoub000@gmail.com'>
                        <a >
                            Contact us
                        </a>
                    </Link>
                    <Link href='https://github.com/ELATTAR-Ayoub'>
                        <a target='_' >
                            Dev Team
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;