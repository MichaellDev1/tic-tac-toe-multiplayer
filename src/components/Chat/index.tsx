import React from 'react'
import useMessage from '../../hooks/useMessage'
import Message from '../Message'

export default function Chat({ socket, idRoom, isGlobal = false }: any) {
  const { message, messages, setMessage, setMessages, showMenu, setShowMenu, refElement } = useMessage({ socket, global: isGlobal })

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (message.trim() !== '') {
      setMessages(lastMessages => [...lastMessages, { from: 'you', message }])

      socket.emit(isGlobal
        ? 'createMessageGlobal'
        : 'createMessageSingle', message, idRoom)
      setMessage('')
    }
  }

  const handleShowMenu = (): void => {
    setShowMenu(!showMenu)
  }

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value)
  }

  return <div className={`chat ${showMenu ? 'menuOpen' : 'menuHidden'}`} >
    <div className="content-btn-open-chat">
      <button className="btn-open-chat" onClick={handleShowMenu}>Chat</button>
    </div>

    <div className="content-message-input">
      <h3 className="title-chat">{isGlobal ? 'Chat global' : 'Chat single'}</h3>

      <ul className='content-messages' ref={refElement}>
        {messages.length > 0
          ? messages.map((msg: any) => <Message from={msg.from} message={msg.message} />)
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
