import ReactDOM from "react-dom"
import { useContextGame } from "../../context/GameContext"

export default function ModalWinner() {
  const { win, handleResetGame, empate, player, setFullRoom, setEnemy, setIdRoom } = useContextGame()

  const handleExitRoom = () => {
    setIdRoom(null)
    setFullRoom(false)
    setEnemy(null)
  }

  return win || empate ? ReactDOM.createPortal(<div className="modal-winner">
    <div className="modal-winner-or-empate">
      {win ? win == player ? <h3>Winner!!!</h3> : <h3>Game over!!!</h3> : empate && <h3>Tie!!!</h3>}

      {win || empate && <div className="content-button-modal">

        <button onClick={() => handleResetGame(true)}>Reset game</button>
        <button onClick={() => handleExitRoom()}>Exit</button>

      </div>
      }
      
    </div>
  </div>, document.getElementById('modals') as HTMLElement) : null
}
