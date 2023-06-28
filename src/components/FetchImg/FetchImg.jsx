import axios from 'axios';
import PropTypes from 'prop-types';

const API_KEY = '29953975-bb23bab1f41a1a145d54f17ae';

export const fetchImg = async (query, page) => {
    // const { query, page } = this.state;
    const perPage = 12;

    try {
    //   this.setState({ isLoading: true });
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

        // this.setState(prevState => ({
        //   images: [...prevState.images, ...newImages],
        // }));
        return {newImages, totalHits: data.totalHits};
      } else {
        console.log('Request failed with status:', response.status);
      }
    } catch (error) {
      console.log('Request failed with error:', error.message);
    } 
    // finally {
    //   this.setState({ isLoading: false });
    //   this.scrollToNextPage();
    // }

    return [];
  };

  fetchImg.protoTypes = {
    auery: PropTypes.string,
    page: PropTypes.number,
  }