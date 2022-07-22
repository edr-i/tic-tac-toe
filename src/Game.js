import { useState } from 'react';


function Square(props) {
    return (
        <button disabled={props.gameOver} onClick={props.setMove}>
            {props.value}
        </button>
    )
}

function Board() {
    const [squares, setSquares] = useState(Array(9).fill("-"));
    const [xIsNext, setXIsNext] = useState(true)

    function handleClick(index) {
        const clonedSquares = squares.slice()

        if (clonedSquares[index] != "-") {
            return
        }

        // clonedSquares[index] = xIsNext ? "X" : "O"
        // setXIsNext(!xIsNext)

        if (xIsNext) {
            clonedSquares[index] = "X"
            setXIsNext(false)
        } else {
            clonedSquares[index] = "O"
            setXIsNext(true)
        }

        const winner = checkWinner(clonedSquares)
        if (winner) {
            console.log("The winner is " + winner + "!")
        }

        setSquares(clonedSquares)
    }

    function renderSquare(index) {
        return (
            <Square value={squares[index]} setMove={() => handleClick(index)} gameOver={checkWinner(squares)}/>
        )
    }

    function checkWinner(squares) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i]
            if((squares[a] != "-") && (squares[a] == squares[b] && squares[b] == squares[c])) {
                return squares[a]
            }

        }
    }

    function resetBoard() {
        setSquares(Array(9).fill("-"))
    }

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>

            <button onClick={resetBoard}>Reset</button>
        </div>
    )
}

function Game() {
    return (
        <Board />
    )
}

export default Game;