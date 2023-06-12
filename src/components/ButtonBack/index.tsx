import ArrowIcon from '../Icon'
import { useContextGame } from '../../context/GameContext'

export default function ButtonBack() {
  const { setIdRoom, setFullRoom, setEnemy } = useContextGame()

  const handleBackGame = () => {
    setIdRoom(null)
    setFullRoom(false)
    setEnemy(null)
  }

  return (
    <button onClick={handleBackGame} className='btn-back'>
      <span><ArrowIcon /></span>
      <span>Back</span>
    </button>
  )
}
