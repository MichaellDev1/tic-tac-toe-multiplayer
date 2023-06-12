import ReactDOM from 'react-dom'
import { useContextGame } from '../../context/GameContext'

export default function ModelRoom() {
  const {handleChangeRoom, handleEnterDoom, roomEnter, isCreate, setCreate } = useContextGame()
  
  return ReactDOM.createPortal(<div className='modal-enter-room'>
    <div className='close-room' onClick={() => setCreate((last: any) => !last)}></div>
    <div className={`content-num-sala`}>
      <form onSubmit={handleEnterDoom}>
        <input type="text" autoFocus={isCreate} value={roomEnter} onChange={handleChangeRoom} placeholder='Numero de la sala' />
        <button>Start</button>
      </form>
    </div>
  </div>, document.getElementById('modals') as HTMLElement)
}
