import React, { Component } from 'react';
import 'isomorphic-fetch';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchImg } from './FetchImg/FetchImg';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    showModal: false,
    selectedImage: null,
    showBtn: false,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  handleSubmit = async query => {
    await this.setState({ query, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = selectedImage => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      selectedImage: selectedImage || null,
    }));
  };

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.toggleModal(null);
    }
  };

  fetchImages = async () => {
    const { query, page } = this.state;

    try {
      this.setState({ isLoading: true });

      const { newImages, totalHits } = await fetchImg(query, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        showBtn: page < Math.ceil(totalHits / 12),
      }));
    } finally {
      this.setState({ isLoading: false });
      this.scrollToNextPage();
    }
  };

  scrollToNextPage = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          images={this.state.images}
          onOpenModal={this.toggleModal}
        />
        {this.state.isLoading && <Loader />}
        {this.state.showBtn && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        {this.state.showModal && (
          <Modal
            showModal={this.state.showModal}
            onCloseModal={this.toggleModal}
            selectedImage={this.state.selectedImage}
          />
        )}
      </div>
    );
  }
}
