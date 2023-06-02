import { useEffect, useRef, useState } from "react"
import sound from '../../asset/sound/soundNewMessage.mp3'


export default function useMessage({ socket, global = false }: any) {
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<object[]>([])
  const [showMenu, setShowMenu] = useState(false)
  const refElement = useRef()

  useEffect(() => {

    if (refElement.current) {
      refElement.current.scrollTop = refElement.current.scrollHeight;
      socket.on(global ? 'newMessageGlobal' : 'newMessageSingle', (message: string) => {

        const audio = new Audio(sound)
        audio.play()
        setMessages(lastMessages => [...lastMessages, {
          from: 'all',
          message
        }])
      })
      return () => socket.off(global ? 'newMessageGlobal' : 'newMessageSingle')
    }
  }, [socket, messages])

  return { message, messages, setMessages, setMessage, showMenu, setShowMenu, refElement }
}
