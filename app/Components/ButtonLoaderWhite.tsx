'use client'
import React from 'react';
import styled from 'styled-components';

const ButtonLoaderWhite = () => {
  return (
    <StyledWrapper className=' flex items-center justify-center'>
      <svg viewBox="25 25 50 50">
        <circle r={8} cy={50} cx={50} />
      </svg>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  svg {
   width: 2em;
   transform-origin: center;
   animation: rotate4 2s linear infinite;
  }

  circle {
   fill: none;
   stroke: hsl(0, 0%, 100%);
   stroke-width: 1;
   stroke-dasharray: 1, 200;
   stroke-dashoffset: 0;
   stroke-linecap: round;
   animation: dash4 1.5s ease-in-out infinite;
  }

  @keyframes rotate4 {
   100% {
    transform: rotate(360deg);
   }
  }

  @keyframes dash4 {
   0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
   }

   50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
   }

   100% {
    stroke-dashoffset: -125px;
   }
  }`;

export default ButtonLoaderWhite;
