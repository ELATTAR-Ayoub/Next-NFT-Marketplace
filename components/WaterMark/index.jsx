import Logo from "../Logo/Logo";

const WaterMark = ({ style, svg }) => {
    return (
        <div className={'bg-transparent relative uppercase font-bold flexCenter text-xl md:text-2xl text-secondary' + style} >
            {svg === 'w' ? <Logo svg={'w'} /> : <Logo />}
            < span className='italic text-xs self-end' >
                marketplace
            </span >
        </div >
    )
}

export default WaterMark;