const Button = ({text, action, style}) => <button onClick={action} className='button' style={style}> {text} </button>

export default Button