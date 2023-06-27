import React, { useEffect, useRef, useState } from 'react'
import ChatInput from './ChatInput'
import Logout from './Logout'
import Messages from './Messages'
import axios from 'axios'
import { sendMessageRoutes } from '../utils/ApiRoutes'
import { getMessageRoutes } from '../utils/ApiRoutes'

const ChatContainer = ({ currentChat, currentUser, socket }) => {
    const [message, setMessage] = useState()
    const [arrivalMessage, setArivalMessage] = useState(null)
    const scrollRef = useRef()
    const getAllMessage = async () => {
        const response = await axios.post(getMessageRoutes, {
            from: currentUser.id,
            to: currentChat.id
        })
        setMessage(response.data)
    }

    useEffect(() => {
        if (currentChat) {
            getAllMessage()
        }
    }, [currentChat])
    const handelSendMsg = async (msg) => {
        await axios.post(sendMessageRoutes, {
            from: currentUser.id,
            to: currentChat.id,
            message: msg


        })
        socket.current.emit("send-msg", {
            to: currentChat.id,
            from: currentUser.id,
            message: msg
        })
        const msgs = [...message]
        msgs.push({ fromSelf: true, message: msg })
        setMessage(msgs)
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieved", (msg) => {
                setArivalMessage({ fromSelf: false, message: msg })
            })
        }
    }, [])

    useEffect(() => {
        arrivalMessage && setMessage((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
    }, [message])
    return (
        <div className='container flex flex-col items-center bg-gray-600 col-span-2 text-white relative '>
            <div className="user-details">
                <div className="username flex gap-72">
                    <h3 className='text-2xl'>{currentChat.username}</h3>
                    <Logout />
                </div>
            </div>
            <div className="chat-message relative">
                {message?.map((msg, index) => {
                    return (
                        <div key={index} className="  w-full ">
                            <div className={`message p-3 mb-1 rounded-md ${msg.fromSelf ? " bg-black  text-white" : " bg-blue-900 text-white"}`}>
                                {msg.message}
                            </div>
                        </div>
                    )
                })}
                {/* <Messages /> */}
            </div>
            <div className="chat-input absolute bottom-4">
                <ChatInput handelSendMsg={handelSendMsg} />
            </div>
        </div>
    )
}

export default ChatContainer