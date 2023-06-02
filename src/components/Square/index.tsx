import classNames from 'classnames'

export default function Square({ handlePlayBoard, value, inx }: any) {
    let squareClass = classNames({
        board: true,
        [`square-${value}`]: value !== null
    })
    return <div className={squareClass} onClick={() => handlePlayBoard(inx)}>
    </div>
}
