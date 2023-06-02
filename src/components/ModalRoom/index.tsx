import ReactDOM from 'react-dom'

export default function ModelRoom({ handleChangeRoom, handleEnterDoom, roomEnter, isCreate, setCreate }) {
  return ReactDOM.createPortal(<div className='modal-enter-room'>
    <div className='close-room' onClick={()=> setCreate(last=> !last)}></div>
    <div className={`content-num-sala`}>
      <form onSubmit={handleEnterDoom}>
        <input type="text" autoFocus={isCreate} value={roomEnter} onChange={handleChangeRoom} placeholder='Numero de la sala' />
        <button>Start</button>
      </form>
    </div>
  </div>, document.getElementById('modals'))
}
