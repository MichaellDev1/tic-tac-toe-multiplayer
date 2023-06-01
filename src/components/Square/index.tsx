import React from 'react'
import classNames from 'classnames'

export default function Square({ handlePlayBoard, value, inx }) {

    let squareClass = classNames({
        board: true,
    })

    return <div className={squareClass} onClick={handlePlayBoard(inx)}>

    </div>
}
