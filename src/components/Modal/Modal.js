import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ImCross } from 'react-icons/im';
import { Overlay, Inner, CloseBtn } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    const coseByEsc = evt => {
      if (evt.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', coseByEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', coseByEsc);
      document.body.style.overflow = '';
    };
  }, [closeModal]);

  const closeOnClick = evt => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={closeOnClick}>
      <Inner>
        {children}
        <CloseBtn type="button" onClick={closeModal}>
          <ImCross size="16" />
        </CloseBtn>
      </Inner>
    </Overlay>,

    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.node,
};
