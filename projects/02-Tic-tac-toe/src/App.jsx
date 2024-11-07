import { useState } from "react"
import { Square } from "./components/Square.jsx"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { Turns } from "./constants"
import { checkWinner } from "./Logic/board.js"
import confetti from "canvas-confetti"

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? Turns.X
  })
  const [winner, setWinner] = useState(null);



  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(Turns.X)
    setWinner(null)
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn')
  }

  const checkEnGame = (newBoard) => {
    // Revisamos si hay un empate
    return newBoard.every((square) => square !== null)
  }
  const updateBoard = (index) => {
    // Comprobar que el campo este vacio
    if (board[index] || winner) return

    // Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Actualizar el turno
    const newTurn = turn === Turns.X ? Turns.O : Turns.X
    setTurn(newTurn);
    // Guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    // Revisa si ell juego termino
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEnGame(newBoard)) {
      setWinner(false) // Empate
    }

  }
  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar Juego</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === Turns.X}>
          {Turns.X}
        </Square>
        <Square isSelected={turn === Turns.O}>
          {Turns.O}
        </Square>
      </section>


      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
