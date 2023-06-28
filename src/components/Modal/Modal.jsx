import { ModalImgStyled, ModalOverlayStyled, ModalStyled } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ showModal, onCloseModal, selectedImage }) => {
  if (!showModal) {
    return null;
  }

  const handleContentClick = e => {
    e.stopPropagation();
  };

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

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  selectedImage: PropTypes.object.isRequired,
};
