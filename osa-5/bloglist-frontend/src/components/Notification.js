import { useState, useImperativeHandle, forwardRef } from 'react'

const Notification = forwardRef((props, ref) => {
	const [message, setMessage] = useState('')
	const [type, setType] = useState('none')

	const notifySuccess = (message) => {
    setMessage(message)
		setType('success')
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const notifyError = (message) => {
    setMessage(message)
		setType('error')
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

	useImperativeHandle(ref, () => {
    return {
      notifySuccess,
			notifyError
    }
  })

	if (message === '') {
		return null
	}

	return (
		<div className={type}>
			{message}
		</div>
	)
})

export default Notification