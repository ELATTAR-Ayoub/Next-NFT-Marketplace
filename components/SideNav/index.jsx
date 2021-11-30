import Link from 'next/link'

// icons
import { AiOutlineClose } from 'react-icons/ai';

// component
import Icon from '../Icon';
import WaterMark from '../WaterMark'

// functions

const SideNav = () => {
    return (
        <div id='sideNav' className="sideNav">
            <div className="flexCenter w-full justify-between transition-all px-8 py-4 text-base">
                {/* nav close btn */}
                <Link href='/'>
                    <a onClick={hideNav}>
                        <WaterMark svg={'w'} />
                    </a>
                </Link>
                <div onClick={hideNav} className=" cursor-pointer" >
                    <Icon icon={< AiOutlineClose size='32' className='' />} text={''} />
                </div>
            </div>
            {/* nav header */}
            <div className="sideNav-Links">
                <Link href="/">
                    <a onClick={hideNav}  >
                        Home
                    </a>
                </Link>
                <Link href="/create-asset">
                    <a onClick={hideNav}  >
                        Sell Digital Asset
                    </a>
                </Link>
                <Link href="/my-assets">
                    <a onClick={hideNav}  >
                        My Digital Assets
                    </a>
                </Link>
                <Link href="/dashboard">
                    <a onClick={hideNav}  >
                        My Dashboard
                    </a>
                </Link>
                <Link title='elattarayoub000@gmail.com' href='mailto:elattarayoub000@gmail.com'>
                    <a onClick={hideNav}  >
                        Contact us
                    </a>
                </Link>
                <Link href='https://github.com/ELATTAR-Ayoub'>
                    <a target="_blank" onClick={hideNav}  >
                        Dev Team
                    </a>
                </Link>
            </div>
        </div>
    )
}

const hideNav = () => {
    const nav = document.getElementById('sideNav');
    nav.style.width = '0%';
}


export default SideNav;