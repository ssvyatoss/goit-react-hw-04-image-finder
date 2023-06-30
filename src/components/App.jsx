import React, { useState, useEffect } from 'react';
import 'isomorphic-fetch';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchImg } from './FetchImg/FetchImg';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const { newImages, totalHits } = await fetchImg(query, page);
        setImages(prevImages => [...prevImages, ...newImages]);
        setShowBtn(page < Math.ceil(totalHits / 12));
      } finally {
        setIsLoading(false);
        scrollToNextPage();
      }
    };
    if (!query) {
      return fetchImages();
    }  
  }, [query, page]);

  const handleSubmit = async query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = selectedImage => {
    setShowModal(prevState => !prevState);
    setSelectedImage(selectedImage || null);
  };

  const scrollToNextPage = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} onOpenModal={toggleModal} />
      {isLoading && <Loader />}
      {showBtn && <Button onLoadMore={handleLoadMore} />}
      {showModal && (
        <Modal
          showModal={showModal}
          onCloseModal={toggleModal}
          selectedImage={selectedImage}
        />
      )}
    </div>
  );
};
