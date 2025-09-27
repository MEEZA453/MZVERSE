'use client'
import React from 'react';
import styled from 'styled-components';

const ButtonLoader = ({ color }) => {
  return (
    <StyledWrapper color={color} className="flex items-center justify-center">
      <div className="loader"></div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    border: 2px solid ${({ color }) => color || "rgba(0,0,0,0.1)"};
    border-left-color: transparent;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    animation: spin89345 1.5s linear infinite;
  }

  @keyframes spin89345 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default ButtonLoader;

