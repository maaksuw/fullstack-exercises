const Button = ({ text, action, style, id }) => <button onClick={action} className='button' style={style} id={id}> {text} </button>

export default Button