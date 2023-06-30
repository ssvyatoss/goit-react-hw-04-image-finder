import { useEffect } from 'react';
import {
  ModalImgStyled,
  ModalOverlayStyled,
  ModalStyled,
} from './Modal.styled';

export const Modal = ({ showModal, onCloseModal, selectedImage }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onCloseModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);

  const handleContentClick = e => {
    e.stopPropagation();
  };

  if (!showModal) {
    return null;
  }

  return (
    <ModalOverlayStyled onClick={onCloseModal}>
      <ModalStyled>
        <ModalImgStyled
          src={selectedImage.largeImageUrl}
          alt={selectedImage.tags}
          onClick={handleContentClick}
        />
      </ModalStyled>
    </ModalOverlayStyled>
  );
};
