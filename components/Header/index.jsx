import Link from 'next/link'

// components
import WaterMark from '../WaterMark'
import Icon from '../Icon'

// icons
import { FiMenu } from 'react-icons/fi';

const Header = ({ }) => {
    return (
        <div className='flexCenter w-screen px-8 py-3 text-sm border-b border-secondary border-opacity-50 '>
            <div className='flexCenter justify-between w-screen max-w-7xl mx-auto'>
                <header className='flexCenter justify-between'>
                    <Link href='/'>
                        <a>
                            <WaterMark />
                        </a>
                    </Link>

                </header>
                <nav id='nav' className=" border-b p-2 bg-transparent md:bg-secondary w-auto  md:w-4/6">
                    <div className="flexCenter justify-around m-3 text-primary hidden md:flex ">
                        <Link href="/">
                            <a className="nav-Link">
                                Home
                            </a>
                        </Link>
                        <Link href="/create-asset">
                            <a className="nav-Link">
                                Sell Digital Asset
                            </a>
                        </Link>
                        <Link href="/my-assets">
                            <a className="nav-Link">
                                My Digital Assets
                            </a>
                        </Link>
                        <Link href="/dashboard">
                            <a className="nav-Link">
                                My Dashboard
                            </a>
                        </Link>
                    </div>
                    <div onClick={dropNav} className=' flex cursor-pointer md:hidden  '>
                        <Icon icon={< FiMenu size='32' className='text-secondary-dark' />} text={''} />
                    </div>
                </nav>
            </div>
        </div>
    )
}

const dropNav = () => {
    const nav = document.getElementById('sideNav');
    nav.style.width = '100%';
}


export default Header;