import { useEffect, useState } from 'react'
import Square from '../Square'
import Chat from '../Chat';
import { winningPositions } from '../../utils/positionsWinner';
import winSoundEffect from '../../../asset/sound/win.mp3'
import gameOverSound from '../../../asset/sound/gameover.mp3'
import ModalWinner from '../ModalWinner';
import { useContextGame } from '../../context/GameContext';
import ButtonBack from '../ButtonBack';

export default function TicTacToeContent() {
  const [turn, setTurn] = useState<string>('x')
  const [win, setWin] = useState<null | string>(null)
  const [empate, setEmpate] = useState<boolean>(false)
  const { socket, idRoom, player, boards, setBoards, handleExitRoom } = useContextGame()

  const soundActive = (url: string): Promise<void> => {
    const gameSound = new Audio(url)
    return gameSound.play()
  }

  const verifyWin = (boardsVerify: Array<null | string>) => {
    winningPositions.forEach(([a, b, c]) => {
      if (boardsVerify[a] !== null
        && boardsVerify[a] == boardsVerify[b]
        && boardsVerify[b] == boardsVerify[c]) {

        player == boardsVerify[a]
          ? soundActive(winSoundEffect)
          : soundActive(gameOverSound)

        return setWin(boardsVerify[a])
      }

      if (!boardsVerify.includes(null)) return setEmpate(true)
    })
  }

  useEffect(() => {
    socket.on('gameEnemy', (turnSelected: string, newSquares: Array<null | string>) => {
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

      socket.on('resetGame', () => {
        handleResetGame(false)
      })
    }
  }

  const handleResetGame = (isEmit: boolean) => {
    if (isEmit) socket.emit('resetGame', idRoom)
    setBoards(Array(9).fill(null))
    setEmpate(false)
    setWin(null)
  }

  return (
    <div className='content-chat-more-game'>

      <div>
        <h3 className='turn-selected'>{!win ? player == turn ? 'Your turn' : 'Enemy turn' : null}</h3>
        <div className='content-boards'>
          {boards.map((board: Array<null | string>, inx: number) =>
            <Square key={inx} handlePlayBoard={handlePlayBoard} value={boards[inx]} inx={inx} />)}
        </div>

        <div className='content-reset-and-game-turn'>
          <div className='content-info-turn'>
            <span>You: <span className={player == 'x' ? 'player-cross' : 'player-circle'}>{player}</span></span>
            <span> Enemy: <span className={player == 'x' ? 'player-circle' : 'player-cross'}>{player == 'x' ? 'O' : 'X'}</span></span>
          </div>
          <div className='content-button-back'>
            <ButtonBack />
          </div>
        </div>
        <ModalWinner empate={empate} handleResetGame={handleResetGame} player={player} win={win} handleExitRoom={handleExitRoom} />
      </div>

      <Chat socket={socket} idRoom={idRoom} isGlobal={false} />
    </div>
  )
}
