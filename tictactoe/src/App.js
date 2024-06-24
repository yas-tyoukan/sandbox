import React, { useState } from 'react';
import styled from 'styled-components';
import Board from './Board';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Status = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
`;

const ResetButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isRedNext, setIsRedNext] = useState(true);
  const [redCircles, setRedCircles] = useState(Array(9).fill(0));
  const [blueCircles, setBlueCircles] = useState(Array(9).fill(0));

  const handleClick = (i) => {
    const squaresCopy = squares.slice();
    const redCirclesCopy = redCircles.slice();
    const blueCirclesCopy = blueCircles.slice();

    if (calculateWinner(squares) || squaresCopy[i]) {
      return;
    }

    squaresCopy[i] = isRedNext ? 'R3' : 'B3';

    if (isRedNext) {
      redCirclesCopy[i] = 3;
      for (let j = 0; j < redCirclesCopy.length; j++) {
        if (redCirclesCopy[j] > 0 && j !== i) {
          redCirclesCopy[j]--;
          if (redCirclesCopy[j] === 0) {
            squaresCopy[j] = null;
          } else {
            squaresCopy[j] = `R${redCirclesCopy[j]}`;
          }
        }
      }
    } else {
      blueCirclesCopy[i] = 3;
      for (let j = 0; j < blueCirclesCopy.length; j++) {
        if (blueCirclesCopy[j] > 0 && j !== i) {
          blueCirclesCopy[j]--;
          if (blueCirclesCopy[j] === 0) {
            squaresCopy[j] = null;
          } else {
            squaresCopy[j] = `B${blueCirclesCopy[j]}`;
          }
        }
      }
    }

    setSquares(squaresCopy);
    setRedCircles(redCirclesCopy);
    setBlueCircles(blueCirclesCopy);
    setIsRedNext(!isRedNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setRedCircles(Array(9).fill(0));
    setBlueCircles(Array(9).fill(0));
    setIsRedNext(true);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner[0] === 'R' ? 'Red' : 'Blue'}`
    : `Next player: ${isRedNext ? 'Red' : 'Blue'}`;

  return (
    <AppContainer>
      <Status>{status}</Status>
      <Board squares={squares} onClick={(i) => handleClick(i)} />
      <ResetButton onClick={handleReset}>Reset</ResetButton>
    </AppContainer>
  );
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
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[b] &&
      squares[c] &&
      squares[a][0] === squares[b][0] &&
      squares[a][0] === squares[c][0]
    ) {
      return squares[a];
    }
  }

  return null;
}

export default App;
