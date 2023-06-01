import { useEffect, useState } from "react"

export default function ChatGlobal({ socket }) {
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<object[]>([])

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (message.trim() !== '') {
      setMessages(lastMessages => [...lastMessages, {
        from: 'you',
        message
      }])
      socket.emit('createMessageGlobal', message)
      setMessage('')
    }
  }

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    socket.on('newMessageGlobal', (message: string) => {
      setMessages(lastMessages => [...lastMessages, {
        from: 'all',
        message
      }])
    })

    return () => socket.off('newMessageGlobal')
  }, [socket])

  const [showMenu, setShowMenu] = useState(false)

  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  return <div className="chat" style={{ transform: `translateX(${showMenu ? '-400px' : '0px'})` }}>
    <div className="content-btn-open-chat">
      <button className="btn-open-chat" onClick={handleShowMenu}>Chat</button>
    </div>
    <h3 className="title-chat">Chat Global</h3>

    <div className="content-message-input">
      <ul className='content-messages'>
        {
          messages.length > 0 ? messages.map(msg => <li className={`${msg.from == 'you' ? 'messageYou' : 'messageAll'}`}>
            <div>
              {msg.message}
            </div>
          </li>) : <h3 className='not-message'>Aun no hay mensajes...</h3>
        }
      </ul>
      <form action="" onSubmit={handleSendMessage} className="form-new-message">
        <input type="text" className="input-message" placeholder="Message" onChange={handleChangeMessage} value={message} />
        <button className="btn-send-msg">

          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
          </svg>

        </button>
      </form>
    </div>

  </div>
}
