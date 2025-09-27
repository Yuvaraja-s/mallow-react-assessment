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
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
`;

const CloseButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  float: right;
  cursor: pointer;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
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
