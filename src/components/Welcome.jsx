import React from 'react'

function Welcome({ currentUser }) {
    return (
        <div className='flex justify-center items-center col-span-2 bg-gray-600 flex-col text-white'>
            <div>Welcome, {currentUser?.username}</div>
            <h3>Please Select a chat to Start messaging</h3>
        </div>

    )
}

export default Welcome