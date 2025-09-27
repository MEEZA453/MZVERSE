import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return (
    <StyledWrapper className=' h-60 w-screen lg:w-full flex items-center justify-center'>
      <div className="loader" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    border: 2px solid rgba(0, 0, 0, .1);
    border-left-color: transparent;
    border-radius: 50%;
  }

  .loader {
    border: 4px solid rgba(0, 0, 0, .1);
    border-left-color: transparent;
    width: 18px;
    height: 18px;
  }

  .loader {
    border: 2px solid rgba(0, 0, 0, .6);
    border-left-color: transparent;
    width: 20px;
    height: 20px;
    animation: spin89345 1.5s linear infinite;
  }

  @keyframes spin89345 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }`;

export default Loading;
