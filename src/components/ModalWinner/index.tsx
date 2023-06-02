import ReactDOM from "react-dom"

export default function ModalWinner({ win, handleResetGame, empate, player }) {
    return win || empate ? ReactDOM.createPortal(<div className="modal-winner">
        <div className="modal-winner-or-empate">
            {win
                ? win == player
                    ? <h3>Game over!!!</h3>
                    : <h3>Winner!!!</h3>
                : empate && <h3>Tie!!!</h3>
            }
            {win || empate ? <div className="content-button-modal">
                <button onClick={() => handleResetGame(true)}>Reset game</button>
                <button>Exit</button>
            </div> : null}
        </div>
    </div>, document.getElementById('modals')) : null
}
