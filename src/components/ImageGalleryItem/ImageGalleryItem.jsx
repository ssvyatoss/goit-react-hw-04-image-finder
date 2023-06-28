import { ImageGalleryItemImgStyled } from "./ImageGalleryItemImg.styled";
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ img, onOpenModal }) => {
  const { webformatUrl, tags, largeImageUrl } = img;
  const onClick = () => {
    onOpenModal({largeImageUrl, tags});
  };
  return <ImageGalleryItemImgStyled src={webformatUrl} alt={tags} onClick={onClick} />;
};

ImageGalleryItem.propTypes = {
  img: PropTypes.shape({
    webformatUrl: PropTypes.string,
    tags: PropTypes.string,
    largeImageUrl: PropTypes.string,
  }).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

