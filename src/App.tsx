import { useEffect, useMemo, useState } from 'react'
import { connect } from "socket.io-client";
import './app.css'
import TicTacToeContent from './components/TicTacToeContent';

function App() {
  //Socket
  const socket = useMemo(() => connect("http://localhost:3000"), [])

  //States
  const [isCreate, setCreate] = useState(false)
  const [isFullRoom, setFullRoom] = useState(false)
  const [idRoom, setIdRoom] = useState<null | string>(null)
  const [roomEnter, setEnterRoom] = useState<string>('')
  const [enemy, setEnemy] = useState(false)

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

    socket.on('start', (start) => {
      setEnemy(true)
    })

    socket.on('disconnectUser', (me) => {
      setEnemy(false)
    })

    socket.on('notAuthorization', (err) => {
      setFullRoom(true)
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
    {
      !idRoom && <div className='content-buttons'>
        <button className='btn' onClick={() => handleCreateRoom()}>Crear Sala</button>
        <button className='btn' onClick={() => setCreate(!isCreate)}>Unirse a una sala</button>
        <div className='content-create-sala'>
          {isCreate && <div className={`content-num-sala`}>
            <form onSubmit={handleEnterDoom}>
              <input type="text" autoFocus={isCreate} value={roomEnter} onChange={handleChangeRoom} placeholder='Numero de la sala' />
              <button>Start</button>
            </form>
          </div>}
        </div>
      </div>
    }

    {
      idRoom
      && !enemy && !isFullRoom
      && <div style={{ textAlign: 'center' }}>
        <h3 className='text-time'>Esperando un convatiente...</h3>
        <span>Id de la sala: {idRoom}</span>
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

    {
      enemy && !isFullRoom && <TicTacToeContent socket={socket} idRoom={idRoom} />
    }


  </main>
}

export default App
