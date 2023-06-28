import React, { Component } from 'react';
import axios from 'axios';
import 'isomorphic-fetch';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

const API_KEY = '29953975-bb23bab1f41a1a145d54f17ae';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    showModal: false,
    selectedImage: null,
  };

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

  handleOpenModal = selectedImage => {
    this.setState({ showModal: true, selectedImage });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: null });
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    const perPage = 12;

    try {
      this.setState({ isLoading: true });

      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: API_KEY,
          q: query,
          page: page,
          per_page: perPage,
          image_type: 'photo',
          orientation: 'horizontal',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        const newImages = data.hits.map(image => ({
          id: image.id,
          webformatUrl: image.webformatURL,
          largeImageUrl: image.largeImageURL,
        }));

        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
        }));
      } else {
        console.log('Request failed with status:', response.status);
      }
    } catch (error) {
      console.log('Request failed with error:', error.message);
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
          onOpenModal={this.handleOpenModal}
        />
        {this.state.isLoading && <Loader />}
        {this.state.images.length > 0 && !this.state.isLoading && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        {this.state.showModal && (
          <Modal
            showModal={this.state.showModal}
            onCloseModal={this.handleCloseModal}
            selectedImage={this.state.selectedImage}
          />
        )}
      </div>
    );
  }
}
