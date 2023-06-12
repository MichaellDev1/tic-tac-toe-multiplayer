import React from 'react'
import classNames from 'classnames'

interface Props {
  handlePlayBoard: Function
  value: string | null
  inx: number
}

function Square({ handlePlayBoard, value, inx }: Props) {
  let squareClass = classNames({
    board: true,
    [`square-${value}`]: value !== null
  })

  return (
    <div
      className={squareClass}
      onClick={() => handlePlayBoard(inx)} />
  )
}

export default React.memo(Square)