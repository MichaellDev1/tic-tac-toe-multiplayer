import { useContextGame } from '../../context/GameContext'
import Chat from '../Chat'
import ModelRoom from '../ModalRoom'

export default function HomeGame() {
  const { socket, idRoom, isCreate, handleCreateRoom, setCreate } = useContextGame()

  return <div style={{ display: 'flex' }} className='content-chat-more-game'>
    <div className='content-buttons'>

      <button className='btn' onClick={() => handleCreateRoom()}>Crear Sala</button>
      <button className='btn btn-two' onClick={() => setCreate(!isCreate)}>
        Unirse a una sala
      </button>

      <div className='content-create-sala'>
        {isCreate && <ModelRoom />
        }
      </div>
    </div>

    <Chat
      socket={socket}
      idRoom={idRoom}
      isGlobal={true} />
  </div>
}
