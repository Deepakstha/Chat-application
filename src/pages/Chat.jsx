import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { allUserRoutes, host } from '../utils/ApiRoutes'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import { io } from 'socket.io-client'

const Chat = () => {
    const socket = useRef()
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)
    const [currentChat, setCurrentChat] = useState(undefined)
    const navigate = useNavigate()
    const checkCurrentUser = async () => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate('/login')
        } else {
            setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
        }
    }
    const fetchCurrentUserData = async () => {
        const data = await axios.get(`${allUserRoutes}/${currentUser.id}`)
        setContacts(data.data.users)
    }
    useEffect(() => {
        checkCurrentUser()
    }, [])

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host)
            socket.current.emit("addUser", currentUser.id)
        }
    }, [currentUser])




    useEffect(() => {
        if (currentUser) {
            fetchCurrentUserData()
        }
    }, [currentUser])
    const handelChatChange = (chat) => {
        setCurrentChat(chat)
    }
    return (
        <div className='flex flex-col justify-center items-center gap-5 w-full h-screen bg-slate-800'>
            <div className='container w-9/12 h-4/6 bg-slate-500 grid grid-cols-3 '>
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handelChatChange} />
                {currentChat == undefined ? (<Welcome currentUser={currentUser} />) : (<ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket} />)}

            </div>
        </div>
    )
}

export default Chat