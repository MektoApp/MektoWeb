import React, { useEffect } from 'react'
import { CModal, CModalBody, CButton, useColorModes } from '@coreui/react'
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa'
import { colors } from '../../theme/colors'

const ImageGalleryModal = ({ visible, onClose, images = [], currentIndex = 0, setCurrentIndex }) => {
  const { colorMode } = useColorModes('coreui-free-react-admin-template-theme')

  if (!images || images.length === 0) return null

  const prev = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length)
  const next = () => setCurrentIndex((currentIndex + 1) % images.length)

  // Navegação por teclado
  useEffect(() => {
    if (!visible) return

    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [visible, currentIndex])

  return (
    <CModal visible={visible} onClose={onClose} size="lg" alignment="centered">
       
      <CModalBody
       
        className="d-flex justify-content-center align-items-center position-relative"
        style={{
          padding: '0',
          height: '80vh',
          maxWidth: '1000px',
          overflow: 'hidden', // evita barras extras
        }}
      >
        {/* Header da galeria */}
    <div
      style={{
        width: '100%',
        padding: '8px 16px',
        backgroundColor: colorMode === 'dark' ? '#333' : '#f5f5f5',
        color: colorMode === 'dark' ? '#fff' : '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        position: 'absolute',
        top: 0,
        zIndex: 10,
      }}
    >
      Visualizar imagens
    </div>
        {/* Botão anterior */}
        <CButton
          color="light"
          shape="rounded-circle"
          size="sm"
          style={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            zIndex: 10,
          }}
          onClick={prev}
        >
          <FaArrowLeft />
        </CButton>

        {/* Imagem */}
        <img
          src={images[currentIndex]}
          alt={`img-${currentIndex}`}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto',
          }}
        />

        {/* Botão próximo */}
        <CButton
          color="light"
          shape="rounded-circle"
          size="sm"
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            zIndex: 10,
          }}
          onClick={next}
        >
          <FaArrowRight />
        </CButton>

        {/* Botão fechar */}
        <CButton
          color="light"
          shape="rounded-circle"
          size="sm"
          style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}
          onClick={onClose}
        >
          <FaTimes />
        </CButton>
      </CModalBody>
    </CModal>
  )
}

export default ImageGalleryModal
