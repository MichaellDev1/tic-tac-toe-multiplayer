import { useEffect, useState } from 'react'
import Square from '../Square'
import { Socket } from 'socket.io-client';

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

interface Props {
  socket: Socket,
  idRoom: string | null
  player: string | ''
}

export default function TicTacToeContent({ socket, idRoom, player }: Props) {
  const [boards, setBoards] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState('x')

  useEffect(() => {
    socket.on('gameEnemy', (turnSelected: string, newSquares) => {
      setTurn(turnSelected)
      setBoards(newSquares);
    })
  }, [socket])


  const handlePlayBoard = (inx: number) => {
    if (boards[inx] == null && turn == player) {

      let newSquares = [...boards]
      newSquares.splice(inx, 1, player);
      setBoards(newSquares);

      socket.emit('gameBoard', idRoom, newSquares)
      setTurn(turn == 'x' ? 'o' : 'x')

    }
  }



  return <div>
    <h3>{player == turn ? 'Your turn' : 'Enemy turn'}</h3>
    <div className='content-boards'>
      {
        boards.map((board, inx) => <Square handlePlayBoard={handlePlayBoard} value={boards[inx]} inx={inx} />)
      }
    </div>
  </div>
}
