import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  width: 450px;
  max-width: 90%;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  position: relative;

  @media (max-width: 480px) {
    padding: 20px;
    width: 95%;
  }
`;

const CloseButton = styled.button`
  background: #dc3545;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;

export default function Modal({ children, onClose }) {
  return (
    <ModalWrapper>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
}
