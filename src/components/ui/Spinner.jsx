import { FaSpinner } from "react-icons/fa";
import styled, { keyframes } from 'styled-components';


const spinAnimation = keyframes`
  from {
    transform: rotate(90deg) scale(0.5);
  }
  to {
    transform: rotate(360deg) scale(0.5);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const Spinning = styled.div`
  animation: ${spinAnimation} 1s infinite;
`;


const Spinner = () => {
  return (
    <SpinnerContainer>
      <Spinning>
        <FaSpinner size="4rem" />
      </Spinning>
    </SpinnerContainer>
  );
};

export default Spinner;