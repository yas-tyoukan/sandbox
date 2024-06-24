import React from 'react';
import styled from 'styled-components';
import Square from './Square';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
`;

function Board({ squares, onClick }) {
  return (
    <BoardContainer>
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </BoardContainer>
  );
}

export default Board;
