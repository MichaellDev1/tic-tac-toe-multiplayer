import { useEffect, useState } from 'react'
import Square from '../Square'
import { Socket } from 'socket.io-client';
import ChatSingle from '../ChatSingle';

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
  setBoards: React.Dispatch<React.SetStateAction<any[]>>,
  boards: Array<null | string>
}

export default function TicTacToeContent({ socket, idRoom, player, boards, setBoards }: Props) {
  const [turn, setTurn] = useState('x')
  const [win, setWin] = useState<null | string>(null)

  const verifyWin = (boardsVerify: Array<null | string>) => {
    winningPositions.forEach(([a, b, c]) => {
      if (boardsVerify[a] !== null && boardsVerify[a] == boardsVerify[b] && boardsVerify[b] == boardsVerify[c]) {
        setWin(boardsVerify[a])
      }
    })
  }

  useEffect(() => {
    socket.on('gameEnemy', (turnSelected: string, newSquares) => {
      setTurn(turnSelected)
      verifyWin(newSquares)
      setBoards(newSquares);
    })
  }, [socket])


  const handlePlayBoard = (inx: number) => {
    if (boards[inx] == null && turn == player && !win) {

      let newSquares = [...boards]
      newSquares.splice(inx, 1, player);
      setBoards(newSquares);

      socket.emit('gameBoard', idRoom, newSquares)

      verifyWin(newSquares)
      setTurn(turn == 'x' ? 'o' : 'x')

    }
  }

  return <div className='content-chat-more-game'>
    <div>
      <h3>{!win
        ? player == turn
          ? 'Your turn'
          : 'Enemy turn'
        : null}</h3>

      <div className='content-boards'>
        {
          boards.map((board, inx) => <Square handlePlayBoard={handlePlayBoard} value={boards[inx]} inx={inx} />)
        }
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>  Your: <span style={{ textTransform: 'uppercase' }}>{player}</span></span>
        <span> Enemy: {player == 'x' ? 'O' : 'X'}</span>
      </div>

      {win
        ? win == player
          ? <h3>GANASTEEE!!!</h3>
          : <h3>PERDISTEEEE!!!</h3>
        : null}
    </div>

    <ChatSingle
      socket={socket}
      idRoom={idRoom} />

  </div>
}
