import Spinner from '../../Spinner'
import { useContextGame } from '../../context/GameContext'
import ButtonBack from '../ButtonBack'

export default function EnemyLoading() {
  const { idRoom } = useContextGame()

  return (
    <div className='content-loading-game'>
      <h3 className='text-time'>Esperando a un oponente...</h3>
      <span>Id de sala: {idRoom}</span>
      <div className='content-spinner'><Spinner /></div>
      <ButtonBack />
    </div>
  )
}
