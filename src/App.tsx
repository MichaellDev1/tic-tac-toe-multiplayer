import { useEffect, useMemo, useState } from 'react'
import { connect } from "socket.io-client";

import TicTacToeContent from './components/TicTacToeContent';
import Spinner from './Spinner';
import backgroundSvg from '../asset/svg/Sprinkle.ffea3143.svg'
import ModelRoom from './components/ModalRoom';
import Chat from './components/Chat';

import './app.css'

function App() {
  //Socket
  const socket = useMemo(() => connect(import.meta.env.VITE_API_SERVER), [])

  //States
  const [isCreate, setCreate] = useState(false)
  const [isFullRoom, setFullRoom] = useState(false)
  const [idRoom, setIdRoom] = useState<null | string>(null)
  const [roomEnter, setEnterRoom] = useState<string>('')
  const [enemy, setEnemy] = useState(false)
  const [player, setPlayer] = useState('')
  const [boards, setBoards] = useState(Array(9).fill(null))

  const handleCreateRoom = (): void => {
    const numRandom = Math.floor(Math.random() * 20000).toString()
    socket.emit('joinRoom', numRandom)
    setIdRoom(numRandom)
  }

  useEffect(() => {
    socket.on('startGame', (romm) => {
      socket.emit('verify', romm)
      setEnemy(true)
    })

    socket.on('start', () => setEnemy(true))
    socket.on('disconnectUser', () => {
      setEnemy(false)
      setPlayer('x')
      setBoards(Array(9).fill(null))
    })
    socket.on('notAuthorization', () => setFullRoom(true))
    socket.on('turnSelected', (tu) => {
      setPlayer(tu)
    })
  }, [socket])

  const handleEnterDoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (roomEnter.trim() != '') {
      setIdRoom(roomEnter)
      socket.emit('joinRoom', roomEnter)
    }
  }

  const handleChangeRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnterRoom(e.target.value)
  }

  return <main className='main-content'>
    <img src={backgroundSvg} alt="" style={{ width: '100%', minHeight: '118vh', objectFit: 'cover', position: 'absolute', zIndex: '-1' }} />
    {
      !idRoom
      && <div style={{ display: 'flex' }} className='content-chat-more-game'>
        <div className='content-buttons'>
          <button className='btn' onClick={() => handleCreateRoom()}>Crear Sala</button>
          <button className='btn btn-two' onClick={() => setCreate(!isCreate)}>Unirse a una sala</button>
          <div className='content-create-sala'>
            {isCreate
              && <ModelRoom
                handleChangeRoom={handleChangeRoom}
                handleEnterDoom={handleEnterDoom}
                isCreate={isCreate}
                roomEnter={roomEnter}
                setCreate={setCreate} />}
          </div>
        </div>
        <Chat socket={socket} idRoom={idRoom} isGlobal={true} />
      </div>
    }

    {
      idRoom
      && !enemy && !isFullRoom
      && <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <h3 className='text-time'>Esperando a un oponente...</h3>
        <span>Id de sala: {idRoom}</span>
        <div className='content-spinner'>
          <Spinner />
        </div>
      </div>
    }

    {
      isFullRoom && idRoom && <div>
        <h3>Full room, plece select other room</h3>
        <button onClick={() => {
          setIdRoom(null)
          setFullRoom(false)
        }}>Back</button>
      </div>
    }

    {enemy && !isFullRoom && <TicTacToeContent socket={socket} player={player} idRoom={idRoom} setBoards={setBoards} boards={boards} />}
  </main>
}

export default App
