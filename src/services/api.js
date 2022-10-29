import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchImages = async (searchQuery, page) => {
    const response = await axios.get(`?q=${searchQuery}&key=29260486-d8b85945fd4ab908f9057b328&image_type=photo&orientation=horizontal&per_page=12&page=${page}`);
    const images = response.data.hits.map(({ id, webformatURL, largeImageURL }) => ({
        id: id,
        webformatURL: webformatURL,
        largeImageURL: largeImageURL
    }));
    return images;
};

const api = {
    fetchImages,
};

export default api