import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { connect } from "socket.io-client"

const ContextGame = createContext({})

interface Props {
  children: JSX.Element
}

export function GameContext({ children }: Props) {
  //States
  const [roomEnter, setEnterRoom] = useState<string>('')
  const [isCreate, setCreate] = useState<boolean>(false)
  const [isFullRoom, setFullRoom] = useState<boolean>(false)
  const [idRoom, setIdRoom] = useState<null | string>(null)
  const [enemy, setEnemy] = useState<boolean>(false)
  const [player, setPlayer] = useState<string>('')
  const [boards, setBoards] = useState(Array(9).fill(null))

  //Socket
  const socket = useMemo(() => connect(import.meta.env.VITE_API_SERVER), [])

  //Functions
  const handleEnterDoom = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (roomEnter.trim() != '') {
      setIdRoom(roomEnter)
      socket.emit('joinRoom', roomEnter)
    }
  }

  const handleChangeRoom = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEnterRoom(e.target.value)
  }

  const handleExitRoom = useCallback(() => {
    setIdRoom(null)
    setEnemy(false)
  }, [])

  const handleCreateRoom = (): void => {
    const numRandom = Math.floor(Math.random() * 20000).toString()
    socket.emit('joinRoom', numRandom)
    setIdRoom(numRandom)
  }

  return <ContextGame.Provider value={{
    isCreate,
    player,
    boards,
    enemy,
    isFullRoom,
    idRoom,
    socket,
    setPlayer,
    setBoards,
    setEnemy,
    setCreate,
    setFullRoom,
    setIdRoom,
    handleChangeRoom,
    handleCreateRoom,
    handleExitRoom,
    handleEnterDoom
  }}>
    {children}
  </ContextGame.Provider>
}

export const useContextGame = (): any => {
  const dataGame = useContext(ContextGame)
  return dataGame
}

export default ContextGame