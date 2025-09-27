import React from 'react';
import styled from 'styled-components';
import { useThemeContext } from '../Context/ThemeContext';

const Loading = () => {
  const { isLightMode } = useThemeContext();
  return (
    <StyledWrapper
      isLightMode={isLightMode}
      className="h-60 w-screen lg:w-full flex items-center justify-center"
    >
      <div className="loader" />
    </StyledWrapper>
  );
};

// 👇 Define props type
interface WrapperProps {
  isLightMode: boolean;
}

const StyledWrapper = styled.div<WrapperProps>`
  .loader {
    border: 2px solid
      ${({ isLightMode }) =>
        isLightMode ? 'rgba(0, 0, 0, .6)' : 'rgba(255, 255, 255, 0.6)'};
    border-left-color: transparent;
    border-radius: 50%;
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
  }
`;

export default Loading;
