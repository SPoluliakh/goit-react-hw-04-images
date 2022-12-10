import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { fetch } from '../Fetch/fetch';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { IdleText } from './App.styled';

export const App = () => {
  const [name, setName] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [response, setResponse] = useState([]);
  const [status, setStatus] = useState('idle');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState([]);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const [totalImgInfo, setTotalImgInfo] = useState(false);

  useEffect(() => {
    if (name !== '' && pageNumber === 1 && totalImgInfo) {
      const foo = async () => {
        try {
          const data = await fetch(name, pageNumber);
          if (totalImgInfo) {
            toast.success(`Yahoooo, we finded ${data.totalHits} photos`);
            setResponse(prevState => [...prevState, ...data.hits]);
            setStatus('resolved');
            setLoadMoreBtn(true);
            setAutoScroll(true);
            setTotalImgInfo(false);
          }

          if (pageNumber === Math.ceil(data.totalHits / 12)) {
            toast.info('You have seen all photos ');
            return setLoadMoreBtn(false);
          }
        } catch (error) {
          setStatus('rejected');
          setLoadMoreBtn(false);
          setAutoScroll(false);

          toast.warn(
            ' Sorry, there are no images matching your search query. Please try again.'
          );
          console.log(error);
        }
      };
      foo();
    }
  }, [pageNumber, totalImgInfo, name]);

  useEffect(() => {
    if (pageNumber > 1) {
      const foo = async () => {
        try {
          const data = await fetch(name, pageNumber);
          setResponse(prevState => [...prevState, ...data.hits]);
          setStatus('resolved');

          if (pageNumber === Math.ceil(data.totalHits / 12)) {
            toast.info('You have seen all photos ');
            return setLoadMoreBtn(false);
          }
        } catch (error) {
          setStatus('rejected');
          setLoadMoreBtn(false);
          setAutoScroll(false);

          toast.warn(
            ' Sorry, there are no images matching your search query. Please try again.'
          );
          console.log(error);
        }
      };
      foo();
    }
  }, [pageNumber, name]);

  useEffect(() => {
    if (autoScroll) {
      const windowScroll = () => {
        window.scrollBy({
          top: 220,
          left: 0,
          behavior: 'smooth',
        });
      };
      windowScroll();
    }
  });

  const onSubmit = info => {
    setTotalImgInfo(true);
    setName(info);
    setPageNumber(1);
    setResponse([]);
    setStatus('pending');
    setLoadMoreBtn(false);
  };

  const handleCount = () => {
    setPageNumber(prevState => prevState + 1);
  };

  const openModal = evt => {
    const alt = evt.currentTarget.alt;
    const id = response.filter(res => res.tags === alt);
    setIsModalOpen(prevState => !prevState);
    setShowModalInfo([...id]);
    setAutoScroll(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {status === 'idle' && <IdleText>Enter keyword.</IdleText>}
      <ImageGallery
        searchInfo={response}
        openModal={openModal}
        isModalOpen={isModalOpen}
        showModalInfo={showModalInfo}
        closeModal={closeModal}
        loadMoreBtn={loadMoreBtn}
        handleCount={handleCount}
        status={status}
      />
    </>
  );
};
