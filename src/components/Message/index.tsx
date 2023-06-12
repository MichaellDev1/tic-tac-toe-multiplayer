interface Props {
  from: string
  message: string
}

export default function Message({ from, message }: Props) {
  return (
    <li className={`${from == 'you' ? 'messageYou' : 'messageAll'}`}>
      <div>{message}</div>
    </li>
  )
}
