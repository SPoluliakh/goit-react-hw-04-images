import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FcBinoculars } from 'react-icons/fc';
import {
  Header,
  SearchForm,
  SearchFormBtn,
  SerchFormInput,
} from './Searchbar.style';

export const Searchbar = ({ onSubmit }) => {
  const [searchInfo, setSearchInfo] = useState('');

  const inputChange = evt => {
    setSearchInfo(evt.currentTarget.value);
  };

  const submit = evt => {
    evt.preventDefault();
    const searImg = evt.currentTarget.elements.searchInfo.value;
    if (searImg.trim() === '') {
      return toast.warn('You must enter a keyword');
    }
    onSubmit(searchInfo);
    reset();
  };

  const reset = () => {
    setSearchInfo('');
  };

  return (
    <Header>
      <SearchForm onSubmit={submit}>
        <SearchFormBtn type="submit">
          <FcBinoculars size="20" />
        </SearchFormBtn>

        <SerchFormInput
          value={searchInfo}
          name="searchInfo"
          onChange={inputChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
