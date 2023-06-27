import { useState } from 'react'

const ChatInput = ({ handelSendMsg }) => {
    const [msg, setMsg] = useState('')
    const sendChat = (e) => {
        e.preventDefault()
        if (msg.length > 0) {
            handelSendMsg(msg)
            setMsg("")
        }
    }
    return (
        < div className='container' >
            <form className='input-container' onSubmit={sendChat}>
                <input className='submit rounded border p-2 text-black' type="text" placeholder='message' value={msg} onChange={e => setMsg(e.target.value)} />
                <button type='submit' className='btn border-t-neutral-800 p-2 bg-blue-950 rounded'>Send</button>
            </form>
        </div >
    )
}

export default ChatInput