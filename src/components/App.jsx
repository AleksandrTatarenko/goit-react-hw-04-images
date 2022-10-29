import { useState, useEffect } from 'react';
import api from '../services/api';
import { Container } from 'components/App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoadMore } from 'components/LoadMore/LoadMore';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImageURL, setModalImageURL] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchImages(searchQuery, page) {
        try {
          setIsLoading(true);
          const images = await api.fetchImages(searchQuery, page);
          if (page === 1) {
            setImages(images);
          } else {
            setImages((prev) => [...prev, ...images]);
          };
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
    };
    if (searchQuery !== null) {
      fetchImages(searchQuery, page);
    } 
  }, [searchQuery, page]);
  
  const onSubmit = (searchQuery) => {
    setSearchQuery(searchQuery.toString());
    setPage(1);
  };

  const onButtonClick = () => {
    setPage(prev => {
      return prev + 1;
    });
  };

  const onItemClick = (id) => {
    const modalImage = images.find(image => image.id === id);
    setModalImageURL(modalImage.largeImageURL);
    setIsOpen(true);
  }

  const onOverlayClick = (e) => {
    const overlay = document.getElementById('Overlay');
    if (e.target===overlay) {
      setIsOpen(false);
    }
  }

  return (
      <Container>
        <Searchbar onSubmit={onSubmit} />
        {isOpen ? <Modal onClick={onOverlayClick} largeImageUrl={modalImageURL} />:null}
        {isLoading ? <Loader /> : null}
        {images.length > 0 && <ImageGallery images={images} onClick={onItemClick}/>}
        {images.length >= 12 && <LoadMore onClick={onButtonClick} />}
    </Container>
  );
}
