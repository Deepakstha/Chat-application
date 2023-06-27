import { useState, useEffect } from 'react'

const Contacts = ({ currentUser, contacts, changeChat }) => {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)
    useEffect(() => {
        if (currentUser) {
            setCurrentUserName(currentUser.username)
        }
    }, [currentUser])

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index)
        changeChat(contact)
    }
    return (
        <>
            {currentUserName && (
                <div className="container">
                    <div className="logo font-semibold text-2xl text-white">Chats</div>
                    <div className="contacts">
                        {contacts.map((contact, index) => {
                            return (
                                <div className={`contact mb-1 bg-slate-300 rounded-sm text-center cursor-pointer p-1 m-1 ${index === currentSelected ? " bg-black text-white" : ""} `} key={index} onClick={() => changeCurrentChat(index, contact)}>
                                    <div className="username selected">
                                        <h3>{contact.username}</h3>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                    <div className="currentUser">
                        <div className="username">
                            <h3>{currentUserName}</h3>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default Contacts