import React, { useState, useEffect } from 'react';
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
  const [isPlayerRed, setIsPlayerRed] = useState(true); // プレイヤーが赤かどうか
  const [redCircles, setRedCircles] = useState(Array(9).fill(0));
  const [blueCircles, setBlueCircles] = useState(Array(9).fill(0));
  const [isComputerOpponent, setIsComputerOpponent] = useState(false); // コンピュータ対戦かどうか

  useEffect(() => {
    if (isComputerOpponent && !isPlayerRed === isRedNext) {
      handleComputerMove();
    }
  }, [isRedNext, isPlayerRed, isComputerOpponent]);

  const handleClick = (i) => {
    if (isComputerOpponent && !isPlayerRed === isRedNext) return;

    const squaresCopy = squares.slice();
    const redCirclesCopy = redCircles.slice();
    const blueCirclesCopy = blueCircles.slice();

    if (calculateWinner(squares) || squaresCopy[i]) {
      return;
    }

    makeMove(i, squaresCopy, redCirclesCopy, blueCirclesCopy);
  };

  const handleComputerMove = () => {
    if (calculateWinner(squares)) {
      return;
    }

    const squaresCopy = squares.slice();
    const redCirclesCopy = redCircles.slice();
    const blueCirclesCopy = blueCircles.slice();

    const bestMove = calculateBestMove(squaresCopy, isRedNext ? 'R' : 'B');
    if (bestMove !== null) {
      makeMove(bestMove, squaresCopy, redCirclesCopy, blueCirclesCopy);
    }
  };


  const makeMove = (i, squaresCopy, redCirclesCopy, blueCirclesCopy) => {
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
    const isComputerGame = window.confirm("Do you want to play against the computer?");
    let playerGoesFirst = true;
    if (isComputerGame) {
      playerGoesFirst = window.confirm("Do you want to go first?");
    }
    setSquares(Array(9).fill(null));
    setRedCircles(Array(9).fill(0));
    setBlueCircles(Array(9).fill(0));
    setIsRedNext(playerGoesFirst);
    setIsPlayerRed(playerGoesFirst);
    setIsComputerOpponent(isComputerGame);
    if (isComputerGame && !playerGoesFirst) {
      setTimeout(handleComputerMove, 500); // 少し遅延を入れてコンピュータのターンを開始
    }
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
function calculateBestMove(squares, player) {
  const opponent = player === 'R' ? 'B' : 'R';

  // 1. 勝てる場所があればそこに置く
  let winningMove = findWinningMove(squares, player);
  if (winningMove !== null) return winningMove;

  // 2. 相手が勝てる場所を防ぐ
  let blockingMove = findWinningMove(squares, opponent);
  if (blockingMove !== null) return blockingMove;

  // 3. フォークの作成を試みる
  let forkMove = findForkMove(squares, player);
  if (forkMove !== null) return forkMove;

  // 4. 相手のフォークを防ぐ
  let blockingForkMove = findForkMove(squares, opponent);
  if (blockingForkMove !== null) return blockingForkMove;

  // 5. 中央を取る
  if (!squares[4]) return 4;

  // 6. 対角線の隅を取る
  const corners = [0, 2, 6, 8];
  for (let i = 0; i < corners.length; i++) {
    if (!squares[corners[i]]) return corners[i];
  }

  // 7. 残った空きマスに置く
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      return i;
    }
  }

  return null;
}

function findWinningMove(squares, player) {
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
    if (squares[a] === player && squares[b] === player && squares[c] === null) {
      return c;
    }
    if (squares[a] === player && squares[b] === null && squares[c] === player) {
      return b;
    }
    if (squares[a] === null && squares[b] === player && squares[c] === player) {
      return a;
    }
  }
  return null;
}


function findForkMove(squares, player) {
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

  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      squares[i] = player;
      let winningMoves = 0;
      for (let j = 0; j < lines.length; j++) {
        const [a, b, c] = lines[j];
        if (
            (squares[a] === player && squares[b] === player && !squares[c]) ||
            (squares[a] === player && !squares[b] && squares[c] === player) ||
            (!squares[a] && squares[b] === player && squares[c] === player)
        ) {
          winningMoves++;
        }
      }
      squares[i] = null;
      if (winningMoves >= 2) return i;
    }
  }
  return null;
}

export default App;
