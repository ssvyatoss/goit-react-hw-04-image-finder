import { useEffect } from 'react';
import {
  ModalImgStyled,
  ModalOverlayStyled,
  ModalStyled,
} from './Modal.styled';

export const Modal = ({ showModal, onCloseModal, selectedImage }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleContentClick = e => {
    e.stopPropagation();
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onCloseModal();
    }
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
