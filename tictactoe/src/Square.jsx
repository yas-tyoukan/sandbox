import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: 100px;
    height: 100px;
    background: white;
    border: 1px solid #999;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const Circle = styled.div`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    border-radius: 50%;
    border: 2px solid ${({ color }) => color};
    position: absolute;
`;

function Square({ value, onClick }) {
    const renderCircle = () => {
        if (!value) return null;
        const color = value[0] === 'R' ? 'red' : 'blue';
        if (value[1] === '3') {
            return (
                <>
                    <Circle color={color} size={60} />
                    <Circle color={color} size={40} />
                    <Circle color={color} size={20} />
                </>
            );
        }
        if (value[1] === '2') {
            return (
                <>
                    <Circle color={color} size={40} />
                    <Circle color={color} size={20} />
                </>
            );
        }
        if (value[1] === '1') {
            return <Circle color={color} size={20} />;
        }
    };

    return <Button onClick={onClick}>{renderCircle()}</Button>;
}

export default Square;
