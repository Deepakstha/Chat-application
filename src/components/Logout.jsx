import React from 'react'

const Logout = () => {
    const handleClick = () => {
        localStorage.removeItem('chat-app-user')
        window.location.reload()
    }
    return (
        <div className=' cursor-pointer bg-black  p-2 rounded' onClick={handleClick}>Logout</div>
    )
}

export default Logout