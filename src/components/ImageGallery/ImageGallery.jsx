import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import { ImageGalleryStyled } from "./ImageGallery.styled"
import { ImageGalleryItemStyled } from "./ImageGalleryItem.styled"
import PropTypes from 'prop-types';

export const ImageGallery = ({images, onOpenModal}) => {
    return (
        <ImageGalleryStyled>
        {images.map(img => (
            <ImageGalleryItemStyled key={img.id}>
                <ImageGalleryItem img={img} onOpenModal={onOpenModal}/>
            </ImageGalleryItemStyled>
        ))}
        </ImageGalleryStyled>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    onOpenModal: PropTypes.func.isRequired,
  };