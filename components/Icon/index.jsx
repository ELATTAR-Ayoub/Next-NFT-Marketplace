const Icon = ({ icon, text, extraStyle }) => {
    return (
        <div className={'flexCenter transition-all text-sm ' + extraStyle}>
            {text}
            {icon}
        </div>
    )
}

export default Icon;