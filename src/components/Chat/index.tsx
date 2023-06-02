import React from 'react'
import useMessage from '../../hooks/useMessage'

export default function Chat({ socket, idRoom, isGlobal = false }: any) {
  const { message, messages, setMessage, setMessages, showMenu, setShowMenu } = useMessage({ socket, global: isGlobal })

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (message.trim() !== '') {
      setMessages(lastMessages => [...lastMessages, {
        from: 'you',
        message
      }])
      socket.emit(isGlobal
        ? 'createMessageGlobal'
        : 'createMessageSingle', message, idRoom)
      setMessage('')
    }
  }

  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value)
  }

  return <div className='chat' style={{ transform: `translateX(${showMenu ? '-350px' : '0px'})` }}>
    <div className="content-btn-open-chat">
      <button className="btn-open-chat" onClick={handleShowMenu}>Chat</button>
    </div>
    <h3 className="title-chat">{isGlobal ? 'Chat global' : 'Chat single'}</h3>

    <div className="content-message-input">
      <ul className='content-messages'>
        {
          messages.length > 0
            ? messages.map((msg: any) => (
              <li className={`${msg.from == 'you' ? 'messageYou' : 'messageAll'}`}>
                <div>
                  {msg.message}
                </div>
              </li>
            ))
            : <h3 className='not-message'>Aun no hay mensajes...</h3>
        }
      </ul>
      <form action="" onSubmit={handleSendMessage} className="form-new-message" >
        <input type="text" className="input-message" onChange={handleChangeMessage} value={message} placeholder='Message' />
        <button className="btn-send-msg"></button>
      </form>
    </div>
  </div>
}
