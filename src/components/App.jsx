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
  // state = {
  //   query: '',
  //   page: 1,
  //   images: [],
  //   isLoading: false,
  //   showModal: false,
  //   selectedImage: null,
  //   showBtn: false,
  // };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    fetchImages();
  }, [query, page]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.query !== this.state.query ||
  //     prevState.page !== this.state.page
  //   ) {
  //     this.fetchImages();
  //   }
  // }

  const handleSubmit = async query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    // await this.setState({ query, page: 1, images: [] });
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    // this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  const toggleModal = selectedImage => {
    setShowModal(prevState => !prevState);
    setSelectedImage(selectedImage || null);
    // this.setState(prevState => ({
    //   showModal: !prevState.showModal,
    //   selectedImage: selectedImage || null,
    // }));
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      toggleModal(null);
    }
  };

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const { newImages, totalHits } = await fetchImg(query, page);
      setImages(prevImages => [...prevImages, ...newImages]);
      setShowBtn(page < Math.ceil(totalHits / 12));
      // setState(prevState => ({
      //   images: [...prevState.images, ...newImages],
      //   showBtn: page < Math.ceil(totalHits / 12),
      // }));
    } finally {
      setIsLoading(false);
      // this.setState({ isLoading: false });
      scrollToNextPage();
    }
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
