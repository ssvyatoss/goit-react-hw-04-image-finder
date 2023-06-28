import { Component } from 'react';
import { ModalImgStyled, ModalOverlayStyled, ModalStyled } from './Modal.styled';


export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleContentClick = e => {
    e.stopPropagation();
  };

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.onCloseModal();
    }
  };

  render() {
    const { showModal, onCloseModal, selectedImage } = this.props;

    if (!showModal) {
      return null;
    }

    return (
      <ModalOverlayStyled onClick={onCloseModal}>
        <ModalStyled>
          <ModalImgStyled
            src={selectedImage.largeImageUrl}
            alt={selectedImage.tags}
            onClick={this.handleContentClick}
          />
        </ModalStyled>
      </ModalOverlayStyled>
    );
  }
}
