import { useState } from 'react';

export default function Game() {
    // const [squares, setSquares] = useState(Array(9).fill(null));
    const [history, setHistory] = useState([Array(9).fill(null)]);
    function changeBoard(newBoard) {
        console.log(history, "Its history")
        console.log(newBoard)
        const newHistory = history.slice();
        setHistory(newHistory.push(newBoard))
    }
    return (
        <>
            <Board squaresOfBoard={history[0]} setSquares={changeBoard} />
        </>
    )
}

function Board({ squaresOfBoard, setSquares }) {
    const [xIsNext, setXIsNext] = useState(true);
console.log(squaresOfBoard, "adsgsdgsthrstt")
    const winner = calculateWinner(squaresOfBoard);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "0")
    }
    function handleClick(i) {
        if (
            squaresOfBoard[i] || calculateWinner(squaresOfBoard)
        ) {
            return;
        }
        const nextSquares = squaresOfBoard.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    return (
        <>
            <div className='status'>{status}</div>
            <div className="board-row">
                <Square value={squaresOfBoard[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squaresOfBoard[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squaresOfBoard[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squaresOfBoard[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squaresOfBoard[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squaresOfBoard[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squaresOfBoard[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squaresOfBoard[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squaresOfBoard[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    )
}

function Square({ value, onSquareClick }) {

    return <button className="square" onClick={onSquareClick}>{value}</button>
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if
            (
            (squares[a])
            &&
            (squares[a] === squares[b])
            &&
            (squares[a] === squares[c])
        ) {
            return squares[a];
        }
    }
    return null;
}