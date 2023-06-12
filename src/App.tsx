import { useEffect } from 'react'
import TicTacToeContent from './components/TicTacToeContent';
import backgroundSvg from '../asset/svg/Sprinkle.ffea3143.svg'
import RoomFull from './components/RoomFull';
import EnemyLoading from './components/EnemyLoading';
import HomeGame from './components/HomeGame';
import { useContextGame } from './context/GameContext';
import './app.css'

function App() {
  const { setEnemy, setPlayer, setBoards, setFullRoom, idRoom, enemy, isFullRoom, socket } = useContextGame()

  useEffect(() => {
    socket.on('startGame', (romm: string) => {
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
    socket.on('turnSelected', (tu: string) => {
      setPlayer(tu)
    })
  }, [socket])


  return (
    <main className='main-content'>
      <img src={backgroundSvg} alt="svg image background" className='background-svg' />

      {!idRoom 
      && <HomeGame />}
      {idRoom 
        && !enemy 
        && !isFullRoom 
        && <EnemyLoading />}
  
      {isFullRoom 
        && idRoom 
        && <RoomFull />}

      {enemy 
        && !isFullRoom 
        && <TicTacToeContent />}
  
    </main>
  )
}

export default App
