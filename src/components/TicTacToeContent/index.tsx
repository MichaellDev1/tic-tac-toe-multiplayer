import React, { useEffect, useState } from 'react'
import Square from '../Square'


export default function TicTacToeContent({ socket, idRoom }) {
  const [boards, setBoards] = useState(Array(9).fill(null))
  useEffect(() => {
    socket.on('gameEnemy', (inx: number) => {
      boards[inx] = 'o'
      setBoards(boards)
    })
  }, [socket])

  const handlePlayBoard = (inx: number) => {
    boards[inx] = 'x'
    setBoards(boards)
    socket.emit('gameBoard', inx, idRoom)
  }


  return <div className='content-boards'>
    {
      boards.map((board, inx) => <Square handlePlayBoard={handlePlayBoard} value={boards} inx={inx} />)
    }
  </div>
}
