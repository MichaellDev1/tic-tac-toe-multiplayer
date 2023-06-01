import React, { useEffect, useState } from 'react'

export default function ChatSingle({ socket, idRoom }) {
    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<object[]>([])

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (message.trim() !== '') {
            setMessages(lastMessages => [...lastMessages, {
                from: 'you',
                message
            }])
            socket.emit('createMessageSingle', message, idRoom)
            setMessage('')
        }

        console.log(messages)
    }

    const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setMessage(e.target.value)
    }

    useEffect(() => {
        socket.on('newMessageSingle', (message: string) => {
            setMessages(lastMessages => [...lastMessages, {
                from: 'he',
                message
            }])
        })

        return () => socket.off('newMessageSingle')
    }, [socket])

    const [showMenu, setShowMenu] = useState(false)

    const handleShowMenu = () => {
        setShowMenu(!showMenu)
    }

    return <div className='chat' style={{ transform: `translateX(${showMenu ? '-400px' : '0px'})` }}>
        <div className="content-btn-open-chat">
            <button className="btn-open-chat" onClick={handleShowMenu}>Chat</button>
        </div>
        <h3 className="title-chat">Single chat</h3>

        <div className="content-message-input">
            <ul className='content-messages'>
                {messages.map(msg => <li className={`${msg.from == 'you' ? 'messageYou' : 'messageAll'}`}>
                    <div>
                        {msg.message}
                    </div>
                </li>)}
            </ul>
            <form action="" onSubmit={handleSendMessage}>
                <input type="text" onChange={handleChangeMessage} value={message} />
                <button>Send</button>
            </form>
        </div>

    </div>
}
